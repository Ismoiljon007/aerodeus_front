// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      apiBase: 'https://api.aerodeus.uz/api',
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

  modules: ['@nuxt/image', '@nuxt/eslint', 'v-gsap-nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'En' },
      { code: 'ru', name: 'Ru' },
      { code: 'uz', name: 'Uz' },
    ],
    defaultLocale: 'en',
  },
});
