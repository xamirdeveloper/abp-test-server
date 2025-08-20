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
    <span :class="['ap-txt-button', textColor]">{{ title }}</span>
    <slot name="append" />
  </v-btn>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";

interface Props {
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "ap-btn-primary",
  textColor: "ap-text-btn",
});

defineEmits<{ (e: "click"): void }>();

const initialHeight = ref(0);
const isKeyboardOpen = ref(false);
const keyboardHeight = ref(0);

const updateHeight = () => {
  const viewport = window.visualViewport;
  if (!viewport) return;

  const diff = initialHeight.value - viewport.height;

  if (diff > 150) {
    isKeyboardOpen.value = true;
    keyboardHeight.value = diff;
  } else {
    isKeyboardOpen.value = false;
    keyboardHeight.value = 0;
  }
};

onMounted(() => {
  initialHeight.value = window.visualViewport?.height || window.innerHeight;
  window.visualViewport?.addEventListener("resize", updateHeight);
});

onUnmounted(() => {
  window.visualViewport?.removeEventListener("resize", updateHeight);
});

const buttonStyle = computed<CSSProperties>(() => ({
  position: isKeyboardOpen.value ? "absolute" : "fixed",
  bottom: isKeyboardOpen.value
    ? `${keyboardHeight.value + 10}px`
    : `calc(24px + env(safe-area-inset-bottom))`,
  left: "20px",
  right: "20px",
  transition: "all 0.3s ease",
}));
</script>

<style scoped lang="scss">
.fab-btn {
  width: calc(100% - 40px);
  z-index: 999;
  border-radius: 12px;
}
</style>
