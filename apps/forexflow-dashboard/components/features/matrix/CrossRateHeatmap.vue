<script setup lang="ts">
import { G10_CURRENCIES, type G10Currency } from '../../../composables/useForexMockFeeds'
import { useCurrencyMatrix } from '../../../composables/useCurrencyMatrix'

const { matrix } = useCurrencyMatrix()

const emit = defineEmits<{
  (e: 'selectPair', base: string, target: string): void
}>()

const activeCurrencies: G10Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'CHF']

const getHeatmapColor = (change24h: number) => {
  if (change24h > 0.4) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  if (change24h > 0) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  if (change24h < -0.4) return 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  if (change24h < 0) return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  return 'bg-slate-900/40 text-slate-400 border-white/[0.04]'
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div>
        <h3 class="text-sm font-semibold text-white flex items-center gap-2">
          <UIcon name="i-heroicons-table-cells" class="w-4 h-4 text-emerald-400" />
          G10 cross-rate matrix
        </h3>
        <p class="text-xs text-slate-400">Click any pair to load directly in live chart</p>
      </div>
      <div class="flex items-center gap-3 text-xs text-slate-400">
        <span class="inline-flex items-center gap-1.5">
          <span class="w-2 h-2 rounded bg-emerald-500/60" /> Positive
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="w-2 h-2 rounded bg-rose-500/60" /> Negative
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="w-2 h-2 rounded bg-slate-700" /> Parity
        </span>
      </div>
    </div>

    <!-- Matrix Table -->
    <div class="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl">
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="border-b border-white/[0.08] bg-slate-900/60 font-mono text-[11px]">
            <th class="p-3 text-left font-bold text-slate-400">Base / Quote</th>
            <th 
              v-for="target in activeCurrencies" 
              :key="`th-${target}`"
              class="p-3 text-center font-bold text-slate-300"
            >
              {{ target }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/[0.04]">
          <tr 
            v-for="base in activeCurrencies" 
            :key="`row-${base}`"
            class="hover:bg-slate-800/20 transition-colors"
          >
            <!-- Row Base Header -->
            <td class="p-3 font-bold text-white bg-slate-900/40 border-r border-white/[0.06]">
              <div class="flex items-center gap-1.5">
                <span>{{ G10_CURRENCIES[base]?.flag }}</span>
                <span>{{ base }}</span>
              </div>
            </td>

            <!-- Target Rate Cells -->
            <td 
              v-for="target in activeCurrencies" 
              :key="`cell-${base}-${target}`"
              class="p-2 text-center"
            >
              <div v-if="base === target" class="py-2 text-slate-600 font-semibold select-none">
                1.0000
              </div>
              <button
                v-else
                @click="emit('selectPair', base, target)"
                :class="[
                  'w-full py-1.5 px-2 rounded-lg border transition-all duration-150 active:scale-[0.97] hover:ring-1 hover:ring-emerald-400 flex flex-col items-center justify-center',
                  getHeatmapColor(matrix[base]?.[target]?.change24h || 0)
                ]"
                :title="`Click to analyze ${base}/${target}. Spread: ${matrix[base]?.[target]?.spreadPips} pips`"
              >
                <span class="font-bold tabular-nums">
                  {{ matrix[base]?.[target]?.rate ?? '—' }}
                </span>
                <span class="text-[9px] opacity-80 flex items-center gap-1 mt-0.5">
                  <span>{{ (matrix[base]?.[target]?.change24h || 0) >= 0 ? '+' : '' }}{{ matrix[base]?.[target]?.change24h }}%</span>
                  <span class="text-slate-500">|</span>
                  <span class="text-slate-400">{{ matrix[base]?.[target]?.spreadPips }}p</span>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
