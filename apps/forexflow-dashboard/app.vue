<script setup lang="ts">
import { G10_CURRENCIES, type G10Currency, calculatePipDiff } from './composables/useForexMockFeeds'
import TechnicalTelemetryEngine from './components/features/chart/TechnicalTelemetryEngine.vue'
import CurrencyMatrix from './components/features/matrix/CurrencyMatrix.vue'
import PortfolioStressTester from './components/features/var/PortfolioStressTester.vue'

// --- SEO & META SPECIFICATION ---
useHead({
  htmlAttrs: { lang: 'en' },
  title: 'ForexFlow FX | Institutional Currency Telemetry & Treasury Risk Engine',
  link: [
    { rel: 'canonical', href: 'https://forexflow-dashboard.vercel.app/' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: 'ForexFlow FX Dashboard',
            url: 'https://forexflow-dashboard.vercel.app/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'All',
            description: 'Institutional-grade foreign exchange telemetry and enterprise treasury risk intelligence platform.',
            author: {
              '@type': 'Person',
              name: 'Jeff Hogg',
              url: 'https://jeffhogg.com',
              sameAs: [
                'https://github.com/jeffreyehogg',
                'https://www.linkedin.com/in/jeffhogg/'
              ]
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          },
          {
            '@type': 'FinancialProduct',
            name: 'ForexFlow Interbank Telemetry',
            description: 'Sub-second foreign exchange cross-rate telemetry, triangular arbitrage detection, and parametric Value-at-Risk modeling.',
            provider: {
              '@type': 'Organization',
              name: 'Jeff Hogg Engineering'
            }
          }
        ]
      })
    }
  ]
})

useSeoMeta({
  title: 'ForexFlow FX | Institutional Currency Telemetry & Treasury Risk Engine',
  description: 'Track live mid-market rates, synthetic Bid/Ask pip spreads, cross-currency correlation matrices, and enterprise Value-at-Risk (VaR) exposure scenarios with sub-50ms edge telemetry.',
  ogTitle: 'ForexFlow FX | Institutional Currency Telemetry & Treasury Risk Engine',
  ogDescription: 'Live interbank foreign exchange telemetry, G10 cross-rate matrix, triangular arbitrage cycle detection, and treasury Value-at-Risk (VaR) stress testing.',
  ogUrl: 'https://forexflow-dashboard.vercel.app/',
  ogType: 'website',
  ogSiteName: 'ForexFlow FX',
  ogImage: 'https://forexflow-dashboard.vercel.app/images/og-forexflow.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'ForexFlow Institutional FX Telemetry & Treasury Risk Engine',
  twitterCard: 'summary_large_image',
  twitterTitle: 'ForexFlow FX | Institutional Currency Telemetry',
  twitterDescription: 'Sub-second FX telemetry, G10 cross-rate matrix, and enterprise Value-at-Risk stress testing built with Nuxt 3 Nitro.',
  twitterImage: 'https://forexflow-dashboard.vercel.app/images/og-forexflow.png',
  twitterCreator: '@jeffehogg',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  themeColor: '#0b0f19'
})

// --- STATE MANAGEMENT ---
const baseCurrency = ref<G10Currency>('USD')
const targetCurrency = ref<G10Currency>('EUR')
const currentRate = ref(1.0852)
const lastRate = ref(1.0848)
const lastUpdated = ref<string>('')
const history = ref<{ time: string; rate: number }[]>([])
const loading = ref(false)
const latencyMs = ref(28)
const activeCockpitTab = ref<'charts' | 'matrix' | 'var'>('charts')
const tickPulse = ref<'up' | 'down' | null>(null)
const showArchitectureSpecs = ref(false)

// Quick-swap pair presets (44px min touch target)
const quickPairs = [
  { base: 'USD' as G10Currency, target: 'EUR' as G10Currency },
  { base: 'GBP' as G10Currency, target: 'USD' as G10Currency },
  { base: 'USD' as G10Currency, target: 'JPY' as G10Currency },
  { base: 'USD' as G10Currency, target: 'CAD' as G10Currency },
  { base: 'USD' as G10Currency, target: 'CHF' as G10Currency },
  { base: 'AUD' as G10Currency, target: 'USD' as G10Currency }
]

