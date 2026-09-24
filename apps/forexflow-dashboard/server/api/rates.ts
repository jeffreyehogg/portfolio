export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const base = query.base ? String(query.base) : 'USD'

  const targets = ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'CHF'].filter(c => c !== base)

  try {
    const response = await $fetch('https://api.freecurrencyapi.com/v1/latest', {
      query: {
        apikey: config.currencyApiKey,
        base_currency: base,
        currencies: targets.join(',')
      }
    })
    return response
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch currency rates'
    })
  }
})