<template>
  <label class="ap-radio" :class="wrapperClasses">
    <input
      type="radio"
      :value="value"
      :checked="modelValue === value"
      :name="name"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="ap-radio__custom me-3">
      <icon-check
        v-if="modelValue === value"
        width="14"
        height="14"
        stroke="var(--ap-bg-surface)"
      />
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
  interface RadioProps {
    modelValue: string | number;
    value: string | number;
    name: string;
    disabled?: boolean;
  }

  const props = defineProps<RadioProps>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement | null;
    if (target) {
      emit('update:modelValue', props.value);
    }
  };

  const wrapperClasses = computed(() => ({
    'ap-radio--checked': props.modelValue === props.value,
    'ap-radio--disabled': props.disabled,
  }));
</script>

<style scoped lang="scss">
  @use '/assets/design-system/radio.scss' as *;
</style>