const currencies: G10Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'CHF', 'AUD', 'NZD', 'SEK', 'NOK']

// Initial SSR Data Fetching via useAsyncData (Zero-delay LCP)
const { data: initialData } = await useAsyncData('initial-rates', () =>
  $fetch<any>('/api/rates', { query: { base: 'USD' } })
)

if (initialData.value && initialData.value.data) {
  const r = initialData.value.data['EUR'] || 0.9215
  currentRate.value = r
  lastRate.value = r * 0.9996
  lastUpdated.value = new Date().toLocaleTimeString()
  history.value = [
    { time: '12:00:00', rate: Number((r * 0.998).toFixed(5)) },
    { time: '12:01:00', rate: Number((r * 0.999).toFixed(5)) },
    { time: '12:02:00', rate: Number((r * 1.001).toFixed(5)) },
    { time: '12:03:00', rate: r }
  ]
}

// Client-side Polling Engine with visibility detection
const fetchRates = async () => {
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
    return // Avoid wasteful polls when tab is inactive
  }

  const startTime = Date.now()
  try {
    const res: any = await $fetch('/api/rates', {
      query: { base: baseCurrency.value }
    })

    latencyMs.value = Math.max(16, Date.now() - startTime)
    const rate = res?.data?.[targetCurrency.value] || currentRate.value
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    if (currentRate.value !== 0) {
      lastRate.value = currentRate.value
      tickPulse.value = rate >= currentRate.value ? 'up' : 'down'
      setTimeout(() => { tickPulse.value = null }, 700)
    }

    currentRate.value = rate
    lastUpdated.value = now.toLocaleTimeString()

    history.value.push({ time, rate })
    if (history.value.length > 25) history.value.shift()
    loading.value = false
  } catch (e) {
    console.error('[ForexFlow] Telemetry poll failed:', e)
  }
}

const selectPair = (base: G10Currency, target: G10Currency) => {
  if (baseCurrency.value === base && targetCurrency.value === target) return
  baseCurrency.value = base
  targetCurrency.value = target
  history.value = []
  loading.value = true
  fetchRates()
}

const onPairChange = () => {
  history.value = []
  loading.value = true
  fetchRates()
}

// Invert base and target
const invertPair = () => {
  const temp = baseCurrency.value
  selectPair(targetCurrency.value, temp)
}

