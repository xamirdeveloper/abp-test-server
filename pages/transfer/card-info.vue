<template>
  <page-header
    class="pt-3 mb-9"
    title="انتقال وجه"
    subtitle="لطفا اطلاعات بانک را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <password-input v-model="otp" label="رمز دوم" :maxlength="6" class="mb-4" :has-icon="false">
      <v-btn variant="text" height="32" class="ap-btn-primary otp-btn py-2 px-3 me-12">
        <span class="ap-txt-10 ap-fw-medium ap-text-btn">دریافت رمز پویا</span>
      </v-btn>
    </password-input>
    <div class="d-flex justify-center align-end mb-4 ga-1 w-100">
      <div class="flex-grow-1 twice-input">
        <password-input v-model="cvv2" :maxlength="4" placeholder="CVV2" :has-icon="false" />
      </div>
      <div class="flex-grow-1 twice-input">
        <expiry-date-input v-model="expireDate" />
      </div>
    </div>
    <base-select
      v-model="selectedPurposes"
      label="بابت"
      placeholder="بابت"
      :items="transferPurposes"
      :clearable="true"
      class="mb-4"
    />
    <base-input v-model="description" label="شرح تراکنش (اختیاری)" placeholder="شرح" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const otp = ref();
  const cvv2 = ref();
  const expireDate = ref();
  const description = ref();
  const selectedPurposes = ref();
  const transferPurposes = ref([
    { value: 'insurance', label: 'امور بیمه خدمات' },
    { value: 'investment', label: 'امور سرمایه گذاری و بورس' },
    { value: 'health', label: 'امور درمانی' },
    { value: 'salary', label: 'واریز حقوق' },
    { value: 'currency', label: 'امور ارزی در چارچوب ضوابط و مقررات' },
    { value: 'loan', label: 'پرداخت قرض و تایید دیون قرض الحسنه، بدهی' },
    { value: 'retirement', label: 'امور بازنشستگی' },
    { value: 'assets', label: 'معاملات اموال منقول' },
  ]);
</script>

<style scoped>
  .ap-page-wrapper {
    overflow-y: auto;
    scroll-behavior: smooth;
    margin-bottom: 100px;
    flex: 1;
  }

  .twice-input {
    min-width: 0;
    width: 50%;
  }

  .otp-btn {
    min-width: 103px;
    border-radius: 10px;
  }
</style>
