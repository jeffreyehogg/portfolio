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
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

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

const props = defineProps<{
  history: { time: string; rate: number }[]
  currency: string
  base: string
}>()

const chartData = computed(() => ({
  labels: props.history.map(h => h.time),
  datasets: [
    {
      label: `${props.currency} vs ${props.base}`,
      backgroundColor: (ctx: any) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
        return gradient;
      },
      borderColor: '#10b981',
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#10b981',
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
      data: props.history.map(h => h.rate)
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: { 
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#10b981',
      bodyFont: { size: 14, weight: 'bold' },
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context: any) => `${context.parsed.y.toFixed(5)} ${props.base}`
      }
    }
  },
  scales: {
    x: { 
      grid: { display: false, drawBorder: false },
      ticks: { display: false }
    },
    y: { 
      border: { display: false }, 
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { color: '#9ca3af' }
    }
  }
}
</script>

<template>
  <div class="h-72 w-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>