// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // This registers the UI library and Fonts
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains+Mono': [400, 500]
    }
  },

  colorMode: {
    preference: 'dark'
  },

  runtimeConfig: {
    currencyApiKey: '', // Reads from .env
    public: {}
  },

  // Basic route rules
  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2024-07-04'
})