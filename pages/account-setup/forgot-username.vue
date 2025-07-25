<template>
  <page-header
    class="pt-3"
    title="فراموشی نام کاربری"
    subtitle="لطفا اطلاعات خود را وارد کنید."
    :show-back="true"
    :has-support="true"
  />
  <div class="ap-page-wrapper">
    <base-input label="تلفن همراه" type="number" class="mb-4" />
    <base-input label="کد ملی" type="number" class="mb-4" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup></script>
