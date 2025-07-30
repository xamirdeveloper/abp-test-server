<template>
  <v-bottom-navigation class="ap-bottom-nav" height="69" tag="footer" :elevation="2">
    <v-btn
      v-for="item in items"
      :key="item.to as any"
      variant="text"
      class="ap-bottom-nav__btn"
      :ripple="true"
      @click="go(item.to)"
    >
      <span class="ap-bottom-nav__icon">
        <component
          :is="isActive(item.to) ? item.activeIcon || item.icon : item.icon"
          width="24"
          height="24"
          :stroke="isActive(item.to) ? 'var(--ap-btn-primary)' : 'var(--ap-btn-disabled)'"
        />
      </span>
      <span
        class="ap-bottom-nav__label"
        :class="{ 'ap-bottom-nav__label--active': isActive(item.to) }"
      >
        {{ item.label }}
      </span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import type { Component } from 'vue';
  import type { RouteLocationRaw } from 'vue-router';

  export interface BottomNavItem {
    label: string;
    to: RouteLocationRaw;
    icon: Component;
    activeIcon?: Component;
  }

  const props = defineProps<{
    items: BottomNavItem[];
  }>();

  const route = useRoute();
  const router = useRouter();

  const isActive = (to: any) => {
    if (typeof to === 'string') {
      return route.path === to;
    }
    if ('name' in to && to.name) {
      return route.name === to.name;
    }
    if ('path' in to && to.path) {
      return route.path === to.path;
    }
    return false;
  };

  const go = (to: any) => {
    router.push(to);
  };
</script>

<style scoped lang="scss">
  .ap-bottom-nav {
    position: fixed;
    right: 0;
    left: 0;
    bottom: calc(env(safe-area-inset-bottom) + 0px);
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 1000;
    background: var(--ap-bg-surface);
    display: flex;
    justify-content: center;
    align-items: center;

    &__btn {
      display: flex;
      flex-direction: column;
      min-width: 0 !important;
      width: 67px !important;
      height: 85% !important;
      padding: 8px;
      border-radius: 10px !important;
    }

    &__icon {
      line-height: 0;
      margin-bottom: 6px;
    }

    &__label {
      color: var(--ap-btn-disabled);
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      line-height: normal;
      transition: color 0.2s ease;

      &--active {
        color: var(--ap-btn-primary);
      }
    }
  }
</style>
