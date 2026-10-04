<script setup lang="ts">
const props = defineProps<{
  currentRate: number
  targetCurrency: string
}>()

const rate = computed(() => props.currentRate > 0 ? props.currentRate : 1.0850)

// Simulated depth levels
const depthLevels = computed(() => {
  const r = rate.value
  const decimals = props.targetCurrency === 'JPY' ? 3 : 5

  const asks = [
    { price: Number((r * 1.0006).toFixed(decimals)), size: '1.4M', depthPercent: 40 },
    { price: Number((r * 1.0004).toFixed(decimals)), size: '2.1M', depthPercent: 65 },
    { price: Number((r * 1.0002).toFixed(decimals)), size: '3.8M', depthPercent: 90 }
  ]

  const bids = [
    { price: Number((r * 0.9998).toFixed(decimals)), size: '4.2M', depthPercent: 95 },
    { price: Number((r * 0.9996).toFixed(decimals)), size: '2.6M', depthPercent: 70 },
    { price: Number((r * 0.9994).toFixed(decimals)), size: '1.2M', depthPercent: 35 }
  ]

  return { asks, bids }
})
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-white/[0.06]">
      <div class="flex items-center gap-1.5">
        <UIcon name="i-heroicons-bars-arrow-up" class="w-4 h-4 text-cyan-400" />
        <span class="text-xs font-semibold text-white">Order book depth</span>
      </div>
      <span class="text-xs text-slate-400">Aggregated ECN</span>
    </div>

    <!-- Asks (Sells) -->
    <div class="space-y-1">
      <div
        v-for="(ask, idx) in depthLevels.asks"
        :key="`ask-${idx}`"
        class="relative flex justify-between items-center text-xs py-1 px-2 rounded overflow-hidden font-mono"
      >
        <div
          class="absolute inset-y-0 right-0 bg-rose-500/15 rounded transition-all duration-300"
          :style="{ width: `${ask.depthPercent}%` }"
        />
        <span class="relative text-rose-400 font-medium tabular-nums">{{ ask.price }}</span>
        <span class="relative text-slate-400 text-[11px] tabular-nums">{{ ask.size }}</span>
      </div>
    </div>

    <!-- Mid Rate Line -->
    <div class="py-1 px-2.5 rounded-lg border border-white/[0.08] bg-slate-950/60 flex justify-between items-center">
      <span class="text-xs text-slate-400">Mid quote</span>
      <span class="text-xs font-bold text-white font-mono tabular-nums">{{ rate.toFixed(targetCurrency === 'JPY' ? 3 : 5) }}</span>
    </div>

    <!-- Bids (Buys) -->
    <div class="space-y-1">
      <div
        v-for="(bid, idx) in depthLevels.bids"
        :key="`bid-${idx}`"
        class="relative flex justify-between items-center text-xs py-1 px-2 rounded overflow-hidden"
      >
        <div
          class="absolute inset-y-0 right-0 bg-emerald-500/15 rounded transition-all duration-300"
          :style="{ width: `${bid.depthPercent}%` }"
        />
        <span class="relative text-emerald-400 font-medium tabular-nums">{{ bid.price }}</span>
        <span class="relative text-slate-400 text-[11px] tabular-nums">{{ bid.size }}</span>
      </div>
    </div>
  </div>
</template>
