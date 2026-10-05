/**
 * AlgoQuest Ruby WASM Execution Worker
 * Uses official @ruby/3.3-wasm-wasi (CRuby 3.3 compiled to WebAssembly),
 * captures standard puts/print output, simulates game hooks (step, jump, collect, at_goal),
 * and evaluates test assertions with step tracing.
 */

/* global importScripts */

// Shims for UMD in web worker
self.window = self

let rubyVmPromise = null
let rubyVm = null
let currentStdout = []
let recordedSteps = []
let gameState = {
  position: { x: 0, y: 0 },
  direction: 'east',
  inventory: [],
  goal: { x: 0, y: 0 },
  items: [],
}

/**
 * Initializes and caches Ruby WASM runtime
 */
async function getRubyVM() {
  if (rubyVm) return rubyVm
  if (rubyVmPromise) return rubyVmPromise

  rubyVmPromise = (async () => {
    try {
      importScripts('https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.10.1/dist/browser.umd.js')
      const { DefaultRubyVM } = self['ruby-wasm-wasi']

      const wasmRes = await fetch('https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.10.1/dist/ruby.wasm')
      const wasmBytes = await wasmRes.arrayBuffer()
      const wasmModule = await WebAssembly.compile(wasmBytes)

      const instance = await DefaultRubyVM(wasmModule, { consolePrint: false })
      rubyVm = instance.vm

      // Bootstrap helper methods
      const bootstrap = `
        require "js"
        def step(dir = nil)
          JS.eval("self._step && self._step(" + (dir ? dir.to_s.dump : "null") + ")")
        end
        def jump
          JS.eval("self._jump && self._jump()")
        end
        def collect(item = nil)
          JS.eval("self._collect && self._collect(" + (item ? item.to_s.dump : "null") + ")")
        end
        def at_goal
          JS.eval("return self._at_goal ? self._at_goal() : false").to_s == "true"
        end
        def puts(*args)
          msg = args.map(&:to_s).join("\\n")
          JS.eval("self._print && self._print(" + msg.dump + ")")
        end
        def print(*args)
          msg = args.map(&:to_s).join("")
          JS.eval("self._print && self._print(" + msg.dump + ")")
        end
      `
      rubyVm.eval(bootstrap)
      return rubyVm
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        error: 'Failed to initialize Ruby WebAssembly engine: ' + (err.message || String(err)),
      })
      throw err
    }
  })()

  return rubyVmPromise
}

/**
 * Parses Ruby runtime/syntax errors
 */
function parseRubyError(err) {
  const raw = err instanceof Error ? err.message : String(err)
  let line = undefined
  let message = raw
  let type = 'RubyError'

  // Match eval:3:in `<main>': undefined local variable ... (NameError)
  const lineMatch = raw.match(/eval:(\d+):/i)
  if (lineMatch && lineMatch[1]) {
    line = parseInt(lineMatch[1], 10)
  }

  const typeMatch = raw.match(/\(([A-Za-z0-9_:]+Error)\)/)
  if (typeMatch && typeMatch[1]) {
    type = typeMatch[1]
  }

  const colonIdx = raw.indexOf("': ")
  if (colonIdx > 0) {
    message = raw.slice(colonIdx + 3).replace(/\s*\([A-Za-z0-9_:]+\).*/s, '').trim()
  }

  return {
    type,
    message,
    line,
  }
}

/**
 * Main execution handler
 */
