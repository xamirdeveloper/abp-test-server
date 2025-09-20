<template>
  <page-header class="pt-3" title="دریافت کد" :subtitle="subtitle" :show-back="true" />
  <div class="ap-page-wrapper text-center">
    <base-otp-box
      v-model="otpCode"
      :disabled="globalLoading"
      :loading="countdownLoading"
      :length="6"
      @resend="sendOtp"
      @expired="handleExpired"
    />
  </div>
  <fixed-action-btn
    title="تایید"
    :disabled="!canConfirm"
    :is-loading="confirming"
    @click="confirm"
  />
</template>

<script setup lang="ts">
  import { sendOtp as sendOtpApi, confirmOtp as confirmOtpApi } from '@/api/account-setup';
  import { useOtpStore } from '@/stores/otp';

  const router = useRouter();
  const otpStore = useOtpStore();

  const otpCode = ref('');
  const globalLoading = ref(true);
  const countdownLoading = ref(false);
  const confirming = ref(false);

  const canConfirm = computed(
    () => otpCode.value.length === 6 && !globalLoading.value && !confirming.value
  );

  const subtitle = computed(() => {
    const mobile = localStorage.getItem('user-mobile') || '۰۹xxxxxxxx';
    return `لطفا کد پیامک شده به شماره ${mobile} را وارد کنید`;
  });

  const sendOtp = async () => {
    const requestId = localStorage.getItem('request_id');
    if (!requestId) return;
    globalLoading.value = true;
    countdownLoading.value = true;

    try {
      const res = await sendOtpApi(requestId);
      if (res.status === 'success') {
        const expireISO = res.data.expiretime;
        const expireTimestamp = new Date(expireISO).getTime();
        otpStore.setRequestId(requestId);
        otpStore.setExpireTimeAbsolute(expireTimestamp);
      } else {
        throw new Error(res.message || 'خطا در ارسال کد');
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      globalLoading.value = false;
      countdownLoading.value = false;
    }
  };

  const confirm = async () => {
    if (!canConfirm.value) return;
    confirming.value = true;
    try {
      const requestId = localStorage.getItem('request_id');
      if (!requestId) throw new Error('شناسه درخواست یافت نشد');

      const res = await confirmOtpApi({
        request_id: requestId,
        code: otpCode.value,
      });

      if (res.status === 'success') {
        otpStore.markVerified();
        otpStore.clear();
        router.push('account-setup/aggrement');
      } else {
        throw new Error(res.message || 'کد وارد شده نادرست است');
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      confirming.value = false;
    }
  };

  const handleExpired = () => {
    otpStore.clearExpireTime();
  };

  onMounted(() => {
    const storedRequestId = localStorage.getItem('request_id');

    if (!storedRequestId) {
      router.replace({ name: 'account-setup/' });
      return;
    }

    const previousRequestId = otpStore.requestId;
    const isNewRequest = previousRequestId && previousRequestId !== storedRequestId;

    if (isNewRequest) {
      otpStore.clearExpireTime();
    }

    otpStore.setRequestId(storedRequestId);

    const hasValidExpire = otpStore.loadExpireTime();

    if (!hasValidExpire) {
      sendOtp();
    }

    globalLoading.value = false;
  });
</script>
