// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      apiBase: 'https://aerodeus.fargenius.uz/api/v1',
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

  modules: ['@nuxt/image', '@nuxt/eslint', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'En', file: 'en.json' },
      { code: 'ru', name: 'Ru', file: 'ru.json' },
      { code: 'uz', name: 'Uz', file: 'uz.json' },
    ],
    defaultLocale: 'uz',
    langDir: './locales/',
    strategy: 'no_prefix',
  },
});
