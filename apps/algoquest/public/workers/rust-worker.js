/**
 * AlgoQuest Rust WebAssembly Execution Worker (`algoquest_core.wasm`)
 * Runs user Rust code, static Clippy/Ruff diagnostics, and 100k-iteration stress benchmarks
 * inside an isolated Web Worker using a native 138 KB `wasm32-unknown-unknown` binary.
 */

/* global Uint8Array, BigInt */

let wasmExports = null
let wasmInitPromise = null
let wasmBinarySizeKb = 138

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

async function getRustWasm() {
  if (wasmExports) return wasmExports
  if (wasmInitPromise) return wasmInitPromise

  wasmInitPromise = (async () => {
    const res = await fetch('/wasm/algoquest_core.wasm')
    const bytes = await res.arrayBuffer()
    wasmBinarySizeKb = Math.round(bytes.byteLength / 1024)
    const { instance } = await WebAssembly.instantiate(bytes, {})
    wasmExports = instance.exports
    self.postMessage({ type: 'READY', language: 'rust' })
    return wasmExports
  })()

  return wasmInitPromise
}

function callWasmStringFunction(exports, fnName, inputStr) {
  const encoded = textEncoder.encode(inputStr)
  const inPtr = exports.wasm_alloc(encoded.length)
  const memIn = new Uint8Array(exports.memory.buffer, inPtr, encoded.length)
  memIn.set(encoded)

  const packed = exports[fnName](inPtr, encoded.length)
  exports.wasm_dealloc(inPtr, encoded.length)

  // Unpack u64: upper 32 bits = out_ptr, lower 32 bits = out_len
  const packedBig = BigInt(packed)
  const outPtr = Number((packedBig >> 32n) & 0xffffffffn)
  const outLen = Number(packedBig & 0xffffffffn)

  const memOut = new Uint8Array(exports.memory.buffer, outPtr, outLen)
  const jsonStr = textDecoder.decode(memOut)
  exports.wasm_dealloc(outPtr, outLen)

  return jsonStr
}

function evaluateProceduralTestCase(tc, wasmResult, hasHazard) {
  const reachedGoal = Boolean(wasmResult.reachedGoal) && !hasHazard

  if (tc.expected && typeof tc.expected === 'object') {
    let passed = true
    const actualSummary = {}

    if ('atGoal' in tc.expected) {
      if (reachedGoal !== tc.expected.atGoal) passed = false
      actualSummary.atGoal = reachedGoal
    }

    if ('noHazards' in tc.expected) {
      const noHazards = !hasHazard
      if (noHazards !== tc.expected.noHazards) passed = false
      actualSummary.noHazards = noHazards
    }

    if ('inventoryCount' in tc.expected) {
      const count = Array.isArray(wasmResult.inventory) ? wasmResult.inventory.length : 0
      if (count !== tc.expected.inventoryCount) passed = false
      actualSummary.inventoryCount = count
    }

    if ('position' in tc.expected && tc.expected.position) {
      const posMatch =
        wasmResult.position.x === tc.expected.position.x &&
        wasmResult.position.y === tc.expected.position.y
      if (!posMatch) passed = false
      actualSummary.position = { ...wasmResult.position }
    }

    return { passed, actual: actualSummary }
  }

  if (typeof tc.expected === 'boolean') {
    return { passed: reachedGoal === tc.expected, actual: reachedGoal }
  }

  return { passed: reachedGoal, actual: reachedGoal }
}

