<template>
  <page-header
    class="pt-3"
    title="کد رهگیری کارت ملی"
    subtitle="لطفا کد رهگیری کارت ملی خود را وارد کنید."
    :show-back="true"
    :has-support="false"
  />
  <div class="ap-page-wrapper">
    <base-input type="text" label="کد رهگیری" class="ap-mb-73" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const date = ref();
</script>
