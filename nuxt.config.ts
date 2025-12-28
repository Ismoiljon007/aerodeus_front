// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      apiBase: 'https://api.aerodeus.uz/api',
      siteUrl: '',
      siteName: 'Aerodeus',
      siteDescription: 'Reliable freight and logistics services for businesses nationwide.',
      siteLocale: 'en_US',
      siteLang: 'en',
      siteImage: '',
      twitterHandle: '',
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
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

  modules: ['@nuxt/image', '@nuxt/eslint', 'v-gsap-nuxt'],
});
