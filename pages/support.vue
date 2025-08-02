<template>
  <page-header class="pt-3" title="پشتیبانی" :show-back="true" />
  <div class="ap-page-wrapper">
    <v-expansion-panels multiple variant="accordion" class="faq">
      <p class="text-start ap-txt-title-4 w-100 pt-5 pb-8">سوالات پرتکرار</p>
      <v-expansion-panel
        v-for="(item, index) in faqs"
        :key="index"
        elevation="0"
        :class="[index == 3 ? 'ap-radius-16' : '', 'faq__item']"
      >
        <v-expansion-panel-title class="faq__title faq__text">
          {{ item.question }}
        </v-expansion-panel-title>
        <v-expansion-panel-text class="faq__caption faq__text">
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
    {
      question: 'آیا اطلاعات من امن است؟',
      answer:
        '- بله از قسمت پروفایل و تغییر شماره تلفن همراهو سپس احراز هویت میتوانید شماره تلفن همراهخود را تغییر دهید. ',
    },
  ];
</script>

<style scoped lang="scss">
  .faq {
    background-color: var(--ap-bg-surface);
    border-radius: 16px;
    padding-inline-start: 20px;
    padding-inline-end: 16px;

    &__text {
      font-family: Vazirmatn !important;
      font-size: 14px;
      font-weight: 600;
      line-height: normal;
    }

    &__title {
      padding-top: 20px;
      padding-bottom: 20px;
      padding-inline-end: 0;
      padding-inline-start: 8px !important;
      color: var(--ap-text-primary);
      border: 0;
    }

    &__caption {
      color: var(--ap-text-secondary);
      padding-inline-start: 8px !important;
      padding-inline-end: 30px !important;
      padding-bottom: 15px;
    }
  }
</style>
<style>
  .faq .v-expansion-panel-text .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }

  .faq .v-expansion-panel-title__overlay {
    opacity: 0 !important;
  }
</style>
