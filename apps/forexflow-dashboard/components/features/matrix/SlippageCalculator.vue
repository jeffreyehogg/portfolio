<script setup lang="ts">
import { G10_CURRENCIES, type G10Currency } from '../../../composables/useForexMockFeeds'
import { useCurrencyMatrix, type SlippageRequest } from '../../../composables/useCurrencyMatrix'

const { calculateSlippage } = useCurrencyMatrix()

const selectedBase = ref<G10Currency>('EUR')
const selectedTarget = ref<G10Currency>('USD')
const notionalUsd = ref(2500000)
const urgency = ref<'passive' | 'neutral' | 'aggressive'>('neutral')

const pairs = [
  { base: 'EUR' as G10Currency, target: 'USD' as G10Currency, label: 'EUR/USD' },
  { base: 'GBP' as G10Currency, target: 'USD' as G10Currency, label: 'GBP/USD' },
  { base: 'USD' as G10Currency, target: 'JPY' as G10Currency, label: 'USD/JPY' },
  { base: 'USD' as G10Currency, target: 'CAD' as G10Currency, label: 'USD/CAD' },
  { base: 'USD' as G10Currency, target: 'CHF' as G10Currency, label: 'USD/CHF' }
]

const result = computed(() => {
  return calculateSlippage({
    pair: `${selectedBase.value}/${selectedTarget.value}`,
    base: selectedBase.value,
    target: selectedTarget.value,
    notionalUsd: notionalUsd.value,
    urgency: urgency.value
  })
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-sm font-semibold text-white flex items-center gap-2">
        <UIcon name="i-heroicons-scale" class="w-4 h-4 text-emerald-400" />
        Institutional Slippage & Smart Order Routing (SOR) Simulator
      </h3>
      <p class="text-xs text-slate-400">Almgren-Chriss square-root market impact modeling across Tier-1 interbank liquidity venues</p>
    </div>

    <!-- Controls Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl">
      <!-- Pair Selector -->
      <div>
        <label for="pair-selector" class="block text-xs font-mono font-semibold text-slate-400 mb-1.5 uppercase">
          Currency Pair
        </label>
        <select
          id="pair-selector"
          v-model="selectedBase"
          @change="selectedTarget = selectedBase === 'USD' ? 'EUR' : 'USD'"
          class="w-full h-11 px-3 rounded-lg bg-slate-900 border border-white/[0.1] text-white font-mono text-xs font-semibold focus:ring-1 focus:ring-emerald-500 cursor-pointer"
        >
          <option v-for="p in pairs" :key="p.label" :value="p.base">{{ p.label }}</option>
        </select>
      </div>

      <!-- Notional Slider -->
      <div>
        <div class="flex justify-between items-center mb-1.5">
          <label for="notional-slider" class="text-xs font-mono font-semibold text-slate-400 uppercase">
            Order Notional (USD)
          </label>
          <span class="text-xs font-mono font-bold text-emerald-400">
            ${{ (notionalUsd / 1000000).toFixed(2) }}M
          </span>
        </div>
        <input
          id="notional-slider"
          type="range"
          min="100000"
          max="20000000"
          step="250000"
          v-model.number="notionalUsd"
          class="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div class="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
          <span>$100K</span>
          <span>$10M</span>
          <span>$20M</span>
        </div>
      </div>

      <!-- Execution Urgency -->
      <div>
        <span class="block text-xs font-mono font-semibold text-slate-400 mb-1.5 uppercase">Execution Urgency</span>
        <div class="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-slate-900 border border-white/[0.06]">
          <button
            v-for="u in ['passive', 'neutral', 'aggressive']"
            :key="u"
            @click="urgency = u as any"
            :class="[
              'h-9 rounded-md font-mono text-xs font-semibold uppercase transition-all duration-150',
              urgency === u
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            {{ u === 'passive' ? 'Maker' : u === 'neutral' ? 'TWAP' : 'Sweep' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Simulation KPI Output Bento -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div class="p-4 rounded-xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Mid Benchmark</span>
        <div class="text-xl font-mono font-bold text-white tabular-nums">
          {{ result.nominalRate }}
        </div>
        <span class="text-[10px] font-mono text-slate-400 mt-1 block">Unimpacted quote</span>
      </div>

      <div class="p-4 rounded-xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Estimated Slippage</span>
        <div class="text-xl font-mono font-bold text-rose-400 tabular-nums">
          {{ result.slippagePips }} Pips
        </div>
        <span class="text-[10px] font-mono text-rose-300/80 mt-1 block">+{{ result.marketImpactBps }} bps impact</span>
      </div>

      <div class="p-4 rounded-xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Implementation Shortfall</span>
        <div class="text-xl font-mono font-bold text-amber-300 tabular-nums">
          ${{ result.slippageUsd.toLocaleString() }}
        </div>
        <span class="text-[10px] font-mono text-slate-400 mt-1 block">Frictional cost</span>
      </div>

      <div class="p-4 rounded-xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl">
        <span class="text-[10px] font-mono text-slate-500 uppercase block mb-1">Blended VWAP Fill</span>
        <div class="text-xl font-mono font-bold text-cyan-300 tabular-nums">
          {{ result.vwap }}
        </div>
        <span class="text-[10px] font-mono text-cyan-400/80 mt-1 block">Multi-ECN blended</span>
      </div>
    </div>

    <!-- Smart Order Routing Venue Split -->
    <div class="p-4 rounded-xl border border-white/[0.08] bg-[#0b0f19]/70 backdrop-blur-xl space-y-3">
      <div class="flex justify-between items-center text-xs font-mono font-semibold text-slate-300">
        <span>SMART ORDER ROUTING (SOR) VENUE ALLOCATION</span>
        <span class="text-emerald-400">OPTIMAL LIQUIDITY SPLIT</span>
      </div>

      <div class="space-y-3 pt-2">
        <div v-for="venue in result.venues" :key="venue.name" class="space-y-1">
          <div class="flex justify-between text-xs font-mono">
            <span class="text-white font-medium">{{ venue.name }} ({{ venue.sharePercent }}%)</span>
            <span class="text-slate-400">${{ (venue.allocatedUsd / 1000).toLocaleString() }}K @ <span class="text-slate-200">{{ venue.fillRate }}</span></span>
          </div>
          <div class="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/[0.06]">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
              :style="{ width: `${venue.sharePercent}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
