<template>
  <div class="ap-otp-box text-center">
    <v-otp-input
      v-model="localCode"
      :disabled="disabled"
      placeholder="-"
      variant="plain"
      dir="ltr"
      class="mb-3 mt-1"
      locale="en"
      :length="length"
    />

    <div v-if="!disabled">
      <count-down :loading="loading" @resend="handleResend" @expired="emit('expired')" />
    </div>

    <v-progress-circular
      v-else
      indeterminate
      size="20"
      color="var(--ap-btn-primary)"
      class="d-block mx-auto"
    />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: string;
    disabled?: boolean;
    loading?: boolean;
    length?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    loading: false,
    length: 6,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'resend'): void;
    (e: 'expired'): void;
  }>();

  const localCode = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (val) => {
      if (val !== localCode.value) localCode.value = val;
    }
  );

  watch(localCode, (val) => {
    emit('update:modelValue', val);
  });

  const handleResend = () => {
    localCode.value = '';
    emit('update:modelValue', '');
    emit('resend');
  };
</script>

<style scoped lang="scss">
  .ap-otp-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
