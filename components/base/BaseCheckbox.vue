<template>
  <label class="ap-checkbox" :class="wrapperClasses">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      @change="onChange"
    />
    <span class="ap-checkbox__custom me-3">
      <icon-check v-if="modelValue" width="14" height="14" stroke="var(--ap-bg-surface)" />
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
  interface CheckboxProps {
    modelValue: boolean;
    disabled?: boolean;
    name?: string;
  }

  const props = defineProps<CheckboxProps>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement | null;
    if (target) {
      emit('update:modelValue', target.checked);
    }
  };

  const wrapperClasses = computed(() => ({
    'ap-checkbox--checked': props.modelValue,
    'ap-checkbox--disabled': props.disabled,
  }));
</script>

<style scoped lang="scss"></style>
