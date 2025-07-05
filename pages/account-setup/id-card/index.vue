<template>
  <page-header
    class="pt-3"
    title="کارت ملی"
    subtitle="برای ادامه فرآیند شرایط کارت ملی خود را انتخاب کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <v-card class="d-flex align-center ap-radius-12 py-5 px-3 ap-mb-6" height="59" elevation="0">
      <base-radio v-model="selected" value="1" name="myGroup">
        <span class="ap-txt-label ap-text-primary">کارت ملی هوشمند ( جدید ) دارم .</span>
      </base-radio>
    </v-card>
    <v-card class="d-flex align-center ap-radius-12 py-5 px-3 mb-5" height="59" elevation="0">
      <base-radio v-model="selected" value="2" name="myGroup">
        <span class="ap-txt-label ap-text-primary">رسید کارت ملی هوشمند دارم ( کد رهگیری ).</span>
      </base-radio>
    </v-card>
    <p class="ap-txt-body-2 ap-text-secondary">
      در صورتیکه کارت ملی شما قدیمی است و همچنان اقدامی برای تعویض آن نکرده اید قادر به افتتاح حساب
      نخواهید بود.
    </p>
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const selected = ref();
</script>

<style scoped>
  .ap-mb-6 {
    margin-bottom: 6px;
  }
</style>