async function handleExecute(request) {
  const startTime = performance.now()
  const { requestId, code, testCases = [], initialState = {}, timeoutMs = 3000 } = request

  currentStdout = []
  recordedSteps = []

  let vm
  try {
    vm = await getRubyVM()
  } catch (err) {
    self.postMessage({
      type: 'RESULT',
      payload: {
        requestId,
        success: false,
        output: [],
        steps: [],
        testResults: [],
        allTestsPassed: false,
        executionTimeMs: 0,
        error: 'Ruby engine could not be initialized.',
      },
    })
    return
  }

  // Initialize game state
  gameState = {
    position: { ...(initialState.position || { x: 0, y: 0 }) },
    direction: initialState.direction || 'east',
    inventory: Array.isArray(initialState.inventory) ? [...initialState.inventory] : [],
    goal: { ...(initialState.goal || { x: 0, y: 0 }) },
    items: Array.isArray(initialState.items) ? [...initialState.items] : [],
  }

  // Game hooks exposed to JS.eval
  self._step = function (direction) {
    if (performance.now() - startTime > timeoutMs) {
      throw new Error(`Execution timed out (${timeoutMs}ms limit exceeded). Check for infinite loops.`)
    }

    const dir = direction ? String(direction).toLowerCase() : gameState.direction || 'east'
    gameState.direction = dir

    if (dir === 'north' || dir === 'up') gameState.position.y -= 1
    else if (dir === 'south' || dir === 'down') gameState.position.y += 1
    else if (dir === 'east' || dir === 'right') gameState.position.x += 1
    else if (dir === 'west' || dir === 'left') gameState.position.x -= 1

    const stepEvent = {
      type: 'step',
      timestamp: Date.now(),
      data: {
        direction: dir,
        position: { ...gameState.position },
      },
    }
    recordedSteps.push(stepEvent)
    self.postMessage({ type: 'STEP', step: stepEvent })
    return dir
  }

  self._jump = function () {
    if (performance.now() - startTime > timeoutMs) {
      throw new Error(`Execution timed out (${timeoutMs}ms limit exceeded). Check for infinite loops.`)
    }

    const dir = gameState.direction || 'east'
    if (dir === 'north' || dir === 'up') gameState.position.y -= 2
    else if (dir === 'south' || dir === 'down') gameState.position.y += 2
    else if (dir === 'east' || dir === 'right') gameState.position.x += 2
    else if (dir === 'west' || dir === 'left') gameState.position.x -= 2

    const stepEvent = {
      type: 'jump',
      timestamp: Date.now(),
      data: {
        direction: dir,
        position: { ...gameState.position },
      },
    }
    recordedSteps.push(stepEvent)
    self.postMessage({ type: 'STEP', step: stepEvent })
    return dir
  }

  self._collect = function (item) {
    const collectedItem = item ? String(item) : 'gem'
    gameState.inventory.push(collectedItem)

    const stepEvent = {
      type: 'collect',
      timestamp: Date.now(),
      data: {
        item: collectedItem,
        inventory: [...gameState.inventory],
        position: { ...gameState.position },
      },
    }
    recordedSteps.push(stepEvent)
    self.postMessage({ type: 'STEP', step: stepEvent })
    return collectedItem
  }

  self._at_goal = function () {
    const atGoal = Boolean(
      gameState.goal &&
        gameState.position.x === gameState.goal.x &&
        gameState.position.y === gameState.goal.y
    )

    const stepEvent = {
      type: 'at_goal',
      timestamp: Date.now(),
      data: {
        atGoal,
        position: { ...gameState.position },
        goal: gameState.goal,
      },
    }
    recordedSteps.push(stepEvent)
    return atGoal
  }

  self._print = function (str) {
    currentStdout.push(str)
    self.postMessage({ type: 'STDOUT', text: str })
  }

  try {
    vm.eval(code)

    const executionTimeMs = Math.round(performance.now() - startTime)

    // Evaluate test cases
    const testResults = []
    let allTestsPassed = true

    for (const tc of testCases) {
      let passed = true
      let actual = undefined
      let error = undefined

      if (tc.expected && typeof tc.expected === 'object') {
        if ('position' in tc.expected) {
          passed =
            gameState.position.x === tc.expected.position.x &&
            gameState.position.y === tc.expected.position.y
          actual = { ...gameState.position }
        }

        if (passed && 'atGoal' in tc.expected) {
          const atGoal = self._at_goal()
          passed = atGoal === tc.expected.atGoal
          actual = { ...(actual || {}), atGoal }
        }

        if (passed && 'inventoryCount' in tc.expected) {
          passed = gameState.inventory.length >= tc.expected.inventoryCount
          actual = { ...(actual || {}), inventoryCount: gameState.inventory.length }
        }
      }

      if (!passed) allTestsPassed = false

      testResults.push({
        id: tc.id,
        name: tc.name,
        passed,
        expected: tc.expected,
        actual,
        error,
        executionTimeMs,
      })
    }

    self.postMessage({
      type: 'RESULT',
      payload: {
        requestId,
        success: allTestsPassed,
        output: currentStdout,
        steps: recordedSteps,
        testResults,
        allTestsPassed,
        executionTimeMs,
      },
    })
  } catch (err) {
    const errorDetails = parseRubyError(err)
    const executionTimeMs = Math.round(performance.now() - startTime)

    self.postMessage({
      type: 'RESULT',
      payload: {
        requestId,
        success: false,
        output: currentStdout,
        steps: recordedSteps,
        testResults: [],
        allTestsPassed: false,
        executionTimeMs,
        error: errorDetails.message,
        errorDetails,
      },
    })
  }
}

// Worker message listener
self.onmessage = async function (e) {
  const { type, payload } = e.data || {}

  switch (type) {
    case 'INIT': {
      try {
        await getRubyVM()
        self.postMessage({ type: 'READY', language: 'ruby' })
      } catch (err) {
        self.postMessage({ type: 'ERROR', error: String(err) })
      }
      break
    }
    case 'EXECUTE': {
      if (payload) {
        await handleExecute(payload)
      }
      break
    }
    default:
      break
  }
}
