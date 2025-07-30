<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>
    <BaseBottomNav :items="items" />
  </v-app>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify';
  import { useThemeStore } from '@/stores/theme';
  import { type BottomNavItem } from '@/components/base/BaseBottomNav.vue';
  import IconCart from '~/components/icons/IconCart.vue';
  import IconHome from '~/components/icons/IconHome.vue';
  import IconServices from '~/components/icons/IconServices.vue';
  import IconTransfer from '~/components/icons/IconTransfer.vue';
  import IconUserProfile from '~/components/icons/IconUserProfile.vue';

  const theme = useTheme();
  const themeStore = useThemeStore();

  const items: BottomNavItem[] = [
    { label: 'امکانات', to: '/service', icon: IconServices },
    { label: 'انتقال وجه', to: '/transfer', icon: IconTransfer },
    { label: 'خانه', to: '/home', icon: IconHome },
    { label: 'کارت', to: '/cart', icon: IconCart },
    { label: 'پروفایل', to: '/profile', icon: IconUserProfile },
  ];

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
