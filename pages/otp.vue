<template>
  <page-header
    class="pt-3"
    title="دریافت کد"
    subtitle="لطفا کد پیامک شده به شماره 0912176233 را وارد کنید"
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <v-otp-input placeholder="-" variant="plain" dir="ltr" class="mb-3" />
    <count-down class="text-center" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup></script>
