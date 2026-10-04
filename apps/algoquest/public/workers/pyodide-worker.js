/**
 * AlgoQuest Pyodide Execution Worker (Pyodide 0.26.4)
 * Runs Python code in an isolated Web Worker via WebAssembly.
 * Injects game simulation hooks (step, jump, collect, at_goal),
 * captures stdout, and runs test assertions.
 */

/* global importScripts, loadPyodide */

let pyodideInstance = null
let pyodideLoadingPromise = null

// Execution state variables
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
 * Lazy Pyodide loader
 */
async function getPyodide() {
  if (pyodideInstance) {
    return pyodideInstance
  }
  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js')
      const pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      })
      pyodideInstance = pyodide
      self.postMessage({ type: 'READY', language: 'python' })
      return pyodide
    })()
  }
  return pyodideLoadingPromise
}

// Global JS hooks accessible from Python via `import js`
self._py_stdout_writer = function (text) {
  if (text !== undefined && text !== null) {
    const str = String(text)
    currentStdout.push(str)
    self.postMessage({ type: 'STDOUT', text: str })
  }
}

self._py_hook_step = function (direction) {
  const dir = direction ? String(direction).toLowerCase() : gameState.direction || 'east'
  gameState.direction = dir

  if (dir === 'north' || dir === 'up') {
    gameState.position.y -= 1
  } else if (dir === 'south' || dir === 'down') {
    gameState.position.y += 1
  } else if (dir === 'east' || dir === 'right') {
    gameState.position.x += 1
  } else if (dir === 'west' || dir === 'left') {
    gameState.position.x -= 1
  }

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
  return JSON.stringify(gameState.position)
}

self._py_hook_jump = function () {
  const dir = gameState.direction || 'east'

  if (dir === 'north' || dir === 'up') {
    gameState.position.y -= 2
  } else if (dir === 'south' || dir === 'down') {
    gameState.position.y += 2
  } else if (dir === 'east' || dir === 'right') {
    gameState.position.x += 2
  } else if (dir === 'west' || dir === 'left') {
    gameState.position.x -= 2
  }

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
  return JSON.stringify(gameState.position)
}

