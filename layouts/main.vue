<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>
    <BaseBottomNav :items="items" />
  </v-app>
</template>

<script setup lang="ts">
  import { IconCart } from '#components';
  import BaseBottomNav, { type BottomNavItem } from '@/components/base/BaseBottomNav.vue';
  import { useThemeStore } from '@/stores/theme';
  import { useTheme } from 'vuetify';
  import IconHome from '~/components/icons/IconHome.vue';
  import IconServices from '~/components/icons/IconServices.vue';
  import IconTransfer from '~/components/icons/IconTransfer.vue';
  import IconUserProfile from '~/components/icons/IconUserProfile.vue';

  const themeStore = useThemeStore();
  const vuetifyTheme = useTheme();

  onMounted(() => {
    themeStore.initTheme();
    vuetifyTheme.change(themeStore.theme);
  });

  watch(
    () => themeStore.theme,
    (val) => {
      vuetifyTheme.global.name.value = val;
    }
  );

  window.addEventListener('storage', (event) => {
    if (event.key === 'theme') {
      const newTheme = event.newValue as 'light' | 'dark';
      if (newTheme && newTheme !== themeStore.theme) {
        themeStore.setTheme(newTheme);
      }
    }
  });

  const items: BottomNavItem[] = [
    { label: 'امکانات', to: '/service', icon: IconServices },
    { label: 'انتقال وجه', to: '/transfer', icon: IconTransfer },
    { label: 'خانه', to: '/home', icon: IconHome },
    { label: 'کارت', to: '/cart', icon: IconCart },
    { label: 'پروفایل', to: '/profile', icon: IconUserProfile },
  ];
</script>
