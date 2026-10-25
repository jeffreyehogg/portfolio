/**
 * AlgoQuest Pyodide Execution Worker (Pyodide 0.27.5 / Python 3.12)
 * Runs Python code in an isolated Web Worker via WebAssembly.
 * Injects game simulation hooks (step, jump, collect, at_goal, turn, telemetry),
 * enforces spatial hazard & boundary checks, runs in-browser AST Ruff-style linting,
 * captures stdout, and evaluates pytest-style test assertions.
 */

/* global importScripts, loadPyodide */

const PYODIDE_VERSION = '0.27.5'
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

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
  tiles: [],
  width: 0,
  height: 0,
  hazardHit: null,
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
      importScripts(`${PYODIDE_CDN}pyodide.js`)
      const pyodide = await loadPyodide({
        indexURL: PYODIDE_CDN,
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
    if (currentStdout.length < 200) {
      currentStdout.push(str)
      self.postMessage({ type: 'STDOUT', text: str })
    } else if (currentStdout.length === 200) {
      const truncationNotice = '[Stdout truncated: exceeded 200 lines]'
      currentStdout.push(truncationNotice)
      self.postMessage({ type: 'STDOUT', text: truncationNotice })
    }
  }
}

function recordStep(stepEvent, shouldPost = true) {
  if (recordedSteps.length < 1000) {
    recordedSteps.push(stepEvent)
    if (shouldPost) {
      self.postMessage({ type: 'STEP', step: stepEvent })
    }
  }
}

/**
 * Validates whether the hero's current position is out of bounds or on a hazard tile
 */
function checkSpatialHazard() {
  const { x, y } = gameState.position
  const { tiles, width, height } = gameState

  if (width > 0 && height > 0) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      const msg = `OutOfBoundsError: Hero walked off the dungeon map at (${x}, ${y})!`
      gameState.hazardHit = { type: 'out_of_bounds', x, y, message: msg }
      recordStep(
        {
          type: 'hazard',
          timestamp: Date.now(),
          data: { position: { x, y }, tileType: 'out_of_bounds', message: msg },
        },
        true
      )
      throw new Error(msg)
    }
  }

  if (Array.isArray(tiles) && tiles[y] && tiles[y][x]) {
    const tile = tiles[y][x]
    if (tile === 'lava') {
      const msg = `HazardError: Hero stepped onto molten lava at (${x}, ${y})! Use jump() to clear lava traps.`
      gameState.hazardHit = { type: 'lava', x, y, message: msg }
      recordStep(
        {
          type: 'hazard',
          timestamp: Date.now(),
          data: { position: { x, y }, tileType: 'lava', message: msg },
        },
        true
      )
      throw new Error(msg)
    } else if (tile === 'wall') {
      const msg = `HazardError: Hero collided with a solid stone wall at (${x}, ${y})!`
      gameState.hazardHit = { type: 'wall', x, y, message: msg }
      recordStep(
        {
          type: 'hazard',
          timestamp: Date.now(),
          data: { position: { x, y }, tileType: 'wall', message: msg },
        },
        true
      )
      throw new Error(msg)
    }
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
  recordStep(stepEvent, true)
  checkSpatialHazard()
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
  recordStep(stepEvent, true)
  checkSpatialHazard()
  return JSON.stringify(gameState.position)
}

self._py_hook_turn = function (direction) {
  const dir = direction ? String(direction).toLowerCase() : gameState.direction || 'east'
  gameState.direction = dir
  const stepEvent = {
    type: 'turn',
    timestamp: Date.now(),
    data: {
      direction: dir,
      position: { ...gameState.position },
    },
  }
  recordStep(stepEvent, true)
  return dir
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
  recordStep(stepEvent, true)
  return collectedItem
}

self._py_hook_at_goal = function () {
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
  recordStep(stepEvent, false)
  return atGoal
}

