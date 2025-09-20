<template>
  <v-app>
    <v-main class="main-wrapper">
      <NuxtPage />
    </v-main>
    <base-bottom-nav :items="items" />
  </v-app>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }
  ]
})

  import { useApplyTheme } from '@/composables/useApplyTheme';
  import { type BottomNavItem } from '@/components/base/BaseBottomNav.vue';
  import IconCartOutline from '~/components/icons/IconCartOutline.vue';
  import IconHomeOutline from '~/components/icons/IconHomeOutline.vue';
  import IconServicesOutline from '~/components/icons/IconServicesOutline.vue';
  import IconTransferOutline from '~/components/icons/IconTransferOutline.vue';
  import IconUserProfileOutline from '~/components/icons/IconUserProfileOutline.vue';
  import IconHomeFill from '~/components/icons/IconHomeFill.vue';
  import IconTransferFill from '~/components/icons/IconTransferFill.vue';
  import IconUserProfileFill from '~/components/icons/IconUserProfileFill.vue';
  import IconCartFill from '~/components/icons/IconCartFill.vue';
  import IconServicesFill from '~/components/icons/IconServicesFill.vue';

  useApplyTheme();

  const items: BottomNavItem[] = [
    { label: 'امکانات', to: '/services', icon: IconServicesOutline, activeIcon: IconServicesFill },
    {
      label: 'انتقال وجه',
      to: '/transfer',
      icon: IconTransferOutline,
      activeIcon: IconTransferFill,
    },
    { label: 'خانه', to: '/home', icon: IconHomeOutline, activeIcon: IconHomeFill },
    { label: 'کارت', to: '/card', icon: IconCartOutline, activeIcon: IconCartFill },
    {
      label: 'پروفایل',
      to: '/profile',
      icon: IconUserProfileOutline,
      activeIcon: IconUserProfileFill,
    },
  ];
</script>
<style scoped lang="scss">
  .main-wrapper {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
