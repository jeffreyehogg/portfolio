/**
 * AlgoQuest TypeScript / JavaScript Execution Worker
 * Runs sandboxed JS/TS code with timeout protection,
 * captures console output, simulates game hooks (step, jump, collect, at_goal, turn, _aqEmit),
 * enforces spatial hazard & boundary checks, and evaluates test assertions with step tracing.
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
  tiles: [],
  width: 0,
  height: 0,
  hazardHit: null,
}

/**
 * Enhanced TypeScript annotation stripper to allow running typed code
 * (including Record<K, V>, Array<T>, union types, and typed params) in the browser worker runtime.
 */
function stripTypeScriptTypes(code) {
  let cleaned = code

  // Remove single line type / interface declarations
  cleaned = cleaned.replace(/^\s*(?:export\s+)?(?:type|interface)\s+[A-Za-z0-9_<>, ]+\s*=\s*[^;\n]+;?/gm, '')
  // Remove multi-line interface declarations
  cleaned = cleaned.replace(/^\s*(?:export\s+)?interface\s+[A-Za-z0-9_<>, ]+\s*\{[\s\S]*?\}/gm, '')
  // Remove type declarations with object shapes
  cleaned = cleaned.replace(/^\s*(?:export\s+)?type\s+[A-Za-z0-9_<>, ]+\s*=\s*\{[\s\S]*?\};?/gm, '')
  // Remove return type annotations on functions, e.g. ): number { or ): Record<string, number> =>
  cleaned = cleaned.replace(/\):\s*[A-Za-z0-9_<>[\]|&, ]+\s*(?:=>|\{)/g, (match) => {
    return match.endsWith('{') ? ') {' : ') =>'
  })
  // Remove variable type annotations: let x: number = 5; const map: Record<string, number> = {};
  cleaned = cleaned.replace(
    /(\b(?:const|let|var)\s+[A-Za-z0-9_$]+)\s*:\s*(?:Record<[^>]+>|Array<[^>]+>|[A-Za-z0-9_<>[\]|& ]+)(\s*=)/g,
    '$1$2'
  )
  // Remove parameter type annotations in function headers: (a: number, b: string)
  cleaned = cleaned.replace(
    /([,(]\s*[A-Za-z0-9_$]+)\s*\??:\s*(?:Record<[^>]+>|Array<[^>]+>|[A-Za-z0-9_<>[\]|& ]+)(?=\s*[,)=])/g,
    '$1'
  )
  // Remove 'as Type' assertions
  cleaned = cleaned.replace(/\s+as\s+(?:const|Record<[^>]+>|[A-Za-z0-9_<>[\]|&]+)/g, '')

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
    const match = err.stack.match(/(?:<anonymous>|eval at [^,]+|Worker):\s*(\d+):(\d+)/i)
    if (match && match[1]) {
      line = parseInt(match[1], 10)
      if (match[2]) column = parseInt(match[2], 10)
    }
  }

  let type = err instanceof Error ? err.name : 'RuntimeError'
  if (message.startsWith('HazardError:')) {
    type = 'HazardError'
  } else if (message.startsWith('OutOfBoundsError:')) {
    type = 'OutOfBoundsError'
  }

  return {
    type,
    message: message.replace(/^(?:HazardError|OutOfBoundsError):\s*/, ''),
    line,
    column,
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
  const { requestId, code, rawUserCode, testCases = [], initialState = {}, timeoutMs = 3000 } = request

  currentStdout = []
  recordedSteps = []

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

  // Infinite-loop protective timeout
  let isTimedOut = false
  const timer = setTimeout(() => {
    isTimedOut = true
  }, timeoutMs)

  // Simulation Hooks
  function recordStep(stepEvent, shouldPost = true) {
    if (recordedSteps.length < 1000) {
      recordedSteps.push(stepEvent)
      if (shouldPost) {
        self.postMessage({ type: 'STEP', step: stepEvent })
      }
    }
  }

  function checkSpatialHazard() {
    const { x, y } = gameState.position
    if (gameState.width > 0 && gameState.height > 0) {
      if (x < 0 || y < 0 || x >= gameState.width || y >= gameState.height) {
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

    if (Array.isArray(gameState.tiles) && gameState.tiles[y] && gameState.tiles[y][x]) {
      const tile = gameState.tiles[y][x]
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
    recordStep(stepEvent, true)
    checkSpatialHazard()
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
    recordStep(stepEvent, true)
    checkSpatialHazard()
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
    recordStep(stepEvent, true)
    return collectedItem
  }

  const at_goal = function () {
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

  const turn = function (direction) {
    gameState.direction = direction
    const stepEvent = {
      type: 'turn',
      timestamp: Date.now(),
      data: { direction, position: { ...gameState.position } },
    }
    recordStep(stepEvent, true)
    return direction
  }

  const getPosition = function () {
    return { ...gameState.position }
  }

  const _aqEmit = function (eventType, payload) {
    recordStep(
      {
        type: String(eventType),
        timestamp: Date.now(),
        data: payload || {},
      },
      true
    )
  }

  // Custom Console capture
  const customConsole = {
    log: (...args) => {
      const line = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
      if (currentStdout.length < 200) {
        currentStdout.push(line)
        self.postMessage({ type: 'STDOUT', text: line })
      } else if (currentStdout.length === 200) {
        const truncationNotice = '[Stdout truncated: exceeded 200 lines]'
        currentStdout.push(truncationNotice)
        self.postMessage({ type: 'STDOUT', text: truncationNotice })
      }
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
      _aqEmit,
      console: customConsole,
    }

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
            const evalRes = evaluateProceduralTestCase(tc)
            passed = evalRes.passed
            actual = evalRes.actual
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
    const userSource = typeof rawUserCode === 'string' ? rawUserCode : code
    const nonEmptyLines = (userSource || '')
      .split('\n')
      .filter((l) => l.trim().length > 0 && !l.trim().startsWith('//')).length

    const result = {
      requestId,
      success: true,
      output: [...currentStdout],
      steps: [...recordedSteps],
      testResults,
      allTestsPassed,
      executionTimeMs,
      metrics: {
        stepCount: recordedSteps.filter((s) => s.type === 'step' || s.type === 'jump').length,
        lineCount: nonEmptyLines,
      },
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
