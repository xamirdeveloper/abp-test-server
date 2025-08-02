<template>
  <page-header
    class="pt-3"
    title="تنظیمات ورود به برنامه"
    subtitle="لطفا نام کاربری و رمز ورود خود را انتخاب کنید."
    :show-back="false"
    :has-support="true"
  />
  <div class="ap-page-wrapper">
    <password-input label="نام کاربری" :has-icon="false" class="mb-4" />
    <password-input label="رمز ورود" class="mb-4" />
    <password-input label="تکرار رمز ورود" class="mb-6" />
    <v-btn
      class="ap-radius-12 ap-btn-primary w-100 mb-3"
      height="48"
      @click="showSuccessModal = true"
    >
      <span class="ap-txt-button ap-text-btn">تایید</span>
    </v-btn>
  </div>
  <app-version />
  <success-modal v-model="showSuccessModal" :closable="true" title="اطلاعات شما ثبت شد." description="" />
</template>

<script lang="ts" setup>
  const showSuccessModal = ref<boolean>(false);
</script>
