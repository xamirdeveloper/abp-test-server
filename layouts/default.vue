<template>
  <v-app>
    <v-main class="main-wrapper">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }, // ضروری برای PWA
    { rel: 'apple-touch-icon', href: '/pwa-icons/pwa-icon-192x192.png' } // برای iOS
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'theme-color', content: 'transparent' }
  ]
})

  import { useApplyTheme } from '@/composables/useApplyTheme';

  useApplyTheme();
</script>
<style scoped>
  .main-wrapper {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
