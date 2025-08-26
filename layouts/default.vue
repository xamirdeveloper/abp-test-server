<template>
  <v-app>
    <v-main class="main-wrapper">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
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
