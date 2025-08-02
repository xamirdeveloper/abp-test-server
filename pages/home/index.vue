<template>
  <page-header class="pt-3" title="خانه" :has-support="true" />
  <div class="ap-page-wrapper text-center">
    <div class="d-flex justify-center w-100 mb-5">
      <current-inventory />
    </div>
    <v-btn
      variant="text"
      min-width="120"
      class="ap-border-1 ap-border-default ap-radius-14"
      @click="isMonthSheetOpen = true"
    >
      <span class="ap-txt-label ap-text-primary me-2">
        {{ selectedLabel || 'انتخاب کنید' }}
      </span>
      <icon-chevron-down width="10" height="10" />
    </v-btn>
    <base-select
      v-model="selectedMonth"
      v-model:sheetVisible="isMonthSheetOpen"
      :items="monthes"
      :hide-input="true"
      title="ماه مورد نظر را انتخاب کنید"
    />
    <line-chart :labels="labels" :values="values" class="mb-4" />
    <div class="d-flex align-center mb-6">
      <div class="icon-wrap icon-wrap__success me-3">
        <icon-deposit stroke="#40C4AA" />
      </div>
      <div class="d-flex flex-column align-start">
        <span class="ap-txt-label ap-text-secondary">مجموع دریافتی</span>
        <div>
          <span class="ap-fw-bold ap-txt-20 ap-text-primary me-1">۲,۰۰۰,۰۰۰,۰۰۰,۰۰۰</span>
          <span class="ap-txt-caption ap-text-primary">ریال</span>
        </div>
      </div>
    </div>
    <div class="d-flex align-center mb-12">
      <div class="icon-wrap icon-wrap__error me-3">
        <icon-withdraw stroke="#E74D89" />
      </div>
      <div class="d-flex flex-column align-start">
        <span class="ap-txt-label ap-text-secondary">مجموع پرداختی</span>
        <div>
          <span class="ap-fw-bold ap-txt-20 ap-text-primary me-1">۲,۰۰۰,۰۰۰,۰۰۰,۰۰۰</span>
          <span class="ap-txt-caption ap-text-primary">ریال</span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-space-between mb-6">
      <span class="ap-txt-title-4">تراکنش های اخیر</span>
      <v-btn
        variant="text"
        color="var(--ap-btn-primary)"
        density="compact"
        class="pa-1 ps-2 d-flex align-center"
      >
        <span class="ap-txt-hint ap-me-6">نمایش همه</span>
        <icon-chevron-left width="18" height="18" stroke="var(--ap-btn-primary)" />
      </v-btn>
    </div>
    <div>
      <TransactionItem
        v-for="(item, index) in transactions"
        :key="index"
        :title="item.title"
        :subtitle="item.subtitle"
        :amount="item.amount"
        :type="item.type"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });

  const selectedLabel = computed(() => {
    return monthes.value.find((i) => i.value === selectedMonth.value)?.label || '';
  });

  const isMonthSheetOpen = ref<boolean>(false);
  const selectedMonth = ref<string>('');
  const monthes = ref([
    { value: 'farvardin', label: 'فروردین ماه' },
    { value: 'ordibehesht', label: 'اردیبهشت ماه' },
    { value: 'khordad', label: 'خرداد ماه' },
    { value: 'tir', label: 'تیر ماه' },
    { value: 'mordad', label: 'مرداد ماه' },
    { value: 'shahrivar', label: 'شهریور ماه' },
    { value: 'mehr', label: 'مهر ماه' },
    { value: 'aban', label: 'آبان ماه' },
    { value: 'azar', label: 'آذر ماه' },
    { value: 'dey', label: 'دی ماه' },
    { value: 'bahman', label: 'بهمن ماه' },
    { value: 'esfand', label: 'اسفند ماه' },
  ]);
  const labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  const values = labels.map((_, i) => {
    const base = 20000000 + Math.sin(i / 3) * 9000000;
    return Math.round(base);
  });
  const transactions = ref([
    {
      title: 'مینا نوروزی',
      subtitle: 'نیم ساعت پیش | ۱۲:۲۴',
      amount: 2000000000,
      type: 'deposit',
    },
    {
      title: 'دریافت از پایا',
      subtitle: '۲ ساعت پیش | ۱۲:۲۴',
      amount: 2338990000,
      type: 'deposit',
    },
    {
      title: 'کارمزد',
      subtitle: '۱۲ اردیبهشت ۱۴۰۲ | ۱۲:۹۰',
      amount: 209207000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
  ]);
</script>

<style scoped lang="scss">
  .ap-page-wrapper {
    overflow-y: auto;
    scroll-behavior: smooth;
    flex: 1;
  }

  .ap-radius-14 {
    border-radius: 14px;
  }

  .ap-me-6 {
    margin-inline-end: 6px;
  }

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
</style>
