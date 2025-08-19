<template>
  <page-header class="pt-3" title="انتقال وجه" />
  <div class="ap-page-wrapper">
    <MoneyInput
      id="transfer-input"
      v-model="amount"
      label="مبلغ"
      class="transfer-money-input ap-mb-6"
      :maxlength="13"
    />
    <toman-price-display v-if="!!amount" :amount="amount" />
  </div>
  <fixed-action-btn title="ادامه" :disabled="!amount" class="submit-btn" />
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });

  const amount = ref();
</script>

<style scoped>
  .submit-btn {
    bottom: 93px !important;
    z-index: 999;
  }

  .ap-mb-6 {
    margin-bottom: 6px;
  }
</style>
<style>
  .transfer-money-input .ap-input__control {
    background-color: var(--ap-bg-surface);
  }

  .transfer-money-input .ap-input__control #transfer-input {
    direction: ltr;
  }
</style>
