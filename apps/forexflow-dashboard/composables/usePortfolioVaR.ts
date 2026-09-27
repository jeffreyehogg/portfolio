import type { G10Currency } from './useForexMockFeeds'

export interface CurrencyPosition {
  currency: G10Currency
  notionalUsd: number
  weight: number
}

export interface CrisisScenario {
  id: string
  name: string
  year: number
  badge: string
  description: string
  shocks: Partial<Record<G10Currency, number>> // Fractional return e.g. -0.158 for -15.8%
}

export interface VaRResult {
  totalPortfolioUsd: number
  dailyVolatilityPercent: number
  annualizedVolatilityPercent: number
  varUsd: number
  varPercent: number
  cvarUsd: number
  cvarPercent: number
  componentRisk: {
    currency: G10Currency
    notionalUsd: number
    weightPercent: number
    marginalRiskUsd: number
    isHedge: boolean
  }[]
  scenarioResults: {
    scenarioId: string
    name: string
    projectedPnLUsd: number
    projectedReturnPercent: number
  }[]
}

// Empirical daily return covariance matrix (scaled by 10^-4)
const COVARIANCE_MATRIX: Record<string, Record<string, number>> = {
  EUR: { EUR: 0.32, GBP: 0.22, JPY: 0.08, CAD: 0.15, CHF: 0.26, AUD: 0.19 },
  GBP: { EUR: 0.22, GBP: 0.44, JPY: 0.09, CAD: 0.18, CHF: 0.18, AUD: 0.24 },
  JPY: { EUR: 0.08, GBP: 0.09, JPY: 0.48, CAD: 0.06, CHF: 0.16, AUD: 0.04 },
  CAD: { EUR: 0.15, GBP: 0.18, JPY: 0.06, CAD: 0.35, CHF: 0.12, AUD: 0.26 },
  CHF: { EUR: 0.26, GBP: 0.18, JPY: 0.16, CAD: 0.12, CHF: 0.40, AUD: 0.14 },
  AUD: { EUR: 0.19, GBP: 0.24, JPY: 0.04, CAD: 0.26, CHF: 0.14, AUD: 0.52 }
}

export const HISTORICAL_CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: 'snb-2015',
    name: '2015 SNB Swiss Franc Unpeg',
    year: 2015,
    badge: 'Black Thursday',
    description: 'Swiss National Bank suddenly abandoned the 1.20 EUR/CHF floor, triggering an unprecedented intraday currency dislocation.',
    shocks: {
      CHF: 0.205,
      EUR: -0.034,
      GBP: -0.021,
      JPY: 0.015,
      CAD: -0.012,
      AUD: -0.018
    }
  },
  {
    id: 'lehman-2008',
    name: '2008 Lehman Brothers Liquidity Crunch',
    year: 2008,
    badge: 'Global Financial Crisis',
    description: 'Severe dollar funding shortage, widespread carry trade liquidations into JPY, and massive commodity FX collapse.',
    shocks: {
      AUD: -0.242,
      CAD: -0.165,
      GBP: -0.145,
      EUR: -0.098,
      JPY: 0.168,
      CHF: 0.082
    }
  },
  {
    id: 'covid-2020',
    name: '2020 COVID Dash for Cash',
    year: 2020,
    badge: 'March 2020 Panic',
    description: 'Worldwide liquidity freeze with global corporate treasuries drawing down credit lines and hoarding USD cash.',
    shocks: {
      CAD: -0.089,
      GBP: -0.065,
      AUD: -0.124,
      EUR: -0.042,
      JPY: -0.018,
      CHF: 0.014
    }
  },
  {
    id: 'fed-2022',
    name: '2022 Central Bank Rate Shock & Parity Breach',
    year: 2022,
    badge: 'Aggressive Rate Hikes',
    description: 'Aggressive 75bps Federal Reserve hikes broke EUR/USD below parity and pushed USD/JPY to multi-decade highs.',
    shocks: {
      EUR: -0.158,
      JPY: -0.225,
      GBP: -0.112,
      CAD: -0.074,
      AUD: -0.086,
      CHF: -0.032
    }
  }
]

export const TREASURY_PRESETS = [
  {
    id: 'saas-enterprise',
    name: 'Global SaaS Enterprise ($25M)',
    description: 'US tech firm with European engineering hubs and UK operations',
    positions: [
      { currency: 'EUR' as G10Currency, notionalUsd: 12000000 },
      { currency: 'GBP' as G10Currency, notionalUsd: 6000000 },
      { currency: 'JPY' as G10Currency, notionalUsd: 4000000 },
      { currency: 'CAD' as G10Currency, notionalUsd: 3000000 }
    ]
  },
  {
    id: 'carry-fund',
    name: 'Macro Carry Fund ($15M)',
    description: 'Long high-beta commodity currencies, funded with low-yielding Asian debt',
    positions: [
      { currency: 'AUD' as G10Currency, notionalUsd: 7000000 },
      { currency: 'CAD' as G10Currency, notionalUsd: 5000000 },
      { currency: 'JPY' as G10Currency, notionalUsd: -4000000 },
      { currency: 'CHF' as G10Currency, notionalUsd: -2000000 },
      { currency: 'EUR' as G10Currency, notionalUsd: 5000000 }
    ]
  },
  {
    id: 'european-importer',
    name: 'European Importer ($18M)',
    description: 'Euro-denominated entity with heavy dollar and yen procurement contracts',
    positions: [
      { currency: 'EUR' as G10Currency, notionalUsd: 8000000 },
      { currency: 'GBP' as G10Currency, notionalUsd: 4000000 },
      { currency: 'JPY' as G10Currency, notionalUsd: 3500000 },
      { currency: 'CHF' as G10Currency, notionalUsd: 2500000 }
    ]
  }
]

