<template>
  <v-dialog v-model="model" max-width="400" :transition="transition">
    <v-card class="ap-modal" :class="cardClass">
      <v-btn
        v-if="closable"
        icon
        variant="plain"
        class="ap-modal__close-btn ap-border-1 ap-border-accent-primary opacity-100"
        width="40"
        height="40"
        @click="emit('update:modelValue', false)"
      >
        <icon-close stroke="var(--ap-text-primary)" width="22" height="22" />
      </v-btn>
      <div :class="['ap-modal__content', actionText ? 'mb-6' : 'mb-0']">
        <slot />
      </div>
      <v-btn
        v-if="actionText"
        class="ap-modal__action-btn ap-bg-opposite ap-radius-12"
        block
        height="48"
        @click="emit('action')"
      >
        <span class="ap-txt-button ap-text-btn-secondary">
          {{ actionText }}
        </span>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: boolean;
    closable?: boolean;
    actionText?: string;
    cardClass?: string;
    transition?: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'action'): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
</script>

<style scoped lang="scss">
  .ap-modal {
    position: relative;
    border-radius: 20px !important;
    padding: 24px;
    text-align: center;

    &__close-btn {
      position: absolute;
      top: 20px;
      right: 24px;
      z-index: 1;
    }
  }
</style>
