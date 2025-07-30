<template>
  <page-header class="pt-3" title="دعوت از دوستان" :show-back="true" :has-support="true" />
  <div class="ap-page-wrapper d-flex flex-column align-center">
    <img src="/images/referral-gift.png" width="276" height="276" class="mb-3" />
    <p class="ap-txt-title-2 ap-text-primary mb-3">دعوت از دوستان</p>
    <p class="ap-txt-subtitle ap-text-primary text-center px-3 mb-8">
      با استفاد از کد زیر می توانید برای ثبت نام اپلیکیشن علی بابا پیز با شرایط ویژه از دوستان خود
      دعوت کنید.
    </p>
    <div class="d-flex justify-center align-center w-100">
      <span
        class="ap-bg-surface ap-txt-title-2 ap-border-1 ap-border-default ap-radius-12 v-col-8 px-3 py-2 me-3"
      >
        6 7 9 8 9 0 j 0 i 8
      </span>
      <v-btn variant="text" icon width="33" height="33" @click="copyToClipboard('679890j0i8')">
        <icon-copy width="24" height="24" />
      </v-btn>
    </div>
  </div>
  <fixed-action-btn title="اشتراک گذاری" @click="shareReferral">
    <template #prepend>
      <icon-send width="24" height="24" stroke="var(--ap-text-btn)" class="me-1" />
    </template>
  </fixed-action-btn>
</template>

<script setup lang="ts">
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      toast.success('با موفقیت انجام شد');
    } catch (error) {
      toast.error('خطایی رخ داد');
    }
  };

  const shareReferral = async () => {
    const shareData = {
      title: 'دعوت به علی‌بابا پیز',
      text: 'با این کد بیا ثبت‌نام کن تو علی‌بابا پیز و هدیه بگیر!',
      url: 'https://alibaba.app/invite?code=679890j0i8',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard(shareData.url);
        toast.success('مرورگر شما از اشتراک‌گذاری پشتیبانی نمی‌کند. لینک کپی شد ');
      }
    } catch (err) {
      toast.error('خطایی رخ داد');
    }
  };
</script>
