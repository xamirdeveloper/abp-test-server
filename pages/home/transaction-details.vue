<template>
  <page-header class="pt-3" title="انتقال به سپرده" :show-back="true">
    <template #prepend-back>
      <v-btn
        icon
        class="ap-border-1 ap-border-accent-primary opacity-100 ap-me-10"
        width="40"
        height="40"
        variant="text"
        @click="router.push('transactions')"
      >
        <icon-share width="20" height="20" />
      </v-btn>
    </template>
  </page-header>
  <div class="ap-page-wrapper">
    <div class="d-flex flex-column align-center justify-center">
      <div :class="['icon-wrap', isDeposit ? 'icon-wrap__success' : 'icon-wrap__error']">
        <icon-deposit v-if="isDeposit" width="32" height="32" stroke="#40C4AA" />
        <icon-withdraw v-else width="32" height="32" stroke="#E74D89" />
      </div>
      <p class="ap-txt-title-4 ap-text-primary mb-1">مینا نوروزی</p>
      <span class="ap-txt-body-2 ap-text-secondary ap-line-h-22 mb-1">نیم ساعت پیش | ۱۲:۲۴</span>
      <span class="ap-txt-body-2 ap-text-secondary ap-line-h-22 mb-3">
        IR ۹۲۶۵۴۹۸۲۶۳۸۹۵۶۹۳۸۶۵۵۵۵۵۲۳
      </span>
      <div class="d-flex align-center ap-mb-14">
        <span
          :class="['ap-fw-bold ap-txt-20 me-1', isDeposit ? 'ap-text-success' : 'ap-text-error']"
        >
          ۲,۰۰۰,۰۰۰,۰۰۰
        </span>
        <span :class="['ap-txt-caption', isDeposit ? 'ap-text-success' : 'ap-text-error']">
          ریال
        </span>
      </div>
      <v-btn
        variant="text"
        min-width="120"
        height="34"
        class="ap-border-1 ap-border-default ap-radius-14 mb-8"
        @click="isCategorySheetOpen = true"
      >
        <span class="ap-txt-hint ap-text-primary me-2">
          {{ selectedLabel || 'انتخاب کنید' }}
        </span>
        <icon-chevron-down width="10" height="10" />
      </v-btn>
      <base-select
        v-model="selectedCategory"
        v-model:sheetVisible="isCategorySheetOpen"
        :items="categories"
        :hide-input="true"
        title="لطفا دسته بندی را انتخاب کنید."
      />
      <div class="d-flex align-center justify-space-between w-100 pb-2">
        <span class="ap-txt-body-2 ap-text-secondary">نمایش و محاسبه در گزارش ماهانه</span>
        <v-switch
          v-model="isCalculatePerMonth"
          color="var(--ap-btn-primary)"
          hide-details
          inset
          density="compact"
        />
      </div>
      <v-divider width="100%" />
      <div class="d-flex align-center justify-space-between w-100 pt-3">
        <span class="ap-txt-body-2 ap-text-secondary">شماره پیگیری</span>
        <span class="ap-txt-body-1 ap-text-primary">۸۷۳۵۱۲</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const selectedLabel = computed(() => {
    return categories.value.find((i) => i.value === selectedCategory.value)?.label || '';
  });

  const isDeposit = ref<boolean>(true);
  const isCalculatePerMonth = ref<boolean>(true);
  const isCategorySheetOpen = ref<boolean>(false);
  const selectedCategory = ref<string>('');
  const categories = ref([
    { value: 'daily_purchase', label: 'خرید روزمره' },
    { value: 'installment', label: 'پرداخت قسط' },
    { value: 'investment', label: 'سرمایه‌گذاری' },
    { value: 'construction_services', label: 'خدمات ساختمانی' },
    { value: 'transportation', label: 'حمل و نقل' },
    { value: 'healthcare', label: 'بهداشت و درمان' },
    { value: 'food', label: 'خوراک' },
    { value: 'other_payments', label: 'سایر برداشت' },
  ]);
</script>

<style scoped lang="scss">
  .icon-wrap {
    width: 65px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 10px;
    margin-bottom: 9px;

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
    color: #ff4f4f;
  }

  .ap-radius-14 {
    border-radius: 14px;
  }

  .ap-mb-14 {
    margin-bottom: 14px;
  }

  .ap-line-h-22 {
    line-height: 22px;
  }

  .ap-me-10 {
    margin-inline-end: 10px;
  }
</style>
