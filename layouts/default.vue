<template>
  <v-app>
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
  import { useApplyTheme } from '@/composables/useApplyTheme';

  useApplyTheme();
</script>
