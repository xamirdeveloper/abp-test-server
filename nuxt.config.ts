// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['@/assets/index.scss', '@/assets/global.scss', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://bank.alibabapays.com',
          changeOrigin: true,
          secure: false, // just for dev env
        },
      },
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    { path: '~/components/icons', extensions: ['vue'], prefix: 'Icon' },
  ],
   // @ts-expect-error
   pwa: {
    registerType: 'autoUpdate',
    manifest: '/manifest.json',
    workbox: {
    cleanupOutdatedCaches: true,
    }
  }
});
