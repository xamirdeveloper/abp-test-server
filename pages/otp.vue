<template>
  <page-header class="pt-3" title="دریافت کد" :subtitle="subtitle" :show-back="true" />
  <div class="ap-page-wrapper">
    <v-otp-input
      v-model="otpCode"
      placeholder="-"
      variant="plain"
      dir="ltr"
      class="mb-3"
      locale="en"
    />
    <count-down class="text-center" @resend="sendOtp" @expired="onExpired" />
  </div>
  <fixed-action-btn title="تایید" @click="confirm" />
</template>

<script setup lang="ts">
  import { useOtpStore } from '@/stores/otp';
  import { sendOtp as sendOtpApi, confirmOtp as confirmOtpApi } from '@/api/account-setup';
  import { useRoute, useRouter } from 'vue-router';

  const otpStore = useOtpStore();
  const otpCode = ref('');
  const route = useRoute();
  const router = useRouter();

  const sendOtp = async () => {
    if (!otpStore.requestId) return;
    const res = await sendOtpApi(otpStore.requestId);
    otpStore.setExpireTime(res.expire_time);
  };

  const confirm = async () => {
    if (!otpStore.requestId) return;
    const res = await confirmOtpApi({
      request_id: otpStore.requestId,
      code: otpCode.value,
    });
    if (res.status === 'success') {
      otpStore.markVerified();
      router.push({ name: 'account-setup/aggrement' });
    }
  };

  const onExpired = () => {
    // فقط کنترل محلی برای غیرفعال بودن دکمه تایید و فعال شدن "ارسال مجدد"
  };

  onMounted(() => {
    otpStore.loadExpireTime();
    sendOtp();
  });

  const subtitle = computed(() => {
    const mobile = route.query.mobile?.toString() || '۰۹xxxxxxxx';
    return `لطفا کد پیامک شده به شماره ${mobile} را وارد کنید`;
  });
</script>
