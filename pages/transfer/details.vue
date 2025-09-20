<template>
  <page-header
    class="pt-3"
    title="انتقال وجه"
    subtitle="لطفا اطلاعات زیر را تایید کنید"
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <v-card
      variant="text"
      class="ap-bg-surface ap-radius-20 pa-5 d-flex flex-column align-center mb-3"
    >
      <div class="ap-btn-primary ap-radius-full icon-wrapper mb-2">
        <icon-withdraw width="24" height="24" stroke="var(--ap-text-btn)" />
      </div>
      <div class="d-flex align-center mb-6">
        <span class="ap-txt-title-1 ap-text-primary me-2">۲۵,۲۳۹,۳۲۰</span>
        <span class="ap-txt-body-1 ap-text-secondary">ریال</span>
      </div>
      <div class="w-100 d-flex justify-start align-center py-1 mb-3">
        <span class="ap-txt-16 ap-fw-extrabold ap-text-secondary ap-me-6">مقصد</span>
        <span class="ap-txt-caption ap-text-secondary">(کارت بانک سامان)</span>
      </div>
      <div class="w-100 d-flex justify-space-between align-center py-1 mb-3">
        <span class="ap-txt-body-2 ap-text-secondary ap-me-6">به نام</span>
        <span class="ap-txt-title-4 ap-text-primary">مینا نوروزی</span>
      </div>
      <div class="w-100 d-flex justify-space-between align-center py-1 mb-3">
        <span class="ap-txt-body-2 ap-text-secondary ap-me-6">بانک</span>
        <div class="d-flex align-center">
          <span class="ap-txt-body-1 ap-text-primary me-2">ایران زمین</span>
          <img src="@/assets/images/Saman.svg" alt="bank logo" width="26" height="26" />
        </div>
      </div>
      <div class="w-100 d-flex justify-space-between align-center py-1 mb-3">
        <span class="ap-txt-body-2 ap-text-secondary ap-me-6">شماره شبا</span>
        <span class="ap-txt-body-1 ap-text-primary">IR ۸۱۲۶۳۸۷۱۶۲۸۷۳۵۱۲</span>
      </div>
      <div class="w-100 d-flex justify-space-between align-center">
        <span class="ap-txt-body-2 ap-text-secondary ap-me-6">افزودن به لیست پر مراجعه</span>
        <v-switch
          v-model="addToList"
          color="var(--ap-btn-primary)"
          hide-details
          inset
          density="compact"
        />
      </div>
    </v-card>
    <v-card variant="text" class="ap-bg-surface ap-radius-20 pa-5 d-flex flex-column align-center">
      <p class="text-start w-100 ap-txt-body-2 ap-text-primary ap-mb-6">شیوه انتقال</p>
      <v-btn
        variant="text"
        height="86"
        class="d-block w-100 ap-bg-default ap-radius-12 transfer-method-btn"
        @click="isTransferMethodSheetOpen = true"
      >
        <div class="w-100 d-flex align-center justify-space-between">
          <div class="d-flex flex-column align-start">
            <div class="d-flex align-center mb-3">
              <span class="ap-txt-title-5 ap-text-primary me-3">
                {{ selectedItemObject?.label }}
              </span>
              <span class="ap-txt-caption ap-text-primary">{{ selectedItemObject?.caption }}</span>
            </div>
            <p class="ap-txt-caption ap-text-tertiary">{{ selectedItemObject?.subtitle }}</p>
          </div>
          <icon-chevron-down width="17" height="14" stroke="var(--ap-text-secondary)" />
        </div>
      </v-btn>
    </v-card>
  </div>
  <fixed-action-btn title="تایید" />
  <base-select
    v-model="selectedTransferMethod"
    v-model:sheetVisible="isTransferMethodSheetOpen"
    :items="transferMethods"
    :hide-input="true"
    title="لطفا شیوه انتقال را انتخاب کنید."
  />
</template>

<script lang="ts" setup>
  import type { SelectItems } from '~/components/base/BaseSelect.vue';

  const isTransferMethodSheetOpen = ref<boolean>(false);
  const selectedTransferMethod = ref<string | null>('internal');
  const addToList = ref<boolean>(true);
  const transferMethods = ref<SelectItems[]>([
    { value: 'internal', label: 'داخلی', caption: 'بدون کارمزد', subtitle: 'انتقال در لحظه' },
    {
      value: 'card_to_card',
      label: 'کارت به کارت',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
    },
    {
      value: 'paya_instant',
      label: 'بین بانکی آنی (پل)',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
    },
    {
      value: 'paya',
      label: 'بین بانکی (پایا)',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
      disabled: true,
    },
    {
      value: 'satna',
      label: 'بین بانکی (ساتنا)',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
      disabled: true,
    },
  ]);

  const selectedItemObject = computed<SelectItems | null>(() => {
    if (!selectedTransferMethod.value) return null;
    return transferMethods.value.find((i) => i.value === selectedTransferMethod.value) || null;
  });
</script>

<style scoped>
  .ap-page-wrapper {
    margin-bottom: 96px;
  }

  .icon-wrapper {
    display: flex;
    width: 60px;
    height: 60px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
  }

  .ap-me-6 {
    margin-inline-end: 6px;
  }

  .ap-mb-6 {
    margin-bottom: 6px;
  }

  .transfer-method-btn {
    padding: 12px 14px;
    border: 1px solid var(--ap-text-tertiary);
  }
</style>
