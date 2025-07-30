<template>
  <page-header
    class="pt-3"
    title="تغییر رمز عبور"
    subtitle="لطفا رمز عبور فعلی و جدید خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <password-input label="رمز عبور فعلی" class="mb-4" />
    <password-input label="رمز عبور جدید" class="mb-4" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup></script>
