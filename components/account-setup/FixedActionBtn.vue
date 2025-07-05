<template>
  <v-btn
    :class="[disabled ? 'ap-btn-disabled' : 'ap-btn-primary', 'fab-btn  ap-radius-12']"
    height="48"
    :disabled="disabled"
    :loading="isLoading"
    @click="$emit('click')"
  >
    <span class="ap-text-btn ap-txt-button">
      {{ title }}
    </span>
  </v-btn>
</template>

<script lang="ts" setup>
  interface Props {
    title: string;
    disabled?: boolean;
    isLoading?: boolean;
  }

  defineProps<Props>();
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
