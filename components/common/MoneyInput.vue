<template>
  <base-input
    v-bind="baseInputProps"
    :model-value="displayValue"
    @update:model-value="onInput"
    class="money-input"
  >
    <template #append-icon v-if="showCurrencySign">
      <span class="ap-txt-body-1 ap-text-secondary">ریال</span>
    </template>
  </base-input>
</template>

<script setup lang="ts">
  import { useMoneyFormatter } from '@/composables/useFormatter';
  import type { BaseInputProps } from '../base/types/inputs';

  interface Props extends Omit<BaseInputProps, 'type'> {
    modelValue: string | number;
    showSeparator?: boolean;
    showCurrencySign?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showSeparator: true,
    showCurrencySign: true,
  });

  const emit = defineEmits(['update:modelValue']);
  const { formatMoney } = useMoneyFormatter();

  const rawValue = ref<string>('');

  watch(
    () => props.modelValue,
    (val) => {
      rawValue.value = String(val ?? '');
    },
    { immediate: true }
  );

  const displayValue = computed(() => {
    if (!rawValue.value) return '';
    return props.showSeparator ? formatMoney(rawValue.value) : rawValue.value;
  });

  const onInput = (val: string | number | null) => {
    let numeric = String(val).replace(/\D/g, '');

    if (props.maxlength) {
      numeric = numeric.slice(0, props.maxlength);
    }

    rawValue.value = numeric;
    emit('update:modelValue', numeric);
  };

  const baseInputProps = computed(() => ({
    ...props,
    type: 'number' as const,
  }));
</script>