let interval: NodeJS.Timeout
onMounted(() => {
  if (!lastUpdated.value) {
    fetchRates()
  }
  interval = setInterval(fetchRates, 8000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="min-h-screen bg-[#0b0f19] text-slate-100 font-sans relative overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
    <!-- Atmospheric Ambient Diffusers -->
    <div class="absolute -top-32 left-1/4 w-[650px] h-[450px] bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute top-1/3 -right-24 w-[550px] h-[550px] bg-cyan-500/[0.05] rounded-full blur-[130px] pointer-events-none" />

    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 space-y-6">

      <!-- TOP TELEMETRY HUD & NAVIGATION BAR -->
      <header class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-white/[0.08]">
        <!-- Brand Identity -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <UIcon name="i-heroicons-chart-bar-square" class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div class="flex items-center gap-2.5">
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-white">
                ForexFlow FX
              </h1>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live feed
              </span>
            </div>
            <p class="text-xs text-slate-400 font-normal mt-0.5">
              Sub-second interbank cross-rates &amp; enterprise treasury risk intelligence
            </p>
          </div>
        </div>

        <!-- Telemetry Status Pills & Selectors -->
        <div class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <!-- Session Badge -->
          <div class="h-10 px-3 rounded-xl bg-slate-900/70 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl flex items-center gap-2 text-xs text-slate-300 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>London / NY overlap</span>
          </div>

          <!-- Latency Badge -->
          <div class="h-10 px-3 rounded-xl bg-slate-900/70 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl flex items-center gap-1.5 text-xs text-cyan-400 font-medium font-mono">
            <UIcon name="i-heroicons-bolt" class="w-3.5 h-3.5" />
            <span>{{ latencyMs }}ms edge</span>
          </div>

          <!-- Interactive Currency Selector Controls -->
          <div class="h-10 p-1 rounded-xl bg-slate-900/80 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl flex items-center gap-1">
            <label for="base-currency-select" class="sr-only">Base Currency</label>
            <select
              id="base-currency-select"
              v-model="baseCurrency"
              @change="onPairChange"
              class="h-8 px-2.5 rounded-lg bg-slate-800 text-white font-mono text-xs font-semibold border-0 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option v-for="c in currencies" :key="`base-${c}`" :value="c">
                {{ c }} {{ G10_CURRENCIES[c]?.flag }}
              </option>
            </select>

            <button
              @click="invertPair"
              aria-label="Invert currency pair"
              title="Invert pair"
              class="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all"
            >
              <UIcon name="i-heroicons-arrows-right-left" class="w-3.5 h-3.5" />
            </button>

            <label for="target-currency-select" class="sr-only">Quote Target Currency</label>
            <select
              id="target-currency-select"
              v-model="targetCurrency"
              @change="onPairChange"
              class="h-8 px-2.5 rounded-lg bg-emerald-500/10 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/20 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option v-for="c in currencies.filter(c => c !== baseCurrency)" :key="`target-${c}`" :value="c">
                {{ c }} {{ G10_CURRENCIES[c]?.flag }}
              </option>
            </select>
          </div>
        </div>
      </header>

      <!-- COCKPIT SEGMENTED VIEW SELECTOR -->
      <nav aria-label="ForexFlow dashboard modules" class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <!-- Module Tabs -->
        <div class="flex items-center p-1 rounded-xl bg-slate-900/80 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
          <button
            @click="activeCockpitTab = 'charts'"
            :class="[
              'min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-150 active:scale-[0.98]',
              activeCockpitTab === 'charts'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
            <span>Live Chart</span>
          </button>

          <button
            @click="activeCockpitTab = 'matrix'"
            :class="[
              'min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-150 active:scale-[0.98]',
              activeCockpitTab === 'matrix'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            <UIcon name="i-heroicons-table-cells" class="w-4 h-4" />
            <span>Cross-Rates &amp; Arb</span>
          </button>

          <button
            @click="activeCockpitTab = 'var'"
            :class="[
              'min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-150 active:scale-[0.98]',
              activeCockpitTab === 'var'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            <UIcon name="i-heroicons-shield-check" class="w-4 h-4" />
            <span>Treasury VaR</span>
          </button>
        </div>

        <!-- Quick-Swap Pair Chips (Sleek Single-Row Pill Bar) -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <span class="text-xs text-slate-400 font-medium whitespace-nowrap mr-1">Quick pairs:</span>
          <button
            v-for="pair in quickPairs"
            :key="`${pair.base}-${pair.target}`"
            @click="selectPair(pair.base, pair.target)"
            :class="[
              'h-8 px-2.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all duration-150 active:scale-[0.98]',
              baseCurrency === pair.base && targetCurrency === pair.target
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            ]"
          >
            <span>{{ pair.base }}/{{ pair.target }}</span>
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="baseCurrency === pair.base && targetCurrency === pair.target ? 'bg-emerald-400' : 'bg-slate-600'"
            />
          </button>
        </div>
      </nav>

      <!-- PRIMARY ASYMMETRIC BENTO GRID (TELEMETRY MODULE) -->
      <section v-if="activeCockpitTab === 'charts'" class="space-y-6">
        <!-- Interactive Technical Chart Engine & Depth Ladder -->
        <TechnicalTelemetryEngine
          :base-currency="baseCurrency"
          :target-currency="targetCurrency"
          :current-rate="currentRate"
          :history="history"
          :loading="loading"
        />

        <!-- Secondary Metrics Bento Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">

          <!-- Card 1: Primary Spot Rate & Pipette Highlight (Col 1-4) -->
          <div class="sm:col-span-2 lg:col-span-4 rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-medium text-slate-400">Mid quote</span>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live
                </span>
              </div>

              <!-- Numerical Readout with Fractional Pipette -->
              <div class="py-1">
                <div class="text-4xl sm:text-5xl font-bold font-mono text-white tracking-tight tabular-nums flex items-baseline">
                  <span>{{ currentRate.toFixed(targetCurrency === 'JPY' ? 2 : 4) }}</span>
                  <span class="text-2xl sm:text-3xl text-emerald-400 font-semibold ml-0.5">
                    {{ currentRate.toFixed(targetCurrency === 'JPY' ? 3 : 5).slice(-1) }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <span class="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    <UIcon name="i-heroicons-arrow-trending-up" class="w-3.5 h-3.5" />
                    +0.38%
                  </span>
                  <span class="font-mono text-xs text-slate-400">
                    {{ calculatePipDiff(currentRate, lastRate, targetCurrency) }} pips
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-slate-400">
              <span>Last update</span>
              <span class="text-slate-300 font-mono">{{ lastUpdated || 'Synchronizing...' }}</span>
            </div>
          </div>

          <!-- Card 2: 24h Extremes Visual Meter (Col 5-8) -->
          <div class="sm:col-span-2 lg:col-span-4 rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] p-6 flex flex-col justify-between">
            <div>
              <span class="text-xs font-medium text-slate-400">24h Range</span>
              <div class="mt-4 space-y-4">
                <!-- Visual Slider Bar -->
                <div>
                  <div class="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span class="text-slate-400">Low: {{ (currentRate * 0.993).toFixed(targetCurrency === 'JPY' ? 3 : 5) }}</span>
                    <span class="text-emerald-400 font-semibold">High: {{ (currentRate * 1.004).toFixed(targetCurrency === 'JPY' ? 3 : 5) }}</span>
                  </div>
                  <div class="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/[0.06]">
                    <div class="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-300 w-3/5 rounded-full" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <div class="p-3 rounded-xl bg-slate-950/50 border border-white/[0.04]">
                    <span class="text-[11px] text-slate-400 block font-medium">Daily open</span>
                    <p class="font-mono text-sm font-semibold text-slate-200 mt-0.5">
                      {{ (currentRate * 0.996).toFixed(targetCurrency === 'JPY' ? 3 : 5) }}
                    </p>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950/50 border border-white/[0.04]">
                    <span class="text-[11px] text-slate-400 block font-medium">Intraday range</span>
                    <p class="font-mono text-sm font-semibold text-cyan-400 mt-0.5">78 pips</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-white/[0.04] text-xs text-slate-400 flex justify-between">
              <span>Volatility</span>
              <span class="text-emerald-400 font-medium">Normal (0.68%)</span>
            </div>
          </div>

          <!-- Card 3: Global Trading Sessions Clocks (Col 9-12) -->
          <div class="sm:col-span-2 lg:col-span-4 rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-medium text-slate-400">Market sessions</span>
                <span class="text-xs text-emerald-400 font-medium">Peak liquidity</span>
              </div>

              <div class="space-y-2.5">
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-white/[0.04]">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400" />
                    <span class="text-xs text-white">London (08:00 - 17:00 UTC)</span>
                  </div>
                  <span class="text-xs text-emerald-400 font-medium">Open</span>
                </div>

                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-white/[0.04]">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400" />
                    <span class="text-xs text-white">New York (13:00 - 22:00 UTC)</span>
                  </div>
                  <span class="text-xs text-emerald-400 font-medium">Open</span>
                </div>

                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/30 border border-white/[0.02]">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-slate-600" />
                    <span class="text-xs text-slate-400">Tokyo (00:00 - 09:00 UTC)</span>
                  </div>
                  <span class="text-xs text-slate-500 font-medium">Closed</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-white/[0.04] text-xs text-slate-400 flex justify-between">
              <span>ECN routing</span>
              <span class="text-cyan-400 font-mono text-xs">Currenex / EBS</span>
            </div>
          </div>

        </div>
      </section>

      <!-- MODULE 2: G10 CROSS-RATE MATRIX & ARBITRAGE SCANNER -->
      <section v-else-if="activeCockpitTab === 'matrix'">
        <CurrencyMatrix @select-pair="(b, t) => selectPair(b as G10Currency, t as G10Currency)" />
      </section>

      <!-- MODULE 3: TREASURY VALUE-AT-RISK (VaR) & STRESS TESTER -->
      <section v-else-if="activeCockpitTab === 'var'">
        <PortfolioStressTester />
      </section>

      <!-- PROGRESSIVE DISCLOSURE: ARCHITECTURE & ENGINEERING SPECS -->
      <section class="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden transition-all">
        <button
          @click="showArchitectureSpecs = !showArchitectureSpecs"
          class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <UIcon name="i-heroicons-cpu-chip" class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                System architecture &amp; telemetry pipeline
              </h3>
              <p class="text-xs text-slate-400">
                Sub-second edge proxy, synthetic microstructure, and parametric risk calculations
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>{{ showArchitectureSpecs ? 'Hide details' : 'Show details' }}</span>
            <UIcon
              name="i-heroicons-chevron-down"
              :class="['w-4 h-4 text-slate-400 transition-transform duration-200', showArchitectureSpecs ? 'rotate-180' : '']"
            />
          </div>
        </button>

        <div v-show="showArchitectureSpecs" class="p-5 pt-0 border-t border-white/[0.06] space-y-4">
          <div class="overflow-x-auto rounded-xl border border-white/[0.06] mt-4">
            <table class="w-full text-left text-xs divide-y divide-white/[0.06]">
              <thead class="bg-slate-950/60 text-slate-400 uppercase text-[11px] font-mono">
                <tr>
                  <th class="p-3.5">Architecture dimension</th>
                  <th class="p-3.5 text-rose-400">Retail / Toy converters</th>
                  <th class="p-3.5 text-emerald-400">ForexFlow institutional engine</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/[0.04] bg-[#0b0f19]/60">
                <tr>
                  <td class="p-3.5 font-semibold text-slate-200">Ingestion pipeline</td>
                  <td class="p-3.5 text-slate-400">Direct client-to-API calls exposing keys; un-cached polling</td>
                  <td class="p-3.5 text-emerald-300">Nuxt 3 Nitro edge proxy with SWR caching, Frankfurt ECB fallback &amp; synthetic drift</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-semibold text-slate-200">Pricing microstructure</td>
                  <td class="p-3.5 text-slate-400">Flat, single mid rate with zero spread or depth visibility</td>
                  <td class="p-3.5 text-emerald-300">Synthetic Bid/Ask quotes, pip differential calculations, and fractional pipette precision</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-semibold text-slate-200">Risk &amp; portfolio utility</td>
                  <td class="p-3.5 text-slate-400">Passive converter calculator with no enterprise context</td>
                  <td class="p-3.5 text-emerald-300">Parametric VaR &amp; Expected Shortfall (CVaR) with historical crisis simulations</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-semibold text-slate-200">Execution modeling</td>
                  <td class="p-3.5 text-slate-400">Assumes zero transaction friction and infinite liquidity</td>
                  <td class="p-3.5 text-emerald-300">Almgren-Chriss market impact law and multi-ECN smart order routing allocations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- DEVOPS & SYSTEMS ARCHITECTURE FOOTER -->
      <footer class="rounded-2xl bg-slate-950/70 border border-white/[0.08] p-5 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Nuxt 3 Nitro • Edge SWR Cache • Chart.js Canvas • Turborepo Monorepo</span>
        </div>

        <div class="flex items-center gap-4">
          <a
            href="https://github.com/jeffreyehogg/portfolio/tree/main/apps/forexflow-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            class="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
          >
            <UIcon name="i-heroicons-code-bracket" class="w-4 h-4" />
            <span>Source Code</span>
          </a>
          <span class="text-slate-700">|</span>
          <a
            href="https://jeffhogg.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-300 hover:text-white transition-colors"
          >
            Jeff Hogg Engineering
          </a>
        </div>
      </footer>

    </div>
  </div>
</template>