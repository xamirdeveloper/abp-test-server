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

const viewportHeight = ref(window.visualViewport?.height || window.innerHeight);
const offsetBottom = ref(24);

const updatePosition = () => {
  const viewport = window.visualViewport;
  if (!viewport) return;

  viewportHeight.value = viewport.height;

  // وقتی کیبورد باز شد اختلاف محاسبه میشه
  const diff = (window.innerHeight - viewport.height);

  offsetBottom.value = diff > 150 ? diff + 10 : 24;
};

onMounted(() => {
  window.visualViewport?.addEventListener('resize', updatePosition);
});

onUnmounted(() => {
  window.visualViewport?.removeEventListener('resize', updatePosition);
});

const buttonStyle = computed<CSSProperties>(() => ({
  bottom: `calc(${offsetBottom.value}px + env(safe-area-inset-bottom))`,
  position: 'fixed',
}));
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
