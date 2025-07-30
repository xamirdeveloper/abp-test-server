<template>
  <page-header class="pt-3" title="حساب کاربری" :show-back="true" />
  <profile-avatar />
  <div class="ap-page-wrapper ap-mt-64">
    <base-input label="نام کاربری" type="text" class="mb-4" />
    <base-input label="آدرس ایمیل" type="text" class="mb-4" />
    <base-input label="تلفن همراه" type="number" class="mb-4" />
  </div>
  <fixed-action-btn title="ذخیره" />
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
  .ap-mt-64 {
    margin-top: 64px !important;
  }
</style>
