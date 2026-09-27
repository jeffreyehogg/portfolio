export interface OHLCBar {
  timestamp: number
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  ema20?: number
  ema50?: number
  bbUpper?: number
  bbLower?: number
  bbMid?: number
  atr?: number
}

export type TimeframeOption = '15M' | '1H' | '1D' | '1W'
export type ChartDisplayMode = 'area' | 'candlestick'

export function useTechnicalChart() {
  const chartMode = ref<ChartDisplayMode>('area')
  const activeTimeframe = ref<TimeframeOption>('1D')
  const showEma20 = ref(true)
  const showEma50 = ref(false)
  const showBollinger = ref(false)

  // Generate realistic OHLC candles anchored to a current rate
  const generateCandles = (currentRate: number, timeframe: TimeframeOption, targetCurrency: string): OHLCBar[] => {
    const rate = currentRate > 0 ? currentRate : 1.0850
    const count = timeframe === '15M' ? 15 : timeframe === '1H' ? 24 : timeframe === '1D' ? 32 : 40
    const candles: OHLCBar[] = []

    const decimals = targetCurrency === 'JPY' ? 3 : 5
    const now = Date.now()
    const stepMs = timeframe === '15M' ? 60000 : timeframe === '1H' ? 150000 : timeframe === '1D' ? 1800000 : 7200000

    let prevClose = rate * (1 - (count * 0.0004))

    for (let i = count; i >= 0; i--) {
      const ts = now - (i * stepMs)
      const d = new Date(ts)
      const timeStr = timeframe === '1W'
        ? `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:00`
        : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      const seed = Math.sin(ts / 100000) * 0.0012 + Math.cos(i * 1.5) * 0.0008
      const open = prevClose
      const close = Number((open * (1 + seed)).toFixed(decimals))
      const high = Number((Math.max(open, close) * (1 + Math.abs(seed * 0.6) + 0.0003)).toFixed(decimals))
      const low = Number((Math.min(open, close) * (1 - Math.abs(seed * 0.6) - 0.0003)).toFixed(decimals))
      const volume = Math.round(150000 + Math.abs(seed * 10000000))

      candles.push({
        timestamp: ts,
        time: timeStr,
        open,
        high,
        low,
        close,
        volume
      })

      prevClose = close
    }

    // Compute EMA 20
    const k20 = 2 / (20 + 1)
    let ema20 = candles[0].close
    for (let i = 0; i < candles.length; i++) {
      ema20 = candles[i].close * k20 + ema20 * (1 - k20)
      if (i >= 5) {
        candles[i].ema20 = Number(ema20.toFixed(decimals))
      }
    }

    // Compute EMA 50
    const k50 = 2 / (50 + 1)
    let ema50 = candles[0].close
    for (let i = 0; i < candles.length; i++) {
      ema50 = candles[i].close * k50 + ema50 * (1 - k50)
      if (i >= 10) {
        candles[i].ema50 = Number(ema50.toFixed(decimals))
      }
    }

    // Compute Bollinger Bands (20 periods, 2 std dev)
    const period = 14
    for (let i = 0; i < candles.length; i++) {
      if (i >= period) {
        const slice = candles.slice(i - period, i).map(c => c.close)
        const mean = slice.reduce((a, b) => a + b, 0) / period
        const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period
        const stdDev = Math.sqrt(variance)

        candles[i].bbMid = Number(mean.toFixed(decimals))
        candles[i].bbUpper = Number((mean + 2 * stdDev).toFixed(decimals))
        candles[i].bbLower = Number((mean - 2 * stdDev).toFixed(decimals))
      }
    }

    return candles
  }

  // Export dataset to CSV
  const downloadCsv = (candles: OHLCBar[], pair: string, timeframe: string) => {
    const headers = ['Timestamp', 'Time', 'Open', 'High', 'Low', 'Close', 'Volume', 'EMA20', 'EMA50', 'BBUpper', 'BBLower']
    const rows = candles.map(c => [
      c.timestamp,
      `"${c.time}"`,
      c.open,
      c.high,
      c.low,
      c.close,
      c.volume,
      c.ema20 ?? '',
      c.ema50 ?? '',
      c.bbUpper ?? '',
      c.bbLower ?? ''
    ])

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ForexFlow_${pair.replace('/', '-')}_${timeframe}_telemetry.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Export dataset to JSON
  const downloadJson = (candles: OHLCBar[], pair: string, timeframe: string) => {
    const payload = {
      pair,
      timeframe,
      exportedAt: new Date().toISOString(),
      source: 'ForexFlow Institutional Telemetry Engine',
      candleCount: candles.length,
      data: candles
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ForexFlow_${pair.replace('/', '-')}_${timeframe}_telemetry.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    chartMode,
    activeTimeframe,
    showEma20,
    showEma50,
    showBollinger,
    generateCandles,
    downloadCsv,
    downloadJson
  }
}
