<template>
  <page-header
    class="pt-3"
    title="تکمیل اطلاعات"
    subtitle="لطفا اطلاعات زیر را تکمیل کنید."
    :show-back="true"
    :has-support="false"
  />
  <div class="ap-page-wrapper">
    <base-input label="کد ملی" type="number" class="mb-4" />
    <base-input label="تاریخ تولد" class="mb-4" />
    <base-input label="تلفن همراه" type="number" />
  </div>
  <fixed-action-btn title="ادامه" />
</template>

<script lang="ts" setup></script>
