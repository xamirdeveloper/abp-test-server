<template>
  <div class="transaction-item d-flex justify-space-between align-center mb-6">
    <div class="d-flex">
      <div :class="['icon-wrap me-2', isDeposit ? 'icon-wrap__success' : 'icon-wrap__error']">
        <icon-deposit v-if="isDeposit" stroke="#40C4AA" />
        <icon-withdraw v-else stroke="#E74D89" />
      </div>
      <div class="d-flex flex-column align-start">
        <span class="ap-txt-title-5 ap-text-primary mb-2">{{ title }}</span>
        <span class="ap-txt-caption ap-text-secondary">{{ subtitle }}</span>
      </div>
    </div>
    <div>
      <span :class="['ap-fw-bold ap-txt-20 me-1', isDeposit ? 'ap-text-success' : 'ap-text-error']">
        {{ formattedAmount }}
      </span>
      <span :class="['ap-txt-caption', isDeposit ? 'ap-text-success' : 'ap-text-error']">ریال</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title: string;
    subtitle: string;
    amount: number;
    type: 'deposit' | 'withdraw';
  }

  const props = defineProps<Props>();

  const isDeposit = computed(() => props.type === 'deposit');

  const formattedAmount = computed(() => props.amount.toLocaleString('fa-IR'));
</script>

<style scoped lang="scss">
  .icon-wrap {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &__success {
      background: rgba(64, 196, 170, 0.1);
    }

    &__error {
      background: rgba(231, 77, 137, 0.08);
    }
  }

  .ap-text-success {
    color: #40c4aa;
  }

  .ap-text-error {
    color: #FF4F4F;
  }
</style>
