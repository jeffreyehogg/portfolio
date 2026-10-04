<script setup lang="ts">
import { G10_CURRENCIES, type G10Currency } from '../../../composables/useForexMockFeeds'
import { TREASURY_PRESETS, type CurrencyPosition } from '../../../composables/usePortfolioVaR'

const props = defineProps<{
  positions: CurrencyPosition[]
  componentRisk: {
    currency: G10Currency
    notionalUsd: number
    weightPercent: number
    marginalRiskUsd: number
    isHedge: boolean
  }[]
}>()

const emit = defineEmits<{
  (e: 'applyPreset', presetId: string): void
  (e: 'updatePosition', currency: G10Currency, amount: number): void
}>()
</script>

<template>
  <div class="space-y-4">
    <!-- Sleek Preset Pill Bar (Directive 3) -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
      <span class="text-xs text-slate-400 font-medium whitespace-nowrap">Try a portfolio:</span>
      <div class="flex items-center gap-1.5">
        <button
          v-for="preset in TREASURY_PRESETS"
          :key="preset.id"
          @click="emit('applyPreset', preset.id)"
          class="h-8 px-2.5 rounded-lg border border-white/[0.08] bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-all duration-150 active:scale-[0.98] whitespace-nowrap flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{{ preset.name }}</span>
        </button>
      </div>
    </div>

    <!-- Allocations List -->
    <div class="rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl overflow-hidden">
      <div class="p-3 bg-slate-900/50 border-b border-white/[0.06] flex justify-between items-center text-xs text-slate-400 font-medium">
        <span>Currency exposure</span>
        <span>Risk contribution</span>
      </div>

      <div class="divide-y divide-white/[0.04]">
        <div
          v-for="pos in positions"
          :key="pos.currency"
          class="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-800/20 transition-colors"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">{{ G10_CURRENCIES[pos.currency]?.flag }}</span>
            <div>
              <span class="font-mono text-xs font-bold text-white">{{ pos.currency }}</span>
              <span class="text-xs text-slate-400 ml-2">{{ G10_CURRENCIES[pos.currency]?.name }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <!-- Amount Input -->
            <div class="relative">
              <span class="absolute left-2.5 top-2 text-xs font-mono text-slate-500">$</span>
              <input
                type="number"
                :value="pos.notionalUsd"
                @input="emit('updatePosition', pos.currency, Number(($event.target as HTMLInputElement).value))"
                class="w-36 h-9 pl-6 pr-2 rounded-lg bg-slate-900 border border-white/[0.1] text-xs font-mono text-white font-semibold focus:ring-1 focus:ring-emerald-500 text-right"
              />
            </div>

            <!-- Risk Contribution -->
            <div class="text-right w-24">
              <span
                :class="[
                  'text-xs font-mono font-semibold block',
                  (componentRisk.find(c => c.currency === pos.currency)?.isHedge)
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                ]"
              >
                {{ (componentRisk.find(c => c.currency === pos.currency)?.isHedge) ? 'Hedge (-)' : 'Risk (+)' }}
              </span>
              <span class="text-[10px] font-mono text-slate-500">
                {{ componentRisk.find(c => c.currency === pos.currency)?.weightPercent }}% Weight
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
