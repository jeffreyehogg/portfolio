<script setup lang="ts">
import { useTechnicalChart, type TimeframeOption } from '../../../composables/useTechnicalChart'
import MarketDepthLadder from './MarketDepthLadder.vue'
import TelemetryExportModal from './TelemetryExportModal.vue'

const props = defineProps<{
  baseCurrency: string
  targetCurrency: string
  currentRate: number
  history: { time: string; rate: number }[]
  loading: boolean
}>()

const {
  activeTimeframe,
  showEma20,
  showEma50,
  showBollinger,
  generateCandles,
  downloadCsv,
  downloadJson
} = useTechnicalChart()

const isExportModalOpen = ref(false)

const timeframes: TimeframeOption[] = ['15M', '1H', '1D', '1W']

// Generate candles based on current rate and timeframe
const candles = computed(() => {
  return generateCandles(props.currentRate, activeTimeframe.value, props.targetCurrency)
})

const handleExportCsv = () => {
  downloadCsv(candles.value, `${props.baseCurrency}/${props.targetCurrency}`, activeTimeframe.value)
  isExportModalOpen.value = false
}

const handleExportJson = () => {
  downloadJson(candles.value, `${props.baseCurrency}/${props.targetCurrency}`, activeTimeframe.value)
  isExportModalOpen.value = false
}
</script>

<template>
  <div class="grid grid-cols-12 gap-5">
    <!-- Chart Container (Col 1-8) -->
    <div class="col-span-12 lg:col-span-8 rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-6 flex flex-col justify-between space-y-4">
      <!-- Chart Top Controls -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span class="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">Institutional Telemetry Canvas</span>
            <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              SPREAD: 0.8 PIPS
            </span>
          </div>
          <h2 class="text-xl font-bold text-white tracking-tight">
            {{ baseCurrency }} / {{ targetCurrency }} Streaming Micro-Trend
          </h2>
        </div>

        <!-- Timeframe Switcher Tabs (44px Minimum Touch Targets) -->
        <div class="flex items-center p-1 rounded-xl bg-slate-950/60 border border-white/[0.06] overflow-x-auto w-full sm:w-auto">
          <button
            v-for="tf in timeframes"
            :key="tf"
            @click="activeTimeframe = tf"
            :class="[
              'min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg font-mono text-xs font-semibold transition-all duration-150 active:scale-[0.98]',
              activeTimeframe === tf
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            {{ tf }}
          </button>
        </div>
      </div>

      <!-- Technical Indicator Toggles Bar -->
      <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[11px] font-mono text-slate-500 uppercase mr-1">Overlays:</span>
          <!-- EMA 20 -->
          <button
            @click="showEma20 = !showEma20"
            :class="[
              'min-h-[34px] px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-all duration-150 active:scale-[0.98] border',
              showEma20
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950/40 text-slate-500 border-white/[0.04] hover:text-slate-300'
            ]"
          >
            EMA 20
          </button>

          <!-- EMA 50 -->
          <button
            @click="showEma50 = !showEma50"
            :class="[
              'min-h-[34px] px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-all duration-150 active:scale-[0.98] border',
              showEma50
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-950/40 text-slate-500 border-white/[0.04] hover:text-slate-300'
            ]"
          >
            EMA 50
          </button>

          <!-- Bollinger Bands -->
          <button
            @click="showBollinger = !showBollinger"
            :class="[
              'min-h-[34px] px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-all duration-150 active:scale-[0.98] border',
              showBollinger
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-950/40 text-slate-500 border-white/[0.04] hover:text-slate-300'
            ]"
          >
            Bollinger (20, 2σ)
          </button>
        </div>

        <!-- Export Trigger Button -->
        <button
          @click="isExportModalOpen = true"
          class="min-h-[36px] px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/[0.08] font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-[0.98]"
        >
          <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Dataset</span>
        </button>
      </div>

      <!-- Chart Area with Loading Skeleton -->
      <div class="relative w-full rounded-xl bg-[#0b0f19]/60 border border-white/[0.04] p-3 sm:p-4">
        <ClientOnly>
          <div v-if="loading && history.length === 0" class="h-64 sm:h-80 flex flex-col items-center justify-center space-y-3">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin h-7 w-7 text-emerald-400" />
            <span class="font-mono text-xs text-slate-400 tracking-wide">Connecting to interbank feed...</span>
          </div>
          <ForexChart
            v-else
            :history="history"
            :candles="candles"
            :currency="targetCurrency"
            :base="baseCurrency"
            :show-ema20="showEma20"
            :show-ema50="showEma50"
            :show-bollinger="showBollinger"
          />
          <template #fallback>
            <div class="h-64 sm:h-80 flex flex-col items-center justify-center space-y-3 bg-[#0b0f19]/40 rounded-xl">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin h-7 w-7 text-emerald-400" />
              <span class="font-mono text-xs text-slate-400">Initializing chart canvas...</span>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Live Depth Ladder & Order Flow (Col 9-12) -->
    <div class="col-span-12 lg:col-span-4 rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-6 flex flex-col justify-between">
      <MarketDepthLadder
        :current-rate="currentRate"
        :target-currency="targetCurrency"
      />

      <div class="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-500 flex justify-between">
        <span>TICK LATENCY</span>
        <span class="text-cyan-400 font-semibold">EDGE ACCELERATED</span>
      </div>
    </div>

    <!-- Export Modal -->
    <TelemetryExportModal
      :is-open="isExportModalOpen"
      :candles="candles"
      :pair="`${baseCurrency}/${targetCurrency}`"
      :timeframe="activeTimeframe"
      :current-rate="currentRate"
      @close="isExportModalOpen = false"
      @export-csv="handleExportCsv"
      @export-json="handleExportJson"
    />
  </div>
</template>
