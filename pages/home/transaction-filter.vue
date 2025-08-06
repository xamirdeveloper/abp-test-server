<template>
  <page-header class="pt-3" title="فیلتر" :show-back="true">
    <template #prepend-back>
      <v-btn
        icon
        class="ap-border-1 ap-border-accent-primary opacity-100 ap-me-10"
        width="40"
        height="40"
        variant="text"
        @click="router.push('transactions')"
      >
        <icon-filter width="18" height="18" />
      </v-btn>
    </template>
  </page-header>
  <div class="ap-page-wrapper">
    <div class="d-flex justify-center mb-7">
      <tab-toggle v-model="selectedType" :items="tabs" />
    </div>
    <base-select
      v-model="selectedTransactionType"
      :items="transactionTypes"
      label="نوع تراکنش"
      title="لطفا نوع تراکنش را انتخاب کنید."
      class="mb-4"
    />
    <base-select
      v-model="selectedCategory"
      :items="categories"
      label="دسته بندی"
      title="لطفا دسته بندی را انتخاب کنید."
      class="mb-4"
    />
    <div class="d-flex justify-center align-end mb-4 ga-3 w-100">
      <div class="flex-grow-1 money-input">
        <MoneyInput v-model="fromAmount" placeholder="از مبلغ" label="مبلغ تراکنش" />
      </div>
      <div class="flex-grow-1 money-input">
        <MoneyInput v-model="toAmount" placeholder="از مبلغ" />
      </div>
    </div>

    <div class="d-flex justify-center align-end mb-4 ga-3 w-100">
      <div>
        <label class="d-block ap-mb-6">تاریخ تراکنش</label>
        <persian-date-picker
          v-model="fromDate"
          format="jYYYY/jMM/jDD"
          display-format="jYYYY/jMM/jDD"
          locale="fa"
          digits="fa"
          placeholder="از تاریخ"
          calendar-class="ap-calendar"
          input-class="ap-input__field w-50"
        />
      </div>
      <persian-date-picker
        v-model="toDate"
        format="jYYYY/jMM/jDD"
        display-format="jYYYY/jMM/jDD"
        locale="fa"
        digits="fa"
        placeholder="تا تاریخ"
        calendar-class="ap-calendar"
        input-class="ap-input__field w-50"
      />
    </div>
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const selectedType = ref<string>('all');
  const selectedTransactionType = ref<string>('all');
  const selectedCategory = ref<string>('all');
  const fromAmount = ref<string>('');
  const toAmount = ref<string>('');
  const fromDate = ref<string>('');
  const toDate = ref<string>('');
  const transactionTypes = ref([
    { value: 'all', label: 'همه' },
    { value: 'purchase', label: 'خرید' },
    { value: 'card_to_card', label: 'کارت به کارت' },
    { value: 'paya', label: 'پایا' },
    { value: 'sata', label: 'ساتنا' },
    { value: 'bridge', label: 'پل' },
    { value: 'check', label: 'چک' },
    { value: 'deposit_to_savings', label: 'سپرده به سپرده' },
    { value: 'other', label: 'سایر' },
  ]);
  const categories = ref([
    { value: 'all', label: 'همه' },
    { value: 'daily_purchase', label: 'خرید روزمره' },
    { value: 'installment', label: 'پرداخت قسط' },
    { value: 'investment', label: 'سرمایه‌گذاری' },
    { value: 'construction_services', label: 'خدمات ساختمانی' },
    { value: 'transportation', label: 'حمل و نقل' },
    { value: 'healthcare', label: 'بهداشت و درمان' },
    { value: 'food', label: 'خوراک' },
    { value: 'other_payments', label: 'سایر برداشت' },
  ]);
  const tabs = ref([
    { value: 'all', label: 'همه' },
    { value: 'received', label: 'دریافتی‌ها' },
    { value: 'paid', label: 'پرداختی‌ها' },
  ]);
</script>
<style scoped>
  .ap-mb-6 {
    margin-bottom: 6px;
  }

  .ap-me-10 {
    margin-inline-end: 10px;
  }

  .money-input {
    min-width: 0;
  }
</style>