self._py_hook_collect = function (item) {
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

self._py_hook_at_goal = function () {
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

/**
 * Parse python traceback for user-friendly line number and error message
 */
function parsePythonError(errStr) {
  const lines = errStr.trim().split('\n')
  const lastLine = lines[lines.length - 1] || 'Unknown Python Error'

  let errorType = 'RuntimeError'
  let message = lastLine
  const colonIdx = lastLine.indexOf(':')
  if (colonIdx > 0) {
    errorType = lastLine.slice(0, colonIdx).trim()
    message = lastLine.slice(colonIdx + 1).trim()
  }

  let lineNumber
  // Search for line numbers in traceback (e.g. File "<string>", line 4, in <module>)
  const match = errStr.match(/File\s+["']<exec>["']|File\s+["']<string>["'],\s+line\s+(\d+)/i)
  if (match && match[1]) {
    lineNumber = parseInt(match[1], 10)
  } else {
    const generalMatch = errStr.match(/line\s+(\d+)/i)
    if (generalMatch && generalMatch[1]) {
      lineNumber = parseInt(generalMatch[1], 10)
    }
  }

  return {
    line: lineNumber,
    type: errorType,
    message: message || errStr,
  }
}

/**
 * Main execution handler
 */
async function handleExecute(request) {
  const startTime = performance.now()
  const { requestId, code, testCases = [], initialState = {} } = request

  // Reset buffers
  currentStdout = []
  recordedSteps = []

  // Initialize game state from request
  gameState = {
    position: { ...(initialState.position || { x: 0, y: 0 }) },
    direction: initialState.direction || 'east',
    inventory: Array.isArray(initialState.inventory) ? [...initialState.inventory] : [],
    goal: { ...(initialState.goal || { x: 0, y: 0 }) },
    items: Array.isArray(initialState.items) ? [...initialState.items] : [],
  }

  try {
    const pyodide = await getPyodide()

    // Initialize environment & inject hooks in Python
    const setupPythonScript = `
import sys
import js

class _AlgoQuestRedirector:
    def __init__(self):
        self.buffer = ""
    def write(self, s):
        if not s:
            return
        lines = str(s).split("\\n")
        if len(lines) == 1:
            self.buffer += lines[0]
        else:
            first = self.buffer + lines[0]
            if first:
                js.self._py_stdout_writer(first)
            for line in lines[1:-1]:
                js.self._py_stdout_writer(line)
            self.buffer = lines[-1]
    def flush(self):
        if self.buffer:
            js.self._py_stdout_writer(self.buffer)
            self.buffer = ""

_aq_out = _AlgoQuestRedirector()
sys.stdout = _aq_out
sys.stderr = _aq_out

def step(direction=None):
    return js.self._py_hook_step(direction)

def jump():
    return js.self._py_hook_jump()

def collect(item=None):
    return js.self._py_hook_collect(item)

def at_goal():
    return bool(js.self._py_hook_at_goal())
`
    await pyodide.runPythonAsync(setupPythonScript)

    // Execute user code
    await pyodide.runPythonAsync(code)

    // Flush remaining stdout
    await pyodide.runPythonAsync(`_aq_out.flush()`)

    // Evaluate test cases
    const testResults = []
    let allTestsPassed = true

    if (testCases && testCases.length > 0) {
      for (const tc of testCases) {
        const tcStart = performance.now()
        let passed = false
        let actual = undefined
        let tcError = undefined

        try {
          if (tc.input !== undefined) {
            // Function-based test case
            // Convert input to python representation
            const pyInput = JSON.stringify(tc.input)
            const evalScript = `
import json
try:
    _fn = locals().get('solution') or locals().get('solve') or globals().get('solution') or globals().get('solve')
    if _fn:
        _input = json.loads('''${pyInput}''')
        if isinstance(_input, list):
            _res = _fn(*_input)
        elif isinstance(_input, dict):
            _res = _fn(**_input)
        else:
            _res = _fn(_input)
        json.dumps(_res)
    else:
        None
except Exception as _e:
    raise _e
`
            const pyOutput = await pyodide.runPythonAsync(evalScript)
            if (pyOutput !== undefined && pyOutput !== null) {
              actual = JSON.parse(pyOutput)
              passed = JSON.stringify(actual) === JSON.stringify(tc.expected)
            } else {
              // Fallback to checking goal state if no function return
              passed = gameState.position.x === gameState.goal.x && gameState.position.y === gameState.goal.y
              actual = gameState.position
            }
          } else {
            // Procedural quest test case: check goal or item collection
            const reachedGoal =
              gameState.position.x === gameState.goal.x && gameState.position.y === gameState.goal.y
            passed = tc.expected !== undefined ? reachedGoal === tc.expected : reachedGoal
            actual = reachedGoal
          }
        } catch (err) {
          tcError = err instanceof Error ? err.message : String(err)
          passed = false
        }

        if (!passed) {
          allTestsPassed = false
        }

        testResults.push({
          id: tc.id,
          name: tc.name,
          passed,
          input: tc.input,
          expected: tc.expected,
          actual,
          error: tcError,
          executionTimeMs: Math.round(performance.now() - tcStart),
        })
      }
    } else {
      // Default procedural goal check if no test cases specified
      const reached = gameState.position.x === gameState.goal.x && gameState.position.y === gameState.goal.y
      testResults.push({
        id: 'default-goal',
        name: 'Reach Quest Objective',
        passed: reached,
        expected: true,
        actual: reached,
        executionTimeMs: Math.round(performance.now() - startTime),
      })
      allTestsPassed = reached
    }

    const executionTimeMs = Math.round(performance.now() - startTime)

    const result = {
      requestId,
      success: true,
      output: [...currentStdout],
      steps: [...recordedSteps],
      testResults,
      allTestsPassed,
      executionTimeMs,
    }

    self.postMessage({ type: 'RESULT', payload: result })
  } catch (err) {
    const errorString = err instanceof Error ? err.message : String(err)
    const errorDetails = parsePythonError(errorString)
    const executionTimeMs = Math.round(performance.now() - startTime)

    const result = {
      requestId,
      success: false,
      output: [...currentStdout],
      steps: [...recordedSteps],
      testResults: [],
      allTestsPassed: false,
      executionTimeMs,
      error: errorDetails.message,
      errorDetails,
    }

    self.postMessage({ type: 'RESULT', payload: result })
  }
}

// Worker message router
self.onmessage = async function (e) {
  const { type, payload } = e.data || {}

  if (type === 'INIT') {
    try {
      await getPyodide()
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        error: `Failed to initialize Pyodide: ${err.message || err}`,
      })
    }
  } else if (type === 'EXECUTE') {
    await handleExecute(payload)
  }
}
