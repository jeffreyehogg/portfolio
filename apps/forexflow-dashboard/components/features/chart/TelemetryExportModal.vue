<script setup lang="ts">
import type { OHLCBar } from '../../../composables/useTechnicalChart'

const props = defineProps<{
  isOpen: boolean
  candles: OHLCBar[]
  pair: string
  timeframe: string
  currentRate: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'exportCsv'): void
  (e: 'exportJson'): void
}>()

const copied = ref(false)
const notes = ref('Institutional telemetry export snapshot.')

const copySummary = () => {
  const summary = `ForexFlow FX Telemetry Snapshot
Pair: ${props.pair}
Timeframe: ${props.timeframe}
Spot Rate: ${props.currentRate}
Sample Count: ${props.candles.length} bars
Exported: ${new Date().toISOString()}
Notes: ${notes.value}`

  navigator.clipboard.writeText(summary)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2500)
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
    role="dialog"
    aria-modal="true"
    aria-labelledby="export-modal-title"
  >
    <div
      class="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/[0.1] shadow-2xl p-6 space-y-5 text-slate-100"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-arrow-down-tray" class="w-5 h-5 text-emerald-400" />
          <h3 id="export-modal-title" class="text-base font-bold text-white">
            Export Market Telemetry &amp; OHLCV
          </h3>
        </div>
        <button
          @click="emit('close')"
          aria-label="Close export modal"
          class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
        </button>
      </div>

      <!-- Dataset Meta -->
      <div class="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] font-mono text-xs space-y-1.5">
        <div class="flex justify-between">
          <span class="text-slate-400">Target Asset:</span>
          <span class="text-white font-bold">{{ pair }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Aggregation Horizon:</span>
          <span class="text-emerald-400">{{ timeframe }} Candlestick</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Sample Count:</span>
          <span class="text-white">{{ candles.length }} OHLCV records</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Current Spot:</span>
          <span class="text-white">{{ currentRate }}</span>
        </div>
      </div>

      <!-- User Notes Field (Accessible Form Link) -->
      <div>
        <label for="export-notes-input" class="block text-xs font-mono font-semibold text-slate-400 mb-1.5 uppercase">
          Analyst / Audit Notes
        </label>
        <input
          id="export-notes-input"
          v-model="notes"
          type="text"
          class="w-full h-11 px-3 rounded-lg bg-slate-950 border border-white/[0.1] text-xs font-mono text-white focus:ring-1 focus:ring-emerald-500"
          placeholder="e.g. Session overlap risk analysis"
        />
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
        <button
          @click="emit('exportCsv')"
          class="min-h-[44px] px-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.98]"
        >
          <UIcon name="i-heroicons-document-text" class="w-4 h-4" />
          <span>CSV Export</span>
        </button>

        <button
          @click="emit('exportJson')"
          class="min-h-[44px] px-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.98]"
        >
          <UIcon name="i-heroicons-code-bracket" class="w-4 h-4" />
          <span>JSON Schema</span>
        </button>

        <button
          @click="copySummary"
          class="min-h-[44px] px-3 rounded-xl bg-slate-800 text-slate-200 border border-white/[0.08] hover:bg-slate-700 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.98]"
        >
          <UIcon :name="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="w-4 h-4 text-emerald-400" />
          <span>{{ copied ? 'Copied!' : 'Copy Summary' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
