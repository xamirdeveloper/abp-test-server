<template>
  <page-header
    class="pt-3"
    title="کارت ملی"
    subtitle="لطفا تصاویر جلو و پشت کارت ملی خود را بارگذاری کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-upload-file class="mb-4" :removable="true" />
    <base-upload-file />
  </div>
  <fixed-action-btn title="تایید" :disabled="true" />
</template>

<script lang="ts" setup>
  const date = ref();
</script>

<style scoped>
  .ap-page-wrapper {
    height: calc(100% - 230px);
    overflow-y: auto;
  }
</style>
