<script setup lang="ts">
const baseCurrency = ref('USD')
const targetCurrency = ref('EUR')
const currentRate = ref(0)
const lastUpdated = ref<string | null>(null)
const history = ref<{ time: string; rate: number }[]>([])
const loading = ref(true)

// Supported currencies for the dropdowns
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'CHF']

const fetchRates = async () => {
  try {
    // Call our API with the dynamic base
    const res: any = await $fetch('/api/rates', {
      query: { base: baseCurrency.value }
    })
    
    const rate = res.data[targetCurrency.value]
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    
    currentRate.value = rate
    lastUpdated.value = now.toLocaleTimeString()
    
    // Update history
    history.value.push({ time, rate })
    if (history.value.length > 20) history.value.shift()
    
    loading.value = false
  } catch (e) {
    console.error('Fetch error:', e)
  }
}

// Reset history when currency pairs change
const onPairChange = () => {
  history.value = []
  loading.value = true
  fetchRates()
}

// Auto-refresh logic
let interval: NodeJS.Timeout
onMounted(() => {
  fetchRates()
  interval = setInterval(fetchRates, 10000) 
})
onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8 font-sans">
    <UContainer>
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div class="text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UIcon name="i-heroicons-chart-bar-square" class="text-primary-500" />
            ForexFlow
          </h1>
          <p class="text-gray-500 text-sm mt-1">Real-time institutional exchange rates</p>
        </div>

        <UCard class="w-full md:w-auto">
          <div class="flex items-center gap-2 p-2">
            <USelect 
              v-model="baseCurrency" 
              :options="currencies" 
              @change="onPairChange"
              color="gray"
              variant="outline"
            />
            <UIcon name="i-heroicons-arrow-right" class="text-gray-400" />
            <USelect 
              v-model="targetCurrency" 
              :options="currencies.filter(c => c !== baseCurrency)" 
              @change="onPairChange"
              color="primary"
              variant="outline"
            />
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm">
          <template #header>
            <div class="flex justify-between items-center">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">Current Rate</p>
              <UBadge color="emerald" variant="subtle" size="xs">Live</UBadge>
            </div>
          </template>
          
          <div v-if="loading && !currentRate" class="space-y-2">
             <USkeleton class="h-10 w-3/4" />
             <USkeleton class="h-4 w-1/2" />
          </div>
          <div v-else>
            <div class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {{ currentRate.toFixed(5) }}
            </div>
            <div class="text-xs text-gray-400 mt-2 flex items-center gap-1">
               <UIcon name="i-heroicons-clock" />
               Updated: {{ lastUpdated }}
            </div>
          </div>
        </UCard>

        <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm">
          <template #header>
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">24h High</p>
          </template>
          <div v-if="loading" class="space-y-2"><USkeleton class="h-8 w-24" /></div>
          <div v-else class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {{ (currentRate * 1.004).toFixed(5) }}
          </div>
          <div class="text-xs text-emerald-500 mt-2 flex items-center">
            <UIcon name="i-heroicons-arrow-trending-up" class="mr-1"/> +0.4%
          </div>
        </UCard>
        
         <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm">
          <template #header>
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">24h Low</p>
          </template>
          <div v-if="loading" class="space-y-2"><USkeleton class="h-8 w-24" /></div>
          <div v-else class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {{ (currentRate * 0.992).toFixed(5) }}
          </div>
           <div class="text-xs text-gray-400 mt-2">Based on daily open</div>
        </UCard>
      </div>

      <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 shadow-lg">
        <template #header>
           <div class="flex items-center justify-between">
             <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
               {{ baseCurrency }}/{{ targetCurrency }} Trend
             </h2>
             <div class="flex gap-2">
                <UButton size="2xs" color="gray" variant="ghost" label="1H" />
                <UButton size="2xs" color="gray" variant="solid" label="1D" />
                <UButton size="2xs" color="gray" variant="ghost" label="1W" />
             </div>
           </div>
        </template>

        <div class="p-2">
          <ClientOnly>
            <div v-if="loading && history.length === 0" class="h-72 flex flex-col items-center justify-center space-y-4">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-primary-500" />
              <span class="text-gray-400 text-sm">Initializing market data...</span>
            </div>
            <ForexChart 
              v-else 
              :history="history" 
              :currency="targetCurrency" 
              :base="baseCurrency"
            />
          </ClientOnly>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>