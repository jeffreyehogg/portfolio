// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: '.',
  dir: {
    app: '.'
  },
  telemetry: false,
  devtools: { enabled: false },

  // Tailwind CSS (zero @nuxt/ui or @nuxtjs/google-fonts dependencies)
  modules: ['@nuxtjs/tailwindcss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
          }
        }
      }
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
      meta: [
        { name: 'theme-color', content: '#0b0f19' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
        }
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