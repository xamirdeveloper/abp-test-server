<template>
  <div class="ap-input" :class="wrapperClasses">
    <label v-if="label" class="ap-input__label ap-txt-label ap-text-primary">
      {{ label }}
    </label>

    <div class="ap-input__control">
      <input
        ref="monthRef"
        v-model="month"
        type="password"
        maxlength="2"
        placeholder="ماه"
        class="ap-input__field expiry-field"
        @input="onMonthInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <span class="separator">/</span>

      <input
        ref="yearRef"
        v-model="year"
        type="password"
        maxlength="2"
        placeholder="سال"
        class="ap-input__field expiry-field"
        @input="onYearInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>

    <p :class="['ap-input__error', { 'ap-input__error--visible': !!error }]">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: { month: string; year: string };
    label?: string;
    error?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({ month: '', year: '' }),
    label: '',
    error: '',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: { month: string; year: string }): void;
  }>();

  const isFocused = ref(false);
  const month = ref(props.modelValue.month);
  const year = ref(props.modelValue.year);

  const monthRef = ref<HTMLInputElement | null>(null);
  const yearRef = ref<HTMLInputElement | null>(null);

  const wrapperClasses = computed(() => ({
    'ap-input--focused': isFocused.value,
    'ap-input--error': !!props.error,
  }));

  const onMonthInput = () => {
    month.value = month.value.replace(/[^0-9]/g, '');
    if (+month.value > 12) month.value = '12';
    emit('update:modelValue', { month: month.value, year: year.value });
  };

  const onYearInput = () => {
    year.value = year.value.replace(/[^0-9]/g, '');
    emit('update:modelValue', { month: month.value, year: year.value });
  };

  watch(month, (val) => {
    if (val.length === 2) {
      nextTick(() => yearRef.value?.focus());
    }
  });

  watch(year, (val, oldVal) => {
    if (oldVal.length > 0 && val.length === 0) {
      nextTick(() => monthRef.value?.focus());
    }
  });
</script>

<style scoped lang="scss">
  .expiry-field {
    text-align: center;
    font-size: 16px;
  }

  .separator {
    font-size: 16px;
    margin: 0 4px;
    color: black;
    pointer-events: none;
  }
</style>
