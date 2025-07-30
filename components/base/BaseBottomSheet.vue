<template>
  <v-bottom-sheet v-model="model" :inset="false" :scrim="true" content-class="pa-0" scrollable>
    <v-card class="base-bottom-sheet">
      <div class="base-bottom-sheet__drag-handle" />
      <div class="base-bottom-sheet__content">
        <slot />
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val),
  });
</script>

<style scoped lang="scss">
  .base-bottom-sheet {
    border-radius: 33px 33px 0 0 !important;
    background-color: var(--ap-bg-default);
    overflow: hidden;
    max-height: 90vh;
    min-height: 20vh;
    display: flex;
    flex-direction: column;
    padding: 12px 26px;

    &__drag-handle {
      width: 140px;
      height: 6px;
      border-radius: 33px;
      background-color: var(--ap-text-tertiary);
      margin: 0 auto 32px auto;
    }

    &__content {
      overflow-y: auto;
      flex: 1;
    }
  }
</style>
