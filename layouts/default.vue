<template>
  <v-app>
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify';
  import { useThemeStore } from '@/stores/theme';

  const theme = useTheme();
  const themeStore = useThemeStore();

  onMounted(() => {
    theme.global.name.value = themeStore.theme;

    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${themeStore.theme}`);
  });

  watch(
    () => themeStore.theme,
    (newVal) => {
      theme.global.name.value = newVal;
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.add(`theme-${newVal}`);
    }
  );
</script>
