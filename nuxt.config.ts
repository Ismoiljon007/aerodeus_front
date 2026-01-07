// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      apiBase: 'https://api.aerodeus.com/api/v1',
      siteUrl: 'https://aerodeus.uz',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables" as *; @use "@/assets/scss/mixins" as *;',
        },
      },
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
  ],

  // Site configuration for SEO
  site: {
    url: 'https://aerodeus.com',
    name: 'Aerodeus',
    description: 'Premium private charter flight booking platform',
    defaultLocale: 'en',
  },

  // Robots configuration
  robots: {
    disallow: [],
    sitemap: '/sitemap.xml',
  },

  // Sitemap configuration
  sitemap: {
    xsl: false,
  },

  // OG Image configuration
  ogImage: {
    enabled: false,
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'canonical', href: 'https://aerodeus.uz' },
      ],
      meta: [
        { name: 'theme-color', content: '#0a1628' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Aerodeus' },
        { property: 'og:image', content: 'https://aerodeus.uz/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://aerodeus.uz/og-image.jpg' },
      ],
    },
  },

  // image: {
  //   quality: 80,
  //   format: ['webp', 'jpg'],
  //   domains: ['api.aerodeus.com'],
  //   screens: {
  //     xs: 320,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     xxl: 1536,
  //   },
  // },

  i18n: {
    locales: [
      { code: 'en', name: 'En', file: 'en.json', iso: 'en-US' },
      { code: 'ru', name: 'Ru', file: 'ru.json', iso: 'ru-RU' },
      { code: 'uz', name: 'Uz', file: 'uz.json', iso: 'uz-UZ' },
    ],
    defaultLocale: 'en',
    langDir: './locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
});
