/**
 * AlgoQuest Lua Execution Worker
 * Uses Fengari (Lua 5.3 in JS) to execute Lua code client-side,
 * captures standard print output, simulates game hooks (step, jump, collect, at_goal),
 * and evaluates test assertions with step tracing.
 */

/* global importScripts */

// Global window shim required for fengari-web in web workers
self.window = self

let fengariLoaded = false
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
 * Loads Fengari runtime from CDN
 */
function initFengari() {
  if (fengariLoaded) return true

  try {
    importScripts('https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.js')
    fengariLoaded = Boolean(self.fengari && self.fengari.load)
    return fengariLoaded
  } catch (err) {
    self.postMessage({
      type: 'ERROR',
      error: 'Failed to load Lua engine (Fengari): ' + (err.message || String(err)),
    })
    return false
  }
}

/**
 * Parses Lua runtime / syntax errors to extract line numbers and clean message
 */
function parseLuaError(err) {
  const raw = err instanceof Error ? err.message : String(err)
  let line = undefined
  let message = raw

  // Fengari errors format: [string "..."]:4: attempt to call a nil value
  const match = raw.match(/\[string\s+[^\]]+\]:(\d+):\s*(.*)/s)
  if (match) {
    line = parseInt(match[1], 10)
    message = match[2].trim()
  }

  return {
    type: 'LuaError',
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

  // Ensure engine is loaded
  if (!initFengari()) {
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
        error: 'Lua engine could not be initialized.',
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

  // Game Hooks exposed to Lua via JS interop
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

  self._turn = function (direction) {
    gameState.direction = direction
    const stepEvent = {
      type: 'turn',
      timestamp: Date.now(),
      data: { direction, position: { ...gameState.position } },
    }
    recordedSteps.push(stepEvent)
    self.postMessage({ type: 'STEP', step: stepEvent })
    return direction
  }

  self._getPosition = function () {
    return { ...gameState.position }
  }

  self._print = function (str) {
    currentStdout.push(str)
    self.postMessage({ type: 'STDOUT', text: str })
  }

  // Bootstrap Lua wrappers for zero-overhead native syntax
  const bootstrapScript = `
    local js = require "js"
    local g = js.global

    function step(dir) return g:_step(dir) end
    function jump() return g:_jump() end
    function collect(item) return g:_collect(item) end
    function at_goal() return g:_at_goal() end
    function turn(dir) return g:_turn(dir) end

    function print(...)
      local s = {}
      for i = 1, select("#", ...) do
        s[i] = tostring(select(i, ...))
      end
      g:_print(table.concat(s, "\t"))
    end
  `

  try {
    // 1. Run bootstrap
    self.fengari.load(bootstrapScript)()

    // 2. Run user code
    self.fengari.load(code)()

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
    const errorDetails = parseLuaError(err)
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
      initFengari()
      self.postMessage({ type: 'READY', language: 'lua' })
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
