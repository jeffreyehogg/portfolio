/**
 * AlgoQuest Ruby WASM Execution Worker
 * Uses official @ruby/3.3-wasm-wasi (CRuby 3.3 compiled to WebAssembly),
 * captures standard puts/print output, simulates game hooks (step, jump, collect, at_goal, turn),
 * enforces spatial hazard & boundary checks, and evaluates test assertions with step tracing.
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
  tiles: [],
  width: 0,
  height: 0,
  hazardHit: null,
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
        def turn(dir = nil)
          JS.eval("self._turn && self._turn(" + (dir ? dir.to_s.dump : "null") + ")")
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

function checkSpatialHazard() {
  const { x, y } = gameState.position
  if (gameState.width > 0 && gameState.height > 0) {
    if (x < 0 || y < 0 || x >= gameState.width || y >= gameState.height) {
      const msg = `OutOfBoundsError: Hero walked off the dungeon map at (${x}, ${y})!`
      gameState.hazardHit = { type: 'out_of_bounds', x, y, message: msg }
      recordedSteps.push({
        type: 'hazard',
        timestamp: Date.now(),
        data: { position: { x, y }, tileType: 'out_of_bounds', message: msg },
      })
      throw new Error(msg)
    }
  }

  if (Array.isArray(gameState.tiles) && gameState.tiles[y] && gameState.tiles[y][x]) {
    const tile = gameState.tiles[y][x]
    if (tile === 'lava') {
      const msg = `HazardError: Hero stepped onto molten lava at (${x}, ${y})! Use jump to clear lava traps.`
      gameState.hazardHit = { type: 'lava', x, y, message: msg }
      recordedSteps.push({
        type: 'hazard',
        timestamp: Date.now(),
        data: { position: { x, y }, tileType: 'lava', message: msg },
      })
      throw new Error(msg)
    } else if (tile === 'wall') {
      const msg = `HazardError: Hero collided with a solid stone wall at (${x}, ${y})!`
      gameState.hazardHit = { type: 'wall', x, y, message: msg }
      recordedSteps.push({
        type: 'hazard',
        timestamp: Date.now(),
        data: { position: { x, y }, tileType: 'wall', message: msg },
      })
      throw new Error(msg)
    }
  }
}

function evaluateProceduralTestCase(tc) {
  const reachedGoal =
    !gameState.hazardHit &&
    gameState.position.x === gameState.goal.x &&
    gameState.position.y === gameState.goal.y

  if (tc.expected && typeof tc.expected === 'object') {
    let passed = true
    const actualSummary = {}

    if ('atGoal' in tc.expected) {
      if (reachedGoal !== tc.expected.atGoal) passed = false
      actualSummary.atGoal = reachedGoal
    }
    if ('position' in tc.expected && tc.expected.position) {
      const posMatch =
        gameState.position.x === tc.expected.position.x &&
        gameState.position.y === tc.expected.position.y
      if (!posMatch) passed = false
      actualSummary.position = { ...gameState.position }
    }
    if ('inventoryCount' in tc.expected) {
      const countMatch = gameState.inventory.length >= tc.expected.inventoryCount
      if (!countMatch) passed = false
      actualSummary.inventoryCount = gameState.inventory.length
    }
    if ('noHazards' in tc.expected) {
      const hazardFree = gameState.hazardHit === null
      if (hazardFree !== tc.expected.noHazards) passed = false
      actualSummary.noHazards = hazardFree
    }

    return { passed, actual: actualSummary }
  }

  const expectedBool = tc.expected !== undefined ? Boolean(tc.expected) : true
  return {
    passed: reachedGoal === expectedBool,
    actual: gameState.hazardHit ? gameState.hazardHit.message : reachedGoal,
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
  } catch {
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

  const tiles = Array.isArray(initialState.tiles) ? initialState.tiles : []
  const height = initialState.height || tiles.length || 0
  const width = initialState.width || (tiles[0] ? tiles[0].length : 0)

  // Initialize game state
  gameState = {
    position: { ...(initialState.position || { x: 0, y: 0 }) },
    direction: initialState.direction || 'east',
    inventory: Array.isArray(initialState.inventory) ? [...initialState.inventory] : [],
    goal: { ...(initialState.goal || { x: 0, y: 0 }) },
    items: Array.isArray(initialState.items) ? [...initialState.items] : [],
    tiles,
    width,
    height,
    hazardHit: null,
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
    checkSpatialHazard()
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
    checkSpatialHazard()
    return dir
  }

  self._turn = function (direction) {
    const dir = direction ? String(direction).toLowerCase() : gameState.direction || 'east'
    gameState.direction = dir
    const stepEvent = {
      type: 'turn',
      timestamp: Date.now(),
      data: { direction: dir, position: { ...gameState.position } },
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
      !gameState.hazardHit &&
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

    // Evaluate test cases properly for both boolean and object expectations
    const testResults = []
    let allTestsPassed = true

    if (testCases && testCases.length > 0) {
      for (const tc of testCases) {
        const evalRes = evaluateProceduralTestCase(tc)
        if (!evalRes.passed) allTestsPassed = false

        testResults.push({
          id: tc.id,
          name: tc.name,
          passed: evalRes.passed,
          expected: tc.expected,
          actual: evalRes.actual,
          executionTimeMs,
        })
      }
    } else {
      const reached =
        !gameState.hazardHit &&
        gameState.position.x === gameState.goal.x &&
        gameState.position.y === gameState.goal.y
      testResults.push({
        id: 'default-goal',
        name: 'Reach Quest Objective',
        passed: reached,
        expected: true,
        actual: reached,
        executionTimeMs,
      })
      allTestsPassed = reached
    }

    self.postMessage({
      type: 'RESULT',
      payload: {
        requestId,
        success: true,
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
