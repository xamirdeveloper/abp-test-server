<template>
  <v-bottom-sheet v-model="model" :inset="false" :scrim="true" content-class="pa-0" scrollable>
    <v-card
      class="base-bottom-sheet"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
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

  let startY = 0;
  let currentY = 0;
  let dragging = false;

  const onTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].clientY;
    dragging = true;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    currentY = e.touches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!dragging) return;
    const deltaY = currentY - startY;

    if (deltaY > 100) {
      model.value = false;
    }

    startY = 0;
    currentY = 0;
    dragging = false;
  };
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
    touch-action: pan-y; 

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
