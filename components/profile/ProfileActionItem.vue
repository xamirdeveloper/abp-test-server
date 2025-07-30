<template>
  <v-btn
    block
    class="px-0 d-block ap-radius-4"
    height="40"
    variant="text"
    :disabled="disabled"
    :ripple="ripple"
    @click="handleClick"
  >
    <div class="w-100 d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <div
          v-if="hasIcon"
          :class="[
            'ap-border-1 ap-radius-full icon-wrapper me-3',
            error ? 'ap-border-error' : 'ap-border-accent-primary',
          ]"
        >
          <slot name="icon" v-if="$slots.icon" />
          <component v-else :is="icon" v-bind="iconProps" />
        </div>

        <span class="ap-txt-subtitle ap-text-primary title" :is-error="error">{{ title }}</span>
      </div>

      <slot name="append">
        <icon-chevron-left
          v-if="chevron"
          width="24"
          height="24"
          :stroke="error ? 'var(--ap-btn-error)' : 'var(--ap-text-primary)'"
        />
      </slot>
    </div>
  </v-btn>
</template>

<script setup lang="ts">
  import { useRouter, type RouteLocationRaw } from 'vue-router';
  import type { Component } from 'vue';

  interface ProfileItemProps {
    title: string;
    to?: RouteLocationRaw;
    icon?: Component;
    iconProps?: Record<string, any>;
    chevron?: boolean;
    disabled?: boolean;
    ripple?: boolean;
    error?: boolean;
  }

  const props = withDefaults(defineProps<ProfileItemProps>(), {
    chevron: true,
    disabled: false,
    ripple: true,
    icon: undefined,
    iconProps: () => ({ width: 20, height: 20 }),
  });

  const emit = defineEmits<{
    (e: 'click'): void;
  }>();

  const router = useRouter();

  const hasIcon = computed(() => !!props.icon || !!useSlots().icon);

  const handleClick = () => {
    if (props.to) {
      router.push(props.to);
    }
    emit('click');
  };
</script>

<style scoped>
  .icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title[is-error='true'] {
    color: var(--ap-btn-error) !important;
  }

  .ap-border-error {
    border: 1px solid rgba(223, 28, 65, 0.3) !important;
  }
</style>
