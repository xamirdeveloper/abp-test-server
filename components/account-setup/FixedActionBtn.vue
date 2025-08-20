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
const isKeyboardOpen = ref(false);
const keyboardOffset = ref(0);

const updateHeight = () => {
  const viewport = window.visualViewport;
  const currentHeight = viewport?.height || window.innerHeight;

  const diff = initialHeight.value - currentHeight;

  if (diff > 150) {
    // کیبورد بازه
    isKeyboardOpen.value = true;
    keyboardOffset.value = diff;
  } else {
    // کیبورد بسته است
    isKeyboardOpen.value = false;
    keyboardOffset.value = 0;
  }
};

onMounted(() => {
  initialHeight.value = window.visualViewport?.height || window.innerHeight;

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateHeight);
  } else {
    // fallback برای بعضی اندرویدها
    window.addEventListener('resize', updateHeight);
  }
});

onUnmounted(() => {
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', updateHeight);
  } else {
    window.removeEventListener('resize', updateHeight);
  }
});

const buttonStyle = computed<CSSProperties>(() => {
  const bottom = isKeyboardOpen.value
    ? `${keyboardOffset.value + 10}px`
    : `calc(24px + env(safe-area-inset-bottom, 0px))`;

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
  transition: bottom 0.25s ease;
  z-index: 999;
}
</style>
