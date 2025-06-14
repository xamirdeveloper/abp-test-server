// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['@/assets/index.scss', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@vite-pwa/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  app: {
    head: {
      link: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
      meta: [{ name: 'theme-color', content: '#2D31FA' }],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Alibaba Pays',
      short_name: 'AlibabaPays',
      description: 'A neo-bank PWA for secure and fast payments.',
      theme_color: '#f8f5ff', // رنگ پس‌زمینه اسپلش و نوار مرورگر
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      lang: 'en',
      icons: [
        {
          src: '/icons/web-app-manifest-192x192',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/web-app-manifest-512x512',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/web-app-manifest-512x512',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: '/*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'default',
          },
        },
      ],
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
