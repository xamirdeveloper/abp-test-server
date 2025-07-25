<template>
  <v-btn
    :class="[disabled ? 'ap-btn-disabled' : color, 'fab-btn ap-radius-12']"
    height="48"
    :disabled="disabled"
    :loading="isLoading"
    @click="$emit('click')"
  >
    <span :class="['ap-txt-button', textColor]">
      {{ title }}
    </span>
  </v-btn>
</template>

<script lang="ts" setup>
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
  defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<style scoped lang="scss">
  .fab-btn {
    position: fixed;
    width: calc(100% - 40px);
    bottom: calc(24px + env(safe-area-inset-bottom));
    left: 20px;
    right: 20px;
  }
</style>
