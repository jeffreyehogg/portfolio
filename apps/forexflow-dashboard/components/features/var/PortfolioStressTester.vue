<script setup lang="ts">
import { usePortfolioVaR } from '../../../composables/usePortfolioVaR'
import type { G10Currency } from '../../../composables/useForexMockFeeds'
import ExposureAllocationTable from './ExposureAllocationTable.vue'
import VaRDistributionChart from './VaRDistributionChart.client.vue'
import CrisisScenarioCards from './CrisisScenarioCards.vue'

const {
  positions,
  confidenceLevel,
  horizonDays,
  applyPreset,
  varMetrics
} = usePortfolioVaR()

const updatePosition = (currency: G10Currency, amount: number) => {
  const pos = positions.value.find(p => p.currency === currency)
  if (pos) {
    pos.notionalUsd = isNaN(amount) ? 0 : amount
  }
}
</script>

<template>
  <div class="rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/[0.06]">
      <div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-emerald-400" />
          Enterprise Treasury Value-at-Risk (VaR) Engine
        </h3>
        <p class="text-xs text-slate-400">Parametric risk modeling, Expected Shortfall (CVaR), and historical macro shock stress-testing</p>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Confidence Level -->
        <div class="flex items-center p-1 rounded-xl bg-slate-950/60 border border-white/[0.06]">
          <button
            v-for="lvl in [0.90, 0.95, 0.99]"
            :key="lvl"
            @click="confidenceLevel = lvl as any"
            :class="[
              'h-9 px-3 rounded-lg font-mono text-xs font-semibold transition-all duration-150',
              confidenceLevel === lvl
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            {{ (lvl * 100).toFixed(0) }}% CL
          </button>
        </div>

        <!-- Horizon -->
        <div class="flex items-center p-1 rounded-xl bg-slate-950/60 border border-white/[0.06]">
          <button
            v-for="h in [1, 5, 10, 30]"
            :key="h"
            @click="horizonDays = h as any"
            :class="[
              'h-9 px-3 rounded-lg font-mono text-xs font-semibold transition-all duration-150',
              horizonDays === h
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            {{ h }}D
          </button>
        </div>
      </div>
    </div>

    <!-- VaR Key Metrics Bento -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Total Treasury Notional</span>
        <div class="text-2xl font-mono font-bold text-white tabular-nums">
          ${{ (varMetrics.totalPortfolioUsd / 1000000).toFixed(2) }}M
        </div>
        <span class="text-[10px] font-mono text-slate-400 mt-1 block">Active positions</span>
      </div>

      <div class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">
          {{ horizonDays }}D Value-at-Risk ({{ (confidenceLevel * 100).toFixed(0) }}% CL)
        </span>
        <div class="text-2xl font-mono font-bold text-rose-400 tabular-nums">
          -${{ (varMetrics.varUsd / 1000).toLocaleString() }}K
        </div>
        <span class="text-[10px] font-mono text-rose-300/80 mt-1 block">
          -{{ varMetrics.varPercent }}% maximum expected loss
        </span>
      </div>

      <div class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Expected Shortfall (CVaR)</span>
        <div class="text-2xl font-mono font-bold text-amber-300 tabular-nums">
          -${{ (varMetrics.cvarUsd / 1000).toLocaleString() }}K
        </div>
        <span class="text-[10px] font-mono text-amber-400/80 mt-1 block">
          -{{ varMetrics.cvarPercent }}% average tail breach
        </span>
      </div>

      <div class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Annualized Volatility</span>
        <div class="text-2xl font-mono font-bold text-cyan-300 tabular-nums">
          {{ varMetrics.annualizedVolatilityPercent }}%
        </div>
        <span class="text-[10px] font-mono text-cyan-400/80 mt-1 block">
          ±{{ varMetrics.dailyVolatilityPercent }}% daily drift
        </span>
      </div>
    </div>

    <!-- Distribution Curve and Allocations Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-6 space-y-4">
        <ExposureAllocationTable
          :positions="positions"
          :component-risk="varMetrics.componentRisk"
          @apply-preset="applyPreset"
          @update-position="updatePosition"
        />
      </div>

      <div class="lg:col-span-6 space-y-4">
        <ClientOnly>
          <VaRDistributionChart
            :var-percent="varMetrics.varPercent"
            :cvar-percent="varMetrics.cvarPercent"
            :daily-vol-percent="varMetrics.dailyVolatilityPercent"
            :confidence-level="confidenceLevel"
          />
        </ClientOnly>
      </div>
    </div>

    <!-- Crisis Scenarios -->
    <div class="pt-4 border-t border-white/[0.06]">
      <CrisisScenarioCards :scenario-results="varMetrics.scenarioResults" />
    </div>
  </div>
</template>
