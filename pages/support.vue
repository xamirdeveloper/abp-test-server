<template>
  <page-header class="pt-3" title="پشتیبانی" :show-back="true" />
  <div class="ap-page-wrapper">
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, index) in faqs" :key="index">
        <v-expansion-panel-title class="text-body-1 font-weight-medium">
          {{ item.question }}
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-body-2 text-grey-darken-1">
          {{ item.answer }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

  <fixed-action-btn title="تماس با پشتیبانی" />
</template>

<script lang="ts" setup>
  const faqs = [
    {
      question: 'چطور می‌توانم حساب کاربری بسازم؟',
      answer: 'برای ساخت حساب کاربری، شماره موبایل خود را وارد کرده و کد تایید را وارد کنید.',
    },
    {
      question: 'آیا اطلاعات من امن است؟',
      answer: 'بله، تمام اطلاعات شما به صورت رمزنگاری‌شده نگهداری می‌شوند.',
    },
    // می‌تونی بیشتر اضافه کنی
  ];
</script>

<style></style>