self._py_hook_telemetry = function (eventType, jsonPayload) {
  try {
    const parsed = jsonPayload ? JSON.parse(String(jsonPayload)) : {}
    recordStep(
      {
        type: String(eventType),
        timestamp: Date.now(),
        data: parsed,
      },
      true
    )
  } catch {
    // Ignore malformed telemetry payload
  }
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
  const match = errStr.match(/File\s+["'](?:<exec>|<string>)["'],\s+line\s+(\d+)/i)
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
 *Evaluates a single testCase against current gameState
 */
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
  const {
    requestId,
    code,
    rawUserCode,
    testCases = [],
    initialState = {},
  } = request

  // Reset buffers
  currentStdout = []
  recordedSteps = []

  const tiles = Array.isArray(initialState.tiles) ? initialState.tiles : []
  const height = initialState.height || tiles.length || 0
  const width = initialState.width || (tiles[0] ? tiles[0].length : 0)

  // Initialize game state from request
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

  let lintDiagnostics = []

  try {
    const pyodide = await getPyodide()

    // Initialize environment, hooks, and AST linter in Python
    const setupPythonScript = `
import sys
import ast
import json
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

def turn(direction=None):
    return js.self._py_hook_turn(direction)

def collect(item=None):
    return js.self._py_hook_collect(item)

def at_goal():
    return bool(js.self._py_hook_at_goal())

def _aq_emit(event_type, payload):
    js.self._py_hook_telemetry(event_type, json.dumps(payload))

def _aq_lint_python(source_code):
    diags = []
    lines = source_code.split("\\n")
    for idx, line in enumerate(lines, start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if len(line) > 100:
            diags.append({
                "line": idx,
                "column": 101,
                "code": "E501",
                "rule": "Ruff/E501",
                "severity": "info",
                "message": f"Line too long ({len(line)} > 100 characters)."
            })
        if ";" in stripped and '"' not in stripped and "'" not in stripped:
            diags.append({
                "line": idx,
                "column": line.find(";") + 1,
                "code": "E702",
                "rule": "Ruff/E702",
                "severity": "warning",
                "message": "Multiple statements on one line (semicolon); prefer PEP 8 newline."
            })
    try:
        tree = ast.parse(source_code)
        for node in ast.walk(tree):
            if isinstance(node, ast.Pass):
                diags.append({
                    "line": getattr(node, "lineno", 1),
                    "column": getattr(node, "col_offset", 0) + 1,
                    "code": "PIE790",
                    "rule": "Ruff/PIE790",
                    "severity": "warning",
                    "message": "Unnecessary 'pass' placeholder statement can be removed."
                })
            elif isinstance(node, ast.Compare):
                for comp in node.comparators:
                    if isinstance(comp, ast.Constant) and isinstance(comp.value, bool):
                        diags.append({
                            "line": getattr(node, "lineno", 1),
                            "column": getattr(node, "col_offset", 0) + 1,
                            "code": "E712",
                            "rule": "Ruff/E712",
                            "severity": "info",
                            "message": f"Avoid equality comparison to '{comp.value}'; check truthiness directly."
                        })
    except Exception:
        pass
    return json.dumps(diags)
`
    await pyodide.runPythonAsync(setupPythonScript)

    // Run in-browser Ruff/AST linter on raw user code
    const userSourceToLint = typeof rawUserCode === 'string' ? rawUserCode : code
    try {
      pyodide.globals.set('_aq_raw_user_code', userSourceToLint)
      const lintJson = await pyodide.runPythonAsync(`_aq_lint_python(_aq_raw_user_code)`)
      if (lintJson) {
        lintDiagnostics = JSON.parse(lintJson)
      }
    } catch {
      // Ignore lint errors if syntax error is about to be caught by execution
    }

    // Execute user + level wrapper code
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
              const evalRes = evaluateProceduralTestCase(tc)
              passed = evalRes.passed
              actual = evalRes.actual
            }
          } else {
            const evalRes = evaluateProceduralTestCase(tc)
            passed = evalRes.passed
            actual = evalRes.actual
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
        executionTimeMs: Math.round(performance.now() - startTime),
      })
      allTestsPassed = reached
    }

    const executionTimeMs = Math.round(performance.now() - startTime)
    const nonEmptyLines = (userSourceToLint || '')
      .split('\n')
      .filter((l) => l.trim().length > 0 && !l.trim().startsWith('#')).length

    const result = {
      requestId,
      success: true,
      output: [...currentStdout],
      steps: [...recordedSteps],
      testResults,
      allTestsPassed,
      executionTimeMs,
      lintDiagnostics,
      metrics: {
        stepCount: recordedSteps.filter((s) => s.type === 'step' || s.type === 'jump').length,
        lineCount: nonEmptyLines,
      },
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
      lintDiagnostics,
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
