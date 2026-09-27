export type G10Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'CHF' | 'AUD' | 'NZD' | 'SEK' | 'NOK'

export interface CurrencyMeta {
  code: G10Currency
  name: string
  symbol: string
  flag: string
  decimals: number
  advMillions: number // Average daily volume in millions USD
}

export const G10_CURRENCIES: Record<G10Currency, CurrencyMeta> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', decimals: 4, advMillions: 2200000 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', decimals: 4, advMillions: 1100000 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', decimals: 4, advMillions: 450000 },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', decimals: 2, advMillions: 600000 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', decimals: 4, advMillions: 280000 },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', decimals: 4, advMillions: 180000 },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', decimals: 4, advMillions: 320000 },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', decimals: 4, advMillions: 110000 },
  SEK: { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', decimals: 3, advMillions: 85000 },
  NOK: { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', decimals: 3, advMillions: 75000 }
}

export const G10_LIST: G10Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'CHF', 'AUD', 'NZD', 'SEK', 'NOK']

// Calculate pip multiplier: JPY is 100, others 10,000
export function getPipMultiplier(target: string): number {
  return target === 'JPY' ? 100 : 10000
}

// Format rate with appropriate institutional precision
export function formatFxRate(rate: number, target: string): string {
  if (!rate || isNaN(rate)) return '0.0000'
  const decimals = target === 'JPY' ? 3 : ['SEK', 'NOK'].includes(target) ? 4 : 5
  return rate.toFixed(decimals)
}

// Calculate pip difference between two rates
export function calculatePipDiff(rateA: number, rateB: number, target: string): number {
  const multiplier = getPipMultiplier(target)
  return Number(((rateA - rateB) * multiplier).toFixed(1))
}
