import { G10_LIST, G10_CURRENCIES, type G10Currency, getPipMultiplier } from './useForexMockFeeds'

export interface CrossRateCell {
  base: G10Currency
  target: G10Currency
  rate: number
  bid: number
  ask: number
  spreadPips: number
  change24h: number
}

export interface TriangularOpportunity {
  id: string
  path: [G10Currency, G10Currency, G10Currency, G10Currency]
  rates: [number, number, number]
  netMultiplier: number
  profitPercent: number
  estimatedProfitUsd: number
  timestamp: string
}

export interface SlippageRequest {
  pair: string
  base: G10Currency
  target: G10Currency
  notionalUsd: number
  urgency: 'passive' | 'neutral' | 'aggressive'
}

export interface SlippageResult {
  nominalRate: number
  effectiveRate: number
  slippagePips: number
  slippageUsd: number
  marketImpactBps: number
  venues: {
    name: 'EBS Prime' | 'Currenex ECN' | 'Cboe FX'
    sharePercent: number
    allocatedUsd: number
    fillRate: number
  }[]
  vwap: number
}

export function useCurrencyMatrix() {
  // Pre-seed USD base rates
  const usdRates = ref<Record<G10Currency, number>>({
    USD: 1.0,
    EUR: 0.9215,
    GBP: 0.7785,
    JPY: 152.45,
    CAD: 1.3820,
    CHF: 0.8840,
    AUD: 1.5120,
    NZD: 1.6640,
    SEK: 10.420,
    NOK: 10.650
  })

  // Synchronize with external rates if provided
  const updateUsdRates = (rates: Record<string, number>, base: string = 'USD') => {
    if (!rates) return
    if (base === 'USD') {
      for (const cur of G10_LIST) {
        if (rates[cur]) usdRates.value[cur] = rates[cur]
      }
    } else {
      // Convert to USD base if another base was provided
      const baseToUsd = rates['USD'] ? 1 / rates['USD'] : 1.0
      for (const cur of G10_LIST) {
        if (rates[cur]) {
          usdRates.value[cur] = rates[cur] * baseToUsd
        }
      }
    }
  }

  // Compute 10x10 cross rate matrix
  const matrix = computed<Record<G10Currency, Record<G10Currency, CrossRateCell>>>(() => {
    const res = {} as Record<G10Currency, Record<G10Currency, CrossRateCell>>

    for (const b of G10_LIST) {
      res[b] = {} as Record<G10Currency, CrossRateCell>
      const bToUsd = 1 / (usdRates.value[b] || 1.0)

      for (const t of G10_LIST) {
        if (b === t) {
          res[b][t] = {
            base: b,
            target: t,
            rate: 1.0,
            bid: 1.0,
            ask: 1.0,
            spreadPips: 0,
            change24h: 0
          }
          continue
        }

        const tPerUsd = usdRates.value[t] || 1.0
        const midRate = tPerUsd * bToUsd

        // Spread in pips (0.8 - 2.5 pips based on pair liquidity)
        const mult = getPipMultiplier(t)
        const advSum = (G10_CURRENCIES[b]?.advMillions || 100000) + (G10_CURRENCIES[t]?.advMillions || 100000)
        const spreadPips = Number(Math.max(0.6, 2.8 - (advSum / 1500000)).toFixed(1))
        const halfSpread = (spreadPips / mult) / 2

        const bid = Number((midRate - halfSpread).toFixed(t === 'JPY' ? 3 : 5))
        const ask = Number((midRate + halfSpread).toFixed(t === 'JPY' ? 3 : 5))

        // Synthetic 24h drift for matrix heatmap
        const seed = (b.charCodeAt(0) * 13 + t.charCodeAt(0) * 23) % 40
        const change24h = Number(((seed - 20) * 0.04).toFixed(2))

        res[b][t] = {
          base: b,
          target: t,
          rate: Number(midRate.toFixed(t === 'JPY' ? 3 : 5)),
          bid,
          ask,
          spreadPips,
          change24h
        }
      }
    }

    return res
  })

  // Detect triangular arbitrage opportunities across G10 triplets
  const detectTriangularArbitrage = (): TriangularOpportunity[] => {
    const opps: TriangularOpportunity[] = []
    const m = matrix.value
    const keyCurrencies: G10Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'CHF']

    for (let i = 0; i < keyCurrencies.length; i++) {
      for (let j = 0; j < keyCurrencies.length; j++) {
        if (i === j) continue
        for (let k = 0; k < keyCurrencies.length; k++) {
          if (k === i || k === j) continue

          const c1 = keyCurrencies[i]
          const c2 = keyCurrencies[j]
          const c3 = keyCurrencies[k]

          const r1 = m[c1][c2].bid
          const r2 = m[c2][c3].bid
          const r3 = m[c3][c1].bid

          // Gross cycle return with 0.02% institutional brokerage fee per leg
          const fee = 0.0002
          const netMultiplier = (r1 * (1 - fee)) * (r2 * (1 - fee)) * (r3 * (1 - fee))
          const profitPercent = (netMultiplier - 1) * 100

          // Allow subtle theoretical mispricing in scanner demo
          if (profitPercent > -0.05) {
            opps.push({
              id: `${c1}-${c2}-${c3}`,
              path: [c1, c2, c3, c1],
              rates: [r1, r2, r3],
              netMultiplier: Number(netMultiplier.toFixed(6)),
              profitPercent: Number(profitPercent.toFixed(3)),
              estimatedProfitUsd: Math.round(1000000 * Math.max(0, profitPercent / 100)),
              timestamp: new Date().toLocaleTimeString()
            })
          }
        }
      }
    }

    // Sort by profit descending
    return opps.sort((a, b) => b.profitPercent - a.profitPercent).slice(0, 5)
  }

  // Calculate institutional slippage and multi-venue smart order routing
  const calculateSlippage = (req: SlippageRequest): SlippageResult => {
    const cell = matrix.value[req.base]?.[req.target] || {
      rate: 1.0,
      bid: 1.0,
      ask: 1.0,
      spreadPips: 1.2
    }
    const nominalRate = cell.rate
    const mult = getPipMultiplier(req.target)

    // Almgren-Chriss square-root market impact:
    // ADV in USD millions
    const adv = G10_CURRENCIES[req.base]?.advMillions || 500000
    const notionalMillions = req.notionalUsd / 1000000
    const urgencyFactor = req.urgency === 'aggressive' ? 1.6 : req.urgency === 'passive' ? 0.6 : 1.0

    // Market impact in basis points
    const marketImpactBps = Math.min(85, Number((0.45 * urgencyFactor * Math.sqrt(notionalMillions / (adv / 1000)) * 10).toFixed(2)))
    const slippagePips = Number(((marketImpactBps / 10000) * nominalRate * mult + (cell.spreadPips / 2)).toFixed(1))
    const slippageUsd = Math.round((marketImpactBps / 10000) * req.notionalUsd)

    const effectiveRate = Number((nominalRate * (1 + (marketImpactBps / 10000))).toFixed(req.target === 'JPY' ? 3 : 5))

    // Venue routing allocations
    const venues: SlippageResult['venues'] = [
      {
        name: 'EBS Prime',
        sharePercent: 45,
        allocatedUsd: Math.round(req.notionalUsd * 0.45),
        fillRate: Number((nominalRate * (1 + (marketImpactBps * 0.85 / 10000))).toFixed(req.target === 'JPY' ? 3 : 5))
      },
      {
        name: 'Currenex ECN',
        sharePercent: 35,
        allocatedUsd: Math.round(req.notionalUsd * 0.35),
        fillRate: Number((nominalRate * (1 + (marketImpactBps * 1.05 / 10000))).toFixed(req.target === 'JPY' ? 3 : 5))
      },
      {
        name: 'Cboe FX',
        sharePercent: 20,
        allocatedUsd: Math.round(req.notionalUsd * 0.20),
        fillRate: Number((nominalRate * (1 + (marketImpactBps * 1.2 / 10000))).toFixed(req.target === 'JPY' ? 3 : 5))
      }
    ]

    const vwap = Number(
      venues.reduce((acc, v) => acc + (v.fillRate * (v.sharePercent / 100)), 0).toFixed(req.target === 'JPY' ? 3 : 5)
    )

    return {
      nominalRate,
      effectiveRate,
      slippagePips,
      slippageUsd,
      marketImpactBps,
      venues,
      vwap
    }
  }

  return {
    usdRates,
    matrix,
    updateUsdRates,
    detectTriangularArbitrage,
    calculateSlippage
  }
}
