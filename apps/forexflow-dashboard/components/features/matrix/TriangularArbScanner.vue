<script setup lang="ts">
import { useCurrencyMatrix, type TriangularOpportunity } from '../../../composables/useCurrencyMatrix'

const { detectTriangularArbitrage } = useCurrencyMatrix()

const opportunities = ref<TriangularOpportunity[]>([])
const isScanning = ref(true)
const simulatedAnomalyInjected = ref(false)

const runScan = () => {
  const opps = detectTriangularArbitrage()
  if (simulatedAnomalyInjected.value && opps.length > 0) {
    // Boost first opportunity to simulate a high-profit live arbitrage window
    opps[0].profitPercent = 0.142
    opps[0].netMultiplier = 1.00142
    opps[0].estimatedProfitUsd = 1420
  }
  opportunities.value = opps
}

const injectAnomaly = () => {
  simulatedAnomalyInjected.value = true
  runScan()
  setTimeout(() => {
    simulatedAnomalyInjected.value = false
    runScan()
  }, 10000)
}

let scanTimer: NodeJS.Timeout
onMounted(() => {
  runScan()
  scanTimer = setInterval(runScan, 4000)
})

onUnmounted(() => {
  clearInterval(scanTimer)
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <h3 class="text-sm font-semibold text-white flex items-center gap-2">
          <UIcon name="i-heroicons-arrow-path-rounded-square" class="w-4 h-4 text-cyan-400" />
          Triangular arbitrage scanner
        </h3>
        <p class="text-xs text-slate-400">Real-time detection of synthetic pricing loops across G10 liquidity pools</p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="injectAnomaly"
          :disabled="simulatedAnomalyInjected"
          class="h-9 px-3 rounded-lg text-xs font-medium transition-all duration-150 active:scale-[0.98] border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50 flex items-center gap-1.5"
        >
          <span v-if="simulatedAnomalyInjected" class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Anomaly active (10s)
          </span>
          <span v-else class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-bolt" class="w-3.5 h-3.5 text-cyan-400" />
            Simulate arbitrage anomaly
          </span>
        </button>
      </div>
    </div>

    <!-- Opportunity Cards Grid -->
    <div v-if="opportunities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="(opp, idx) in opportunities"
        :key="opp.id"
        class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl hover:border-cyan-500/30 transition-all flex flex-col justify-between"
      >
        <div>
          <!-- Header Path -->
          <div class="flex items-center justify-between mb-3">
            <span class="font-mono text-xs font-bold text-white flex items-center gap-1">
              <span>{{ opp.path[0] }}</span>
              <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 text-slate-500" />
              <span>{{ opp.path[1] }}</span>
              <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 text-slate-500" />
              <span>{{ opp.path[2] }}</span>
              <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 text-slate-500" />
              <span>{{ opp.path[3] }}</span>
            </span>

            <span
              :class="[
                'text-xs px-2 py-0.5 rounded-md font-medium',
                opp.profitPercent > 0
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border border-white/[0.04]'
              ]"
            >
              {{ opp.profitPercent > 0 ? 'Active arb' : 'Neutral' }}
            </span>
          </div>

          <!-- Rates Breakdown -->
          <div class="space-y-1 font-mono text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-white/[0.03]">
            <div class="flex justify-between">
              <span>Leg 1 ({{ opp.path[0] }}/{{ opp.path[1] }}):</span>
              <span class="text-white">{{ opp.rates[0] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Leg 2 ({{ opp.path[1] }}/{{ opp.path[2] }}):</span>
              <span class="text-white">{{ opp.rates[1] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Leg 3 ({{ opp.path[2] }}/{{ opp.path[3] }}):</span>
              <span class="text-white">{{ opp.rates[2] }}</span>
            </div>
          </div>
        </div>

        <!-- Profit Readout -->
        <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block">Net yield</span>
            <span :class="['text-sm font-bold font-mono', opp.profitPercent > 0 ? 'text-emerald-400' : 'text-slate-400']">
              {{ opp.profitPercent > 0 ? '+' : '' }}{{ opp.profitPercent }}%
            </span>
          </div>
          <div class="text-right">
            <span class="text-[11px] text-slate-400 block">Est. return ($1M lot)</span>
            <span :class="['text-xs font-bold font-mono', opp.profitPercent > 0 ? 'text-emerald-400' : 'text-slate-400']">
              +${{ opp.estimatedProfitUsd.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty/Scanning State -->
    <div v-else class="p-8 text-center rounded-xl border border-white/[0.06] bg-slate-900/30">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-slate-500 animate-spin mx-auto mb-2" />
      <p class="text-xs text-slate-400">Scanning 120 G10 triangular cross-rate permutations...</p>
    </div>
  </div>
</template>