export function usePortfolioVaR() {
  const positions = ref<CurrencyPosition[]>([
    { currency: 'EUR', notionalUsd: 8000000, weight: 0.44 },
    { currency: 'GBP', notionalUsd: 5000000, weight: 0.28 },
    { currency: 'JPY', notionalUsd: 3000000, weight: 0.17 },
    { currency: 'CAD', notionalUsd: 2000000, weight: 0.11 }
  ])

  const confidenceLevel = ref<0.90 | 0.95 | 0.99>(0.95)
  const horizonDays = ref<1 | 5 | 10 | 30>(1)

  const applyPreset = (presetId: string) => {
    const found = TREASURY_PRESETS.find(p => p.id === presetId)
    if (!found) return
    const total = found.positions.reduce((acc, p) => acc + Math.abs(p.notionalUsd), 0)
    positions.value = found.positions.map(p => ({
      currency: p.currency,
      notionalUsd: p.notionalUsd,
      weight: total > 0 ? Number((Math.abs(p.notionalUsd) / total).toFixed(4)) : 0
    }))
  }

  const varMetrics = computed<VaRResult>(() => {
    const totalUsd = positions.value.reduce((acc, p) => acc + Math.abs(p.notionalUsd), 0)
    if (totalUsd === 0) {
      return {
        totalPortfolioUsd: 0,
        dailyVolatilityPercent: 0,
        annualizedVolatilityPercent: 0,
        varUsd: 0,
        varPercent: 0,
        cvarUsd: 0,
        cvarPercent: 0,
        componentRisk: [],
        scenarioResults: []
      }
    }

    // Normalized weight vector
    const weights: Record<string, number> = {}
    positions.value.forEach(p => {
      weights[p.currency] = p.notionalUsd / totalUsd
    })

    // Compute portfolio variance: w^T * Sigma * w
    let portVariance = 0
    const currencies = positions.value.map(p => p.currency)

    for (const c1 of currencies) {
      for (const c2 of currencies) {
        const w1 = weights[c1] || 0
        const w2 = weights[c2] || 0
        const cov = COVARIANCE_MATRIX[c1]?.[c2] ?? (c1 === c2 ? 0.35 : 0.12)
        portVariance += w1 * w2 * (cov / 10000)
      }
    }

    // Ensure non-negative variance
    portVariance = Math.max(0.000001, portVariance)
    const dailyVol = Math.sqrt(portVariance)
    const annualVol = dailyVol * Math.sqrt(252)

    // Z-scores for confidence levels
    const zMap: Record<number, number> = { 0.90: 1.282, 0.95: 1.645, 0.99: 2.326 }
    const zScore = zMap[confidenceLevel.value] || 1.645

    // VaR = Total * Z * dailyVol * sqrt(T)
    const horizonMultiplier = Math.sqrt(horizonDays.value)
    const varAmount = totalUsd * zScore * dailyVol * horizonMultiplier
    const varPercent = (varAmount / totalUsd) * 100

    // Conditional VaR (Expected Shortfall): CVaR = Total * (phi(Z) / (1 - alpha)) * dailyVol * sqrt(T)
    const phiZ = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * zScore * zScore)
    const cvarFactor = phiZ / (1 - confidenceLevel.value)
    const cvarAmount = totalUsd * cvarFactor * dailyVol * horizonMultiplier
    const cvarPercent = (cvarAmount / totalUsd) * 100

    // Component VaR breakdown
    const componentRisk = positions.value.map(p => {
      const w = weights[p.currency] || 0
      let covSum = 0
      for (const c2 of currencies) {
        const cov = COVARIANCE_MATRIX[p.currency]?.[c2] ?? (p.currency === c2 ? 0.35 : 0.12)
        covSum += (weights[c2] || 0) * (cov / 10000)
      }
      const marginalRisk = zScore * (covSum / dailyVol) * horizonMultiplier
      const compVaR = p.notionalUsd * marginalRisk

      return {
        currency: p.currency,
        notionalUsd: p.notionalUsd,
        weightPercent: Number((w * 100).toFixed(1)),
        marginalRiskUsd: Math.round(compVaR),
        isHedge: compVaR < 0
      }
    })

    // Historical crisis scenario evaluations
    const scenarioResults = HISTORICAL_CRISIS_SCENARIOS.map(sc => {
      let pnl = 0
      for (const p of positions.value) {
        const shock = sc.shocks[p.currency] ?? 0
        pnl += p.notionalUsd * shock
      }
      return {
        scenarioId: sc.id,
        name: sc.name,
        projectedPnLUsd: Math.round(pnl),
        projectedReturnPercent: Number(((pnl / totalUsd) * 100).toFixed(2))
      }
    })

    return {
      totalPortfolioUsd: totalUsd,
      dailyVolatilityPercent: Number((dailyVol * 100).toFixed(3)),
      annualizedVolatilityPercent: Number((annualVol * 100).toFixed(2)),
      varUsd: Math.round(varAmount),
      varPercent: Number(varPercent.toFixed(2)),
      cvarUsd: Math.round(cvarAmount),
      cvarPercent: Number(cvarPercent.toFixed(2)),
      componentRisk,
      scenarioResults
    }
  })

  return {
    positions,
    confidenceLevel,
    horizonDays,
    applyPreset,
    varMetrics
  }
}