async function handleExecute(payload) {
  const {
    requestId,
    code,
    rawUserCode,
    testCases = [],
    initialState = {},
  } = payload || {}

  const startTime = performance.now()

  try {
    const exports = await getRustWasm()

    const startX = initialState.position?.x ?? 0
    const startY = initialState.position?.y ?? 0
    const direction = initialState.direction || 'east'
    const goalX = initialState.goal?.x ?? 0
    const goalY = initialState.goal?.y ?? 0

    let tiles = []
    if (Array.isArray(initialState.tiles)) {
      tiles = initialState.tiles
    } else if (Array.isArray(initialState.grid)) {
      tiles = initialState.grid
    }
    const height = initialState.height || tiles.length || 0
    const width = initialState.width || (tiles[0] ? tiles[0].length : 0) || 0

    const tilesLine = tiles.map((row) => row.join(',')).join(';')
    const items = Array.isArray(initialState.items) ? initialState.items : []
    const itemsLine = items
      .map((it) => `${it.id || 'item'},${it.x ?? 0},${it.y ?? 0},${it.type || 'gem'}`)
      .join(';')

    const levelHint = payload.levelId || requestId || 'level-1'
    const userSource = typeof rawUserCode === 'string' ? rawUserCode : code

    const envelope = [
      levelHint,
      `${startX},${startY},${direction},${goalX},${goalY},${width},${height}`,
      tilesLine,
      itemsLine,
      '===RAW_CODE===',
      userSource || '',
      '===EXEC_CODE===',
      code || '',
    ].join('\n')

    const wasmExecStart = performance.now()
    const rawJson = callWasmStringFunction(exports, 'execute_rust_quest_wasm', envelope)
    const wasmExecTimeUs = Math.max(12, Math.round((performance.now() - wasmExecStart) * 1000))

    const wasmRes = JSON.parse(rawJson)

    // Emit STDOUT and STEP events for live UI playback
    const output = Array.isArray(wasmRes.output) ? wasmRes.output : []
    for (const line of output) {
      self.postMessage({ type: 'STDOUT', text: line })
    }

    const steps = Array.isArray(wasmRes.steps) ? wasmRes.steps : []
    const now = Date.now()
    for (let i = 0; i < steps.length; i++) {
      steps[i].timestamp = now + i
      self.postMessage({ type: 'STEP', step: steps[i] })
    }

    const benchmarkData = wasmRes.wasmBenchmark
      ? {
          engine: 'rust-wasm',
          operationName: wasmRes.wasmBenchmark.operationName,
          iterations: wasmRes.wasmBenchmark.iterations,
          executionTimeUs: wasmExecTimeUs,
          opsPerSecond: Math.round(
            (wasmRes.wasmBenchmark.iterations / Math.max(1, wasmExecTimeUs)) * 1_000_000
          ),
          wasmBinarySizeKb,
        }
      : undefined

    if (!wasmRes.success) {
      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime))
      self.postMessage({
        type: 'RESULT',
        payload: {
          requestId,
          success: false,
          output,
          steps,
          testResults: [],
          allTestsPassed: false,
          executionTimeMs,
          lintDiagnostics: wasmRes.lintDiagnostics || [],
          wasmBenchmark: benchmarkData,
          error: wasmRes.error || 'Rust execution error',
          errorDetails: wasmRes.errorDetails || {
            type: 'rustc[Error]',
            message: wasmRes.error || 'Rust execution error',
          },
        },
      })
      return
    }

    const hasHazard = steps.some((s) => s.type === 'hazard')
    const testResults = []
    let allTestsPassed = true

    if (testCases && testCases.length > 0) {
      for (const tc of testCases) {
        const evalRes = evaluateProceduralTestCase(tc, wasmRes, hasHazard)
        if (!evalRes.passed) allTestsPassed = false
        testResults.push({
          id: tc.id,
          name: tc.name,
          passed: evalRes.passed,
          input: tc.input,
          expected: tc.expected,
          actual: evalRes.actual,
          executionTimeMs: 0,
        })
      }
    } else {
      const reached = Boolean(wasmRes.reachedGoal) && !hasHazard
      testResults.push({
        id: 'default-goal',
        name: 'Reach Quest Objective',
        passed: reached,
        expected: true,
        actual: reached,
        executionTimeMs: 0,
      })
      allTestsPassed = reached
    }

    const nonEmptyLines = (userSource || '')
      .split('\n')
      .filter((l) => l.trim().length > 0 && !l.trim().startsWith('//')).length

    const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime))

    self.postMessage({
      type: 'RESULT',
      payload: {
        requestId,
        success: true,
        output,
        steps,
        testResults,
        allTestsPassed,
        executionTimeMs,
        lintDiagnostics: wasmRes.lintDiagnostics || [],
        wasmBenchmark: benchmarkData,
        metrics: {
          stepCount: wasmRes.stepCount || steps.filter((s) => s.type === 'step' || s.type === 'jump').length,
          lineCount: nonEmptyLines,
        },
      },
    })
  } catch (err) {
    const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime))
    const msg = err instanceof Error ? err.message : String(err)
    self.postMessage({
      type: 'RESULT',
      payload: {
        requestId,
        success: false,
        output: [],
        steps: [],
        testResults: [],
        allTestsPassed: false,
        executionTimeMs,
        error: msg,
        errorDetails: {
          type: 'RustWasmError',
          message: msg,
        },
      },
    })
  }
}

self.onmessage = async function (e) {
  const { type, payload } = e.data || {}
  if (type === 'INIT') {
    try {
      await getRustWasm()
    } catch {
      // Ignore background init error
    }
  } else if (type === 'EXECUTE') {
    await handleExecute(payload)
  }
}
