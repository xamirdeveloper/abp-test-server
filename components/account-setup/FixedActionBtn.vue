<template>
  <v-btn
    :class="[disabled ? 'ap-btn-disabled' : color, 'fab-btn ap-radius-12']"
    :style="buttonStyle"
    height="48"
    :disabled="disabled"
    :loading="isLoading"
    @click="$emit('click')"
  >
    <slot name="prepend" />
    <span :class="['ap-txt-button', textColor]">
      {{ title }}
    </span>
    <slot name="append" />
  </v-btn>
</template>
<script setup lang="ts">
  import type { CSSProperties } from 'vue';

  interface Props {
    title?: string;
    disabled?: boolean;
    isLoading?: boolean;
    color?: string;
    textColor?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    color: 'ap-btn-primary',
    textColor: 'ap-text-btn',
  });

  defineEmits<{ (e: 'click'): void }>();

  const initialHeight = ref(0);
  const heightDiff = ref(0);
  const isKeyboardOpen = ref(false);

  const updateHeight = () => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const diff = initialHeight.value - viewport.height;
    heightDiff.value = diff > 150 ? diff : 0;
    isKeyboardOpen.value = diff > 150;
  };

  onMounted(() => {
    initialHeight.value = window.visualViewport?.height || window.innerHeight;
    window.visualViewport?.addEventListener('resize', updateHeight);
  });

  onUnmounted(() => {
    window.visualViewport?.removeEventListener('resize', updateHeight);
  });

  const buttonStyle = computed<CSSProperties>(() => {
    const bottom = isKeyboardOpen.value
      ? `${heightDiff.value + 10}px`
      : `calc(24px + env(safe-area-inset-bottom))`;

    return {
      bottom,
      position: 'fixed',
    };
  });
</script>

<style scoped lang="scss">
  .fab-btn {
    position: fixed;
    width: calc(100% - 40px);
    left: 20px;
    right: 20px;
    transition: bottom 0.3s ease;
    z-index: 999;
  }
</style>
