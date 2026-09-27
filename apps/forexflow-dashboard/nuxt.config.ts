// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // UI library and typography
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 600, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
      meta: [
        { name: 'theme-color', content: '#0b0f19' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    currencyApiKey: process.env.NUXT_CURRENCY_API_KEY || process.env.CURRENCY_API_KEY || '',
    public: {}
  },

  routeRules: {
    '/': { prerender: true },
    '/api/rates': {
      cors: true,
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=120' }
    }
  },

  compatibilityDate: '2024-07-04'
})