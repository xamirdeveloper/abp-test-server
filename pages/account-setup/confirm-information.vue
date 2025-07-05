<template>
  <page-header
    class="pt-3"
    title="تکمیل اطلاعات"
    subtitle="لطفا اطلاعات زیر را تکمیل کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input label="نام" type="text" class="mb-4" :disabled="true" model-value="امیرعلی" />
    <base-input label="نام خانوادگی" type="text" class="mb-4" :disabled="true" />
    <base-input label="جنسیت" type="text" class="mb-4" :disabled="true" />
    <base-input label="نام پدر" type="text" class="mb-4" :disabled="true" />
    <base-input label="کد ملی" type="number" class="mb-4" :disabled="true" />
    <base-input label="شماره شناسنامه " type="number" class="mb-4" :disabled="true" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup></script>

<style scoped>
  .ap-page-wrapper {
    height: calc(100% - 200px);
    overflow-y: auto;
  }
</style>
