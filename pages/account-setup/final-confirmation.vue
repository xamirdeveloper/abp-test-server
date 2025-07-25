<template>
  <page-header
    class="pt-3"
    title="تایید نهایی اطلاعات"
    subtitle="لطفا در صورت صحت, اطلاعات خود را تایید کنید."
    :show-back="true"
    :has-support="true"
  />
  <div class="ap-page-wrapper">
    <base-input label="نام" type="text" class="mb-4" :disabled="true" />
    <base-input label="نام خانوادگی" type="text" class="mb-4" :disabled="true" />
    <base-input label="جنسیت" type="text" class="mb-4" :disabled="true" />
    <base-input label="نام پدر" type="text" class="mb-4" :disabled="true" />
    <base-input label="کد ملی" type="number" class="mb-4" :disabled="true" />
    <base-input label="شماره شناسنامه " type="number" class="mb-4" :disabled="true" />
  </div>
  <fixed-action-btn title="تایید" @click="showSuccess = true" />
  <success-modal
    v-model="showSuccess"
    title="اطلاعات شما با موفقیت ثبت شد."
    description="ما اطلاعات را بررسی میکنیم لطفا منتظر دریافت پیامک باشید."
    actionText="بازگشت به برنامه"
  />
  <!-- <fail-modal
    v-model="showSuccess"
    title="عملیات ناموفق"
    description="لطفا مجددا تلاش کنید یا با پشتیبانی تماس بگیرید."
    actionText="بازگشت به برنامه"
  /> -->
</template>

<script lang="ts" setup>
  const showSuccess = ref<boolean>(true);
</script>

<style scoped>
  .ap-page-wrapper {
    height: calc(100% - 200px);
    overflow-y: auto;
  }
</style>
