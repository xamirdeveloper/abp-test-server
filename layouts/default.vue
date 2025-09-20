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
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'theme-color', content: '#2d31fa' }
  ]
})

  import { useApplyTheme } from '@/composables/useApplyTheme';

  useApplyTheme();
</script>
<style scoped>
  .main-wrapper {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
