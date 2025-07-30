<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>
    <BaseBottomNav :items="items" />
  </v-app>
</template>

<script setup lang="ts">
  import { useApplyTheme } from '@/composables/useApplyTheme';
  import { type BottomNavItem } from '@/components/base/BaseBottomNav.vue';
  import IconCart from '~/components/icons/IconCart.vue';
  import IconHome from '~/components/icons/IconHome.vue';
  import IconServices from '~/components/icons/IconServices.vue';
  import IconTransfer from '~/components/icons/IconTransfer.vue';
  import IconUserProfile from '~/components/icons/IconUserProfile.vue';

  useApplyTheme();

  const items: BottomNavItem[] = [
    { label: 'امکانات', to: '/service', icon: IconServices },
    { label: 'انتقال وجه', to: '/transfer', icon: IconTransfer },
    { label: 'خانه', to: '/home', icon: IconHome },
    { label: 'کارت', to: '/cart', icon: IconCart },
    { label: 'پروفایل', to: '/profile', icon: IconUserProfile },
  ];
</script>
