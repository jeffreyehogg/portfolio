<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ScriptableContext,
  type TooltipItem
} from 'chart.js'
import { Line } from 'vue-chartjs'
import type { OHLCBar } from '../../composables/useTechnicalChart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = withDefaults(
  defineProps<{
    history: { time: string; rate: number }[]
    candles?: OHLCBar[]
    currency: string
    base: string
    showEma20?: boolean
    showEma50?: boolean
    showBollinger?: boolean
  }>(),
  {
    candles: () => [],
    showEma20: false,
    showEma50: false,
    showBollinger: false
  }
)

const hasCandles = computed(() => props.candles && props.candles.length > 0)

const chartData = computed(() => {
  if (hasCandles.value) {
    const labels = props.candles.map(c => c.time)
    const datasets: any[] = [
      {
        label: `${props.base}/${props.currency} Spot`,
        data: props.candles.map(c => c.close),
        borderColor: '#10b981',
        borderWidth: 2,
        backgroundColor: (ctx: ScriptableContext<'line'>) => {
          const canvas = ctx.chart.ctx
          const gradient = canvas.createLinearGradient(0, 0, 0, 320)
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)')
          gradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.03)')
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)')
          return gradient
        },
        pointRadius: props.candles.length > 25 ? 2 : 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#0b0f19',
        fill: true,
        tension: 0.25
      }
    ]

    if (props.showEma20) {
      datasets.push({
        label: 'EMA 20',
        data: props.candles.map(c => c.ema20 ?? null),
        borderColor: '#f59e0b',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0.3
      })
    }

    if (props.showEma50) {
      datasets.push({
        label: 'EMA 50',
        data: props.candles.map(c => c.ema50 ?? null),
        borderColor: '#06b6d4',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0.3
      })
    }

    if (props.showBollinger) {
      datasets.push({
        label: 'Upper Band',
        data: props.candles.map(c => c.bbUpper ?? null),
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false
      })
      datasets.push({
        label: 'Lower Band',
        data: props.candles.map(c => c.bbLower ?? null),
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false
      })
    }

    return { labels, datasets }
  }

  // Fallback to rolling tick stream
  return {
    labels: props.history.map(h => h.time),
    datasets: [
      {
        label: `${props.base}/${props.currency}`,
        data: props.history.map(h => h.rate),
        borderColor: '#10b981',
        borderWidth: 2,
        backgroundColor: (ctx: ScriptableContext<'line'>) => {
          const canvas = ctx.chart.ctx
          const gradient = canvas.createLinearGradient(0, 0, 0, 320)
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)')
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)')
          return gradient
        },
        pointRadius: props.history.length > 15 ? 3 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#0b0f19',
        fill: true,
        tension: 0.35
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 300,
    easing: 'easeOutQuart' as const
  },
  interaction: {
    mode: 'index' as const,
    intersect: false
  },
  plugins: {
    legend: {
      display: hasCandles.value && (props.showEma20 || props.showEma50 || props.showBollinger),
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        color: '#94a3b8',
        font: { family: "'JetBrains Mono', monospace", size: 10 },
        boxWidth: 12,
        padding: 8
      }
    },
    tooltip: {
      backgroundColor: 'rgba(11, 15, 25, 0.94)',
      titleColor: '#94a3b8',
      titleFont: { family: "'JetBrains Mono', monospace", size: 11, weight: 'normal' as const },
      bodyColor: '#ffffff',
      bodyFont: { family: "'JetBrains Mono', monospace", size: 13, weight: 'bold' as const },
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      callbacks: {
        label: (context: TooltipItem<'line'>) => {
          const val = context.parsed.y
          return ` ${context.dataset.label || ''}: ${typeof val === 'number' ? val.toFixed(props.currency === 'JPY' ? 3 : 5) : val}`
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#64748b',
        font: { family: "'JetBrains Mono', monospace", size: 10 },
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 7
      }
    },
    y: {
      position: 'right' as const,
      border: { display: false },
      grid: { color: 'rgba(255, 255, 255, 0.04)' },
      ticks: {
        color: '#64748b',
        font: { family: "'JetBrains Mono', monospace", size: 10 },
        callback: (val: string | number) => Number(val).toFixed(props.currency === 'JPY' ? 2 : 4)
      }
    }
  }
}))
</script>

<template>
  <div
    class="h-64 sm:h-80 w-full relative"
    role="img"
    :aria-label="`Historical exchange rate trend for ${base} to ${currency}.`"
  >
    <Line :data="chartData" :options="chartOptions" />

    <!-- Accessible Data Table for Screen Readers -->
    <table class="sr-only">
      <caption>Recent exchange rates for {{ base }}/{{ currency }}</caption>
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Rate ({{ currency }})</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in history.slice(-5)" :key="index">
          <td>{{ item.time }}</td>
          <td>{{ item.rate.toFixed(5) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>