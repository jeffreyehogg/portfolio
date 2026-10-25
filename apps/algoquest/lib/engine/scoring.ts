import { Language, LintDiagnostic } from './types'

export interface StarEvaluationInput {
  hintsUnlockedTier: number
  lintDiagnostics?: LintDiagnostic[]
  stepCount?: number
  optimalSteps?: number
  code?: string
}

export interface StarCriterion {
  label: string
  met: boolean
  detail: string
}

export interface StarEvaluationResult {
  stars: 1 | 2 | 3
  summary: string
  criteria: StarCriterion[]
}

/**
 * Dynamically calculates 1, 2, or 3 stars upon level completion based on:
 * 1. Quest Objective Solved (Base 1 Star)
 * 2. Independent Mastery (Solved without revealing Tier 3 full syntax solution)
 * 3. Code Quality & Efficiency (Zero lint warnings and within optimal step budget)
 */
export function evaluateLevelStars(input: StarEvaluationInput): StarEvaluationResult {
  const {
    hintsUnlockedTier = 0,
    lintDiagnostics = [],
    stepCount = 0,
    optimalSteps,
  } = input

  const warningCount = lintDiagnostics.filter((d) => d.severity === 'warning').length
  const noSolutionReveal = hintsUnlockedTier < 3
  const withinOptimalSteps =
    optimalSteps === undefined || stepCount <= optimalSteps * 2 || stepCount === 0
  const isCleanCode = warningCount === 0 && withinOptimalSteps

  const criteria: StarCriterion[] = [
    {
      label: 'Quest Objective Conquered',
      met: true,
      detail: 'All test assertions and spatial objectives passed.',
    },
    {
      label: 'Independent Problem Solving',
      met: noSolutionReveal,
      detail: noSolutionReveal
        ? hintsUnlockedTier === 0
          ? 'Solved with 0 hints revealed'
          : `Solved using Tier ${hintsUnlockedTier} guidance only`
        : 'Tier 3 Full Solution snippet was revealed',
    },
    {
      label: 'Clean & Optimal Code (Ruff / Lint)',
      met: isCleanCode,
      detail:
        warningCount > 0
          ? `${warningCount} code quality warning${warningCount > 1 ? 's' : ''} detected`
          : !withinOptimalSteps
            ? `Used ${stepCount} steps (optimal target: ≤${optimalSteps})`
            : 'Zero lint warnings & optimal execution path',
    },
  ]

  const metCount = criteria.filter((c) => c.met).length
  const stars = Math.max(1, Math.min(3, metCount)) as 1 | 2 | 3

  const summary =
    stars === 3
      ? 'Flawless Mastery! Clean code and optimal execution.'
      : stars === 2
        ? 'Great Solution! Replay without Tier 3 hints or lint warnings for 3 stars.'
        : 'Quest Completed! Refine code quality and solve without solution reveal for 3 stars.'

  return {
    stars,
    summary,
    criteria,
  }
}

/**
 * Fast, deterministic multi-language static analyzer (Ruff / ESLint inspired)
 * Runs on user code to surface helpful style and hygiene diagnostics.
 */
export function analyzeCodeQuality(code: string, language: Language): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = []
  const lines = code.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1
    const rawLine = lines[i]
    const trimmed = rawLine.trim()

    // Skip comment lines
    if (
      trimmed.startsWith('#') ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('--') ||
      trimmed.length === 0
    ) {
      continue
    }

    // Rule E501: Line too long (> 100 chars)
    if (rawLine.length > 100) {
      diagnostics.push({
        line: lineNum,
        column: 101,
        code: 'E501',
        rule: language === 'python' ? 'Ruff/E501' : 'Style/max-len',
        severity: 'info',
        message: `Line exceeds 100 characters (${rawLine.length} > 100).`,
      })
    }

    if (language === 'python') {
      // Rule PIE790: Unnecessary pass statement when other statements exist in block
      if (trimmed === 'pass') {
        diagnostics.push({
          line: lineNum,
          column: rawLine.indexOf('pass') + 1,
          code: 'PIE790',
          rule: 'Ruff/PIE790',
          severity: 'warning',
          message: 'Unnecessary `pass` placeholder statement left in code block.',
        })
      }

      // Rule E701/E702: Multiple statements on one line (semicolon)
      if (trimmed.includes(';') && !trimmed.includes('"') && !trimmed.includes("'")) {
        diagnostics.push({
          line: lineNum,
          column: rawLine.indexOf(';') + 1,
          code: 'E702',
          rule: 'Ruff/E702',
          severity: 'warning',
          message: 'Avoid semicolons in Python; place each statement on its own line (PEP 8).',
        })
      }

      // Rule E712: Comparison to True/False using ==
      if (/==\s*(True|False)\b/.test(trimmed)) {
        diagnostics.push({
          line: lineNum,
          column: 1,
          code: 'E712',
          rule: 'Ruff/E712',
          severity: 'info',
          message: 'Avoid equality comparison to `True`/`False`; check truthiness directly.',
        })
      }
    } else if (language === 'javascript' || language === 'typescript') {
      // Rule no-var: Prefer let or const over var
      if (/\bvar\s+[A-Za-z_$]/.test(trimmed)) {
        diagnostics.push({
          line: lineNum,
          column: rawLine.indexOf('var') + 1,
          code: 'no-var',
          rule: 'ESLint/no-var',
          severity: 'warning',
          message: 'Unexpected `var`; use `const` or `let` for block-scoped declarations.',
        })
      }

      // Rule eqeqeq: Prefer === over ==
      if (/[^=!]==[^=]/.test(trimmed)) {
        diagnostics.push({
          line: lineNum,
          column: 1,
          code: 'eqeqeq',
          rule: 'ESLint/eqeqeq',
          severity: 'info',
          message: 'Prefer strict equality `===` over loose equality `==`.',
        })
      }
    }
  }

  return diagnostics
}
