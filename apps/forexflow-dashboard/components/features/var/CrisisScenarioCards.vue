<script setup lang="ts">
import { HISTORICAL_CRISIS_SCENARIOS, type CrisisScenario } from '../../../composables/usePortfolioVaR'

const props = defineProps<{
  scenarioResults: {
    scenarioId: string
    name: string
    projectedPnLUsd: number
    projectedReturnPercent: number
  }[]
}>()

const getScenarioDetails = (id: string): CrisisScenario | undefined => {
  return HISTORICAL_CRISIS_SCENARIOS.find(s => s.id === id)
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <h4 class="text-xs font-semibold text-slate-300 flex items-center gap-2">
        <UIcon name="i-heroicons-shield-exclamation" class="w-4 h-4 text-amber-400" />
        Historical stress tests
      </h4>
      <p class="text-xs text-slate-400">Projected drawdowns based on landmark currency dislocations</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="res in scenarioResults"
        :key="res.scenarioId"
        class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-white">{{ res.name }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {{ getScenarioDetails(res.scenarioId)?.badge }}
            </span>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed mb-3">
            {{ getScenarioDetails(res.scenarioId)?.description }}
          </p>
        </div>

        <!-- Projected PnL -->
        <div class="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block">Simulated return</span>
            <span
              :class="[
                'text-sm font-bold font-mono',
                res.projectedReturnPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
              ]"
            >
              {{ res.projectedReturnPercent >= 0 ? '+' : '' }}{{ res.projectedReturnPercent }}%
            </span>
          </div>

          <div class="text-right">
            <span class="text-[11px] text-slate-400 block">Projected P&amp;L</span>
            <span
              :class="[
                'text-sm font-bold font-mono',
                res.projectedPnLUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'
              ]"
            >
              {{ res.projectedPnLUsd >= 0 ? '+' : '' }}${{ res.projectedPnLUsd.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
