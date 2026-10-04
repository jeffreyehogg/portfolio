/**
 * AlgoQuest TypeScript / JavaScript Execution Worker
 * Runs sandboxed JS/TS code with a 3-second timeout protection,
 * captures console output, simulates game hooks (step, jump, collect, at_goal),
 * and evaluates test assertions with step tracing.
 */

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
 * Lightweight TypeScript annotation stripper to allow running
 * standard typed code in the browser worker runtime without bundling compiler.
 */
function stripTypeScriptTypes(code) {
  let cleaned = code

  // Remove single line type / interface declarations
  cleaned = cleaned.replace(/^\s*(?:export\s+)?(?:type|interface)\s+[A-Za-z0-9_<>, ]+\s*=\s*[^;]+;/gm, '')
  // Remove multi-line interface declarations
  cleaned = cleaned.replace(/^\s*(?:export\s+)?interface\s+[A-Za-z0-9_<>, ]+\s*\{[\s\S]*?\}/gm, '')
  // Remove type declarations with object shapes
  cleaned = cleaned.replace(/^\s*(?:export\s+)?type\s+[A-Za-z0-9_<>, ]+\s*=\s*\{[\s\S]*?\};?/gm, '')
  // Remove return type annotations on functions, e.g. ): number { or ): void =>
  cleaned = cleaned.replace(/\):\s*[A-Za-z0-9_<>[\]|& ]+\s*(?:=>|\{)/g, (match) => {
    return match.endsWith('{') ? ') {' : ') =>'
  })
  // Remove variable type annotations: let x: number = 5; const str: string = 'a';
  cleaned = cleaned.replace(/(\b(?:const|let|var)\s+[A-Za-z0-9_$]+)\s*:\s*[A-Za-z0-9_<>[\]|& ]+(\s*=)/g, '$1$2')
  // Remove parameter type annotations in function headers: (a: number, b: string)
  cleaned = cleaned.replace(/(\([A-Za-z0-9_$, ]*)\s*:\s*[A-Za-z0-9_<>[\]|& ]+([,)])/g, '$1$2')
  // Remove 'as Type' assertions
  cleaned = cleaned.replace(/\s+as\s+[A-Za-z0-9_<>[\]]+/g, '')

  return cleaned
}

/**
 * Parses JS Error stack traces to extract relative line number and details
 */
function parseJavaScriptError(err) {
  const message = err instanceof Error ? err.message : String(err)
  let line = undefined
  let column = undefined

  if (err instanceof Error && err.stack) {
    // Attempt to match stack frame: eval at handleExecute / <anonymous>:line:col
    const match = err.stack.match(/(?:<anonymous>|eval at [^,]+|Worker):\s*(\d+):(\d+)/i)
    if (match && match[1]) {
      line = parseInt(match[1], 10)
      if (match[2]) column = parseInt(match[2], 10)
    }
  }

  return {
    type: err instanceof Error ? err.name : 'RuntimeError',
    message,
    line,
    column,
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

  // Initialize game state
  gameState = {
    position: { ...(initialState.position || { x: 0, y: 0 }) },
    direction: initialState.direction || 'east',
    inventory: Array.isArray(initialState.inventory) ? [...initialState.inventory] : [],
    goal: { ...(initialState.goal || { x: 0, y: 0 }) },
    items: Array.isArray(initialState.items) ? [...initialState.items] : [],
  }

  // Infinite-loop protective timeout
  let isTimedOut = false
  const timer = setTimeout(() => {
    isTimedOut = true
  }, timeoutMs)

  // Simulation Hooks
  const step = function (direction) {
    if (isTimedOut || performance.now() - startTime > timeoutMs) {
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
    return { ...gameState.position }
  }

  const jump = function () {
    if (isTimedOut || performance.now() - startTime > timeoutMs) {
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
    return { ...gameState.position }
  }

  const collect = function (item) {
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

  const at_goal = function () {
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

  const turn = function (direction) {
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

  const getPosition = function () {
    return { ...gameState.position }
  }

  // Custom Console capture
  const customConsole = {
    log: (...args) => {
      const line = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
      currentStdout.push(line)
      self.postMessage({ type: 'STDOUT', text: line })
    },
    info: (...args) => customConsole.log(...args),
    warn: (...args) => customConsole.log(...args),
    error: (...args) => customConsole.log(...args),
  }

  try {
    const strippedCode = stripTypeScriptTypes(code)

    // Construct execution wrapper
    const sandboxScope = {
      step,
      jump,
      collect,
      at_goal,
      turn,
      getPosition,
      console: customConsole,
    }

    // Function constructor execution with sandboxed arguments
    const scopeKeys = Object.keys(sandboxScope)
    const scopeValues = Object.values(sandboxScope)

    const runnerFunction = new Function(
      ...scopeKeys,
      `
      "use strict";
      let solution, solve;
      ${strippedCode}
      return {
        solution: typeof solution === 'function' ? solution : (typeof solve === 'function' ? solve : null),
        gameState: {
          position: getPosition(),
          inventory: [...gameState.inventory],
          atGoal: at_goal()
        }
      };
    `
    )

    const executionExport = runnerFunction(...scopeValues)
    clearTimeout(timer)

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
          if (tc.input !== undefined && executionExport.solution) {
            const inputArgs = Array.isArray(tc.input) ? tc.input : [tc.input]
            actual = executionExport.solution(...inputArgs)
            passed = JSON.stringify(actual) === JSON.stringify(tc.expected)
          } else {
            const reachedGoal =
              gameState.position.x === gameState.goal.x && gameState.position.y === gameState.goal.y
            passed = tc.expected !== undefined ? reachedGoal === tc.expected : reachedGoal
            actual = reachedGoal
          }
        } catch (err) {
          tcError = err instanceof Error ? err.message : String(err)
          passed = false
        }

        if (!passed) allTestsPassed = false

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
    clearTimeout(timer)
    const errorDetails = parseJavaScriptError(err)
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

// Worker message listener
self.onmessage = async function (e) {
  const { type, payload } = e.data || {}

  if (type === 'INIT') {
    self.postMessage({ type: 'READY', language: 'typescript' })
  } else if (type === 'EXECUTE') {
    await handleExecute(payload)
  }
}
