<template>
  <page-header
    class="pt-3"
    title="رمز ورود جدید"
    subtitle="لطفا رمز ورود جدید خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <password-input v-model="newPass" label="رمز ورود جدید" class="mb-4" />
    <password-input v-model="newPassConfirm" label="تکرار رمز ورود جدید" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const newPass = ref<string>('');
  const newPassConfirm = ref<string>('');
</script>
