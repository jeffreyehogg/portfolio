import { describe, it, expect } from 'vitest'
import { LEVELS, WORLDS, getLevelById, getNextLevelId, getPreviousLevelId, Language } from '../../quests'
import { evaluateLevelStars, analyzeCodeQuality } from '../scoring'

const LANGUAGES: Language[] = ['python', 'javascript', 'typescript', 'ruby', 'lua']

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

  it('returns empty diagnostics for clean solution code across all levels', () => {
    for (const level of LEVELS) {
      expect(analyzeCodeQuality(level.solutionCode.python, 'python')).toEqual([])
      expect(analyzeCodeQuality(level.solutionCode.typescript, 'typescript')).toEqual([])
    }
  })
})
