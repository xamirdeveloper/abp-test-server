<template>
  <div class="ap-input" :class="wrapperClasses">
    <label v-if="label" :for="id" class="ap-input__label ap-txt-label ap-text-primary">
      {{ label }}
    </label>

    <div class="ap-input__control">
      <span v-if="$slots['prepend-icon']" class="ap-input__icon ap-input__icon--prepend">
        <slot name="prepend-icon" />
      </span>

      <input
        :id="id"
        :inputmode="type === 'number' ? 'numeric' : undefined"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="displayValue"
        type="text"
        autocomplete="off"
        @keypress="handleKeyPress"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="handleInput"
        class="ap-input__field ap-txt-placeholder"
      />

      <span v-if="$slots['append-icon']" class="ap-input__icon ap-input__icon--append">
        <slot name="append-icon" />
      </span>
    </div>

    <p v-if="error" class="ap-input__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
  interface InputProps {
    modelValue: string | number | undefined;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'number';
    id?: string;
    disabled?: boolean;
    error?: string;
  }

  const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    label: '',
    placeholder: '',
    id: 'ap-input',
    disabled: false,
    error: '',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const isFocused = ref<boolean>(false);
  const internalValue = ref<string>(String(props.modelValue ?? ''));

  watch(
    () => props.modelValue,
    (val) => {
      internalValue.value = String(val ?? '');
    }
  );

  const convertToPersianDigits = (value: string): string =>
    value.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

  const convertToEnglishDigits = (value: string): string =>
    value
      .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    if (props.type === 'number') {
      value = convertToEnglishDigits(value).replace(/[^\d]/g, '');
    }

    internalValue.value = value;
    emit('update:modelValue', value);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (props.type === 'number') {
      const char = e.key;
      if (!/[0-9۰-۹]/.test(char)) {
        e.preventDefault();
      }
    }
  };

  const displayValue = computed(() => {
    if (props.type === 'number') {
      return convertToPersianDigits(internalValue.value);
    }
    return internalValue.value;
  });

  const wrapperClasses = computed(() => ({
    'ap-input--focused': isFocused.value,
    'ap-input--error': !!props.error,
    'ap-input--disabled': props.disabled,
  }));
</script>

<style scoped lang="scss">
  @use '@/assets/design-system/input.scss' as *;
</style>
