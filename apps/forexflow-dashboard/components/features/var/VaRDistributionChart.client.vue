<script setup lang="ts">
const props = defineProps<{
  varPercent: number
  cvarPercent: number
  dailyVolPercent: number
  confidenceLevel: number
}>()

// Generate normal distribution curve points
const curvePoints = computed(() => {
  const points: { x: number; y: number; isLossZone: boolean }[] = []
  const mean = 0
  const stdDev = Math.max(0.2, props.dailyVolPercent)

  const minX = -4 * stdDev
  const maxX = 4 * stdDev
  const step = (maxX - minX) / 80

  for (let x = minX; x <= maxX; x += step) {
    // Normal PDF
    const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
    const isLossZone = x <= -props.varPercent
    points.push({ x, y, isLossZone })
  }

  return points
})

// Map points to SVG coordinates (width: 600, height: 200)
const svgPath = computed(() => {
  const pts = curvePoints.value
  if (!pts.length) return ''
  const maxY = Math.max(...pts.map(p => p.y), 0.001)

  const toSvgX = (x: number) => {
    const minX = pts[0].x
    const maxX = pts[pts.length - 1].x
    return ((x - minX) / (maxX - minX)) * 560 + 20
  }

  const toSvgY = (y: number) => {
    return 180 - (y / maxY) * 150
  }

  let d = `M ${toSvgX(pts[0].x)} ${toSvgY(pts[0].y)}`
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${toSvgX(pts[i].x)} ${toSvgY(pts[i].y)}`
  }

  return d
})

// Shaded loss area path
const lossAreaPath = computed(() => {
  const pts = curvePoints.value
  if (!pts.length) return ''
  const maxY = Math.max(...pts.map(p => p.y), 0.001)

  const toSvgX = (x: number) => {
    const minX = pts[0].x
    const maxX = pts[pts.length - 1].x
    return ((x - minX) / (maxX - minX)) * 560 + 20
  }

  const toSvgY = (y: number) => {
    return 180 - (y / maxY) * 150
  }

  const lossPoints = pts.filter(p => p.isLossZone)
  if (!lossPoints.length) return ''

  let d = `M ${toSvgX(lossPoints[0].x)} 180`
  for (const p of lossPoints) {
    d += ` L ${toSvgX(p.x)} ${toSvgY(p.y)}`
  }
  d += ` L ${toSvgX(lossPoints[lossPoints.length - 1].x)} 180 Z`

  return d
})
</script>

<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center text-xs font-mono text-slate-400">
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500/50" />
        {{ (confidenceLevel * 100).toFixed(0) }}% Tail Risk Zone (VaR &lt; -{{ varPercent }}%)
      </span>
      <span class="text-slate-500">Normal Parametric PDF</span>
    </div>

    <!-- SVG Distribution Curve -->
    <div class="w-full h-48 bg-[#0b0f19] rounded-xl border border-white/[0.06] p-2 relative overflow-hidden">
      <svg viewBox="0 0 600 200" class="w-full h-full">
        <!-- Zero Axis -->
        <line x1="300" y1="10" x2="300" y2="180" stroke="rgba(255,255,255,0.1)" stroke-dasharray="3,3" />
        <text x="305" y="25" fill="#64748b" font-size="10" font-family="'JetBrains Mono', monospace">μ = 0%</text>

        <!-- Shaded VaR Tail Loss Area -->
        <path :d="lossAreaPath" fill="rgba(244, 63, 94, 0.25)" />

        <!-- Probability Density Curve -->
        <path :d="svgPath" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" />

        <!-- Base Axis Line -->
        <line x1="20" y1="180" x2="580" y2="180" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      </svg>
    </div>

    <div class="flex justify-between text-[11px] font-mono text-slate-400 px-2">
      <span class="text-rose-400 font-semibold">1-Day VaR: -{{ varPercent }}%</span>
      <span class="text-amber-400 font-semibold">Expected Shortfall (CVaR): -{{ cvarPercent }}%</span>
      <span class="text-slate-500">Daily Vol: ±{{ dailyVolPercent }}%</span>
    </div>
  </div>
</template>
