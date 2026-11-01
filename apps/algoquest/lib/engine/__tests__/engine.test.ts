import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { LEVELS, WORLDS, getLevelById, getNextLevelId, getPreviousLevelId, Language } from '../../quests'
import { evaluateLevelStars, analyzeCodeQuality } from '../scoring'

const LANGUAGES: Language[] = ['python', 'javascript', 'typescript', 'ruby', 'lua', 'rust']

describe('AlgoQuest 10-Level Curriculum & World Registry', () => {
  it('registers 4 worlds and 10 progressive levels', () => {
    expect(WORLDS).toHaveLength(4)
    expect(LEVELS).toHaveLength(10)
    expect(LEVELS.map((l) => l.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('links next and previous levels sequentially across all 10 quests', () => {
    expect(getPreviousLevelId('level-1-first-step')).toBeNull()
    expect(getNextLevelId('level-1-first-step')).toBe('level-2-the-gatekeeper')
    expect(getNextLevelId('level-8-the-dual-bridges')).toBe('level-9-the-ancient-tome')
    expect(getNextLevelId('level-9-the-ancient-tome')).toBe('level-10-the-crystal-archives')
    expect(getNextLevelId('level-10-the-crystal-archives')).toBeNull()
  })

  it('provides starterCode, solutionCode, 3-tier hints, and prepareCode for all 5 languages', () => {
    for (const level of LEVELS) {
      expect(getLevelById(level.id)).toBeDefined()
      expect(level.hints).toHaveLength(3)
      expect(level.testCases.length).toBeGreaterThan(0)

      for (const lang of LANGUAGES) {
        const starter = level.starterCode[lang]
        const solution = level.solutionCode[lang]
        expect(starter, `${level.id} missing ${lang} starterCode`).toBeTruthy()
        expect(solution, `${level.id} missing ${lang} solutionCode`).toBeTruthy()
        expect(starter).not.toEqual(solution)

        const prepared = level.prepareCode(solution, lang)
        expect(prepared).toContain(solution.trim())
      }
    }
  })
})

describe('Dynamic 3-Star Scoring Engine (evaluateLevelStars)', () => {
  it('awards 3 stars for solving without Tier 3 hint and zero lint warnings', () => {
    const res = evaluateLevelStars({
      hintsUnlockedTier: 1,
      lintDiagnostics: [],
      stepCount: 3,
      optimalSteps: 3,
    })
    expect(res.stars).toBe(3)
    expect(res.criteria.every((c) => c.met)).toBe(true)
  })

  it('awards 2 stars when Tier 3 full solution hint was revealed', () => {
    const res = evaluateLevelStars({
      hintsUnlockedTier: 3,
      lintDiagnostics: [],
      stepCount: 3,
      optimalSteps: 3,
    })
    expect(res.stars).toBe(2)
  })

  it('awards 2 stars when code has Ruff/ESLint warnings', () => {
    const res = evaluateLevelStars({
      hintsUnlockedTier: 0,
      lintDiagnostics: [
        {
          line: 2,
          column: 5,
          code: 'PIE790',
          rule: 'Ruff/PIE790',
          severity: 'warning',
          message: 'Unnecessary pass statement',
        },
      ],
      stepCount: 3,
      optimalSteps: 3,
    })
    expect(res.stars).toBe(2)
  })

  it('awards 1 star when both Tier 3 hint was revealed and lint warnings exist', () => {
    const res = evaluateLevelStars({
      hintsUnlockedTier: 3,
      lintDiagnostics: [
        {
          line: 1,
          column: 1,
          code: 'E702',
          rule: 'Ruff/E702',
          severity: 'warning',
          message: 'Semicolon statement separator',
        },
      ],
      stepCount: 10,
      optimalSteps: 3,
    })
    expect(res.stars).toBe(1)
  })
})

describe('Multi-Language Static Code Quality Analyzer (analyzeCodeQuality)', () => {
  it('flags PIE790 and E702 in Python code', () => {
    const diags = analyzeCodeQuality('step(); collect()\npass\n', 'python')
    expect(diags.map((d) => d.code)).toContain('E702')
    expect(diags.map((d) => d.code)).toContain('PIE790')
  })

  it('flags no-var and eqeqeq in JavaScript/TypeScript code', () => {
    const diags = analyzeCodeQuality('var x = 1;\nif (x == 1) { step(); }\n', 'typescript')
    expect(diags.map((d) => d.code)).toContain('no-var')
    expect(diags.map((d) => d.code)).toContain('eqeqeq')
  })

  it('flags clippy::bool_comparison and unused_parens in Rust code', () => {
    const diags = analyzeCodeQuality('if (x == true) {\n    step();\n}\n', 'rust')
    expect(diags.map((d) => d.code)).toContain('clippy::bool_comparison')
    expect(diags.map((d) => d.code)).toContain('unused_parens')
  })

  it('returns empty diagnostics for clean solution code across all levels', () => {
    for (const level of LEVELS) {
      expect(analyzeCodeQuality(level.solutionCode.python, 'python')).toEqual([])
      expect(analyzeCodeQuality(level.solutionCode.typescript, 'typescript')).toEqual([])
      expect(analyzeCodeQuality(level.solutionCode.rust, 'rust')).toEqual([])
    }
  })
})

describe('Native Rust WebAssembly Core Engine (algoquest_core.wasm)', () => {
  it('instantiates algoquest_core.wasm and solves all 10 levels in Rust with 100k stress benchmarks', async () => {
    const wasmPath = path.resolve(__dirname, '../../../public/wasm/algoquest_core.wasm')
    expect(fs.existsSync(wasmPath)).toBe(true)

    const bytes = new Uint8Array(fs.readFileSync(wasmPath))
    const instantiated = (await WebAssembly.instantiate(bytes, {})) as unknown as {
      instance: WebAssembly.Instance
    }
    const exports = instantiated.instance.exports as {
      memory: WebAssembly.Memory
      // eslint-disable-next-line no-unused-vars
      wasm_alloc: (len: number) => number
      // eslint-disable-next-line no-unused-vars
      wasm_dealloc: (ptr: number, len: number) => void
      // eslint-disable-next-line no-unused-vars
      execute_rust_quest_wasm: (ptr: number, len: number) => bigint
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    for (const level of LEVELS) {
      const { heroStart, heroDirection, goal, tiles, width, height, entities } = level.gridConfig
      const tilesLine = tiles.map((r) => r.join(',')).join(';')
      const itemsLine = (entities || [])
        .map((e) => `${e.id},${e.x},${e.y},${e.type}`)
        .join(';')

      const rawCode = level.solutionCode.rust
      const execCode = level.prepareCode(rawCode, 'rust')

      const envelope = [
        level.id,
        `${heroStart.x},${heroStart.y},${heroDirection},${goal.x},${goal.y},${width},${height}`,
        tilesLine,
        itemsLine,
        '===RAW_CODE===',
        rawCode,
        '===EXEC_CODE===',
        execCode,
      ].join('\n')

      const encoded = encoder.encode(envelope)
      const inPtr = exports.wasm_alloc(encoded.length)
      new Uint8Array(exports.memory.buffer, inPtr, encoded.length).set(encoded)

      const packed = exports.execute_rust_quest_wasm(inPtr, encoded.length)
      exports.wasm_dealloc(inPtr, encoded.length)

      const packedBig = BigInt(packed)
      const outPtr = Number((packedBig >> BigInt(32)) & BigInt(0xffffffff))
      const outLen = Number(packedBig & BigInt(0xffffffff))
      const jsonStr = decoder.decode(new Uint8Array(exports.memory.buffer, outPtr, outLen))
      exports.wasm_dealloc(outPtr, outLen)

      const parsed = JSON.parse(jsonStr)
      expect(parsed.success, `${level.id} failed in Rust WASM: ${parsed.error}`).toBe(true)
      expect(parsed.reachedGoal, `${level.id} did not reach goal in Rust WASM`).toBe(true)
      expect(parsed.wasmBenchmark.engine).toBe('rust-wasm')
      expect(parsed.wasmBenchmark.iterations).toBe(100000)
    }
  })
})
