<script setup lang="ts">
import CrossRateHeatmap from './CrossRateHeatmap.vue'
import TriangularArbScanner from './TriangularArbScanner.vue'
import SlippageCalculator from './SlippageCalculator.vue'

const emit = defineEmits<{
  (e: 'selectPair', base: string, target: string): void
}>()

const activeSubTab = ref<'heatmap' | 'arbitrage' | 'slippage'>('heatmap')

const tabs = [
  { id: 'heatmap', label: 'Cross-Rate Matrix', icon: 'i-heroicons-table-cells' },
  { id: 'arbitrage', label: 'Triangular Arbitrage', icon: 'i-heroicons-arrow-path-rounded-square' },
  { id: 'slippage', label: 'Slippage & SOR Simulator', icon: 'i-heroicons-scale' }
]
</script>

<template>
  <div class="rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-6 space-y-6">
    <!-- Sub-tab Bar -->
    <div class="flex flex-wrap items-center gap-2 pb-4 border-b border-white/[0.06]">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="activeSubTab = t.id as any"
        :class="[
          'min-h-[44px] px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all duration-150 active:scale-[0.98]',
          activeSubTab === t.id
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        ]"
      >
        <UIcon :name="t.icon" class="w-4 h-4" />
        <span>{{ t.label }}</span>
      </button>
    </div>

    <!-- Active Sub-View -->
    <div>
      <CrossRateHeatmap 
        v-if="activeSubTab === 'heatmap'" 
        @select-pair="(b, t) => emit('selectPair', b, t)" 
      />
      <TriangularArbScanner 
        v-else-if="activeSubTab === 'arbitrage'" 
      />
      <SlippageCalculator 
        v-else-if="activeSubTab === 'slippage'" 
      />
    </div>
  </div>
</template>
