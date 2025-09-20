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
  import { useOtpStore } from '@/stores/otp';
  import { setUsernamePasswordStepOne, setUsernamePasswordStepTwo } from '~/api/account-setup';

  const router = useRouter();
  const otpStore = useOtpStore();

  const otpCode = ref<string>('');
  const globalLoading = ref<boolean>(true);
  const countdownLoading = ref<boolean>(false);
  const confirming = ref<boolean>(false);

  const canConfirm = computed(
    () => otpCode.value.length === 6 && !globalLoading.value && !confirming.value
  );

  const subtitle = computed(() => {
    const mobile = localStorage.getItem('user-mobile') || '۰۹xxxxxxxx';
    return `لطفا کد پیامک شده به شماره ${mobile} را وارد کنید`;
  });

  const sendOtp = async () => {
    const storedMobile = localStorage.getItem('user-mobile') || '';
    const storedNationalId = localStorage.getItem('national_id') || '';

    try {
      globalLoading.value = true;
      countdownLoading.value = true;

      const payload = {
        national_id: storedNationalId,
        mobile: storedMobile,
      };

      const response = await setUsernamePasswordStepOne(payload);

      if ((response.status === 'success', response.data)) {
        const expireISO = response.data.expiretime;
        const expireTimestamp = new Date(expireISO).getTime();
        otpStore.setMobile(storedMobile);
        otpStore.setExpireTimeAbsolute(expireTimestamp);
      }
    } catch (err) {
      console.error(err);
    } finally {
      globalLoading.value = false;
      countdownLoading.value = false;
    }
  };

  const confirm = async () => {
    if (!canConfirm.value) return;
    confirming.value = true;

    try {
      const payload = {
        mobile: localStorage.getItem('user-mobile') || '',
        code: otpCode.value,
      };

      const res = await setUsernamePasswordStepTwo(payload);

      if (res.status === 'success') {
        otpStore.markVerified();
        router.push('/account-setup/set-username-password');
        otpStore.clear();
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
    const storedMobile = localStorage.getItem('user-mobile');

    if (!storedMobile) {
      router.replace('/set-username-password/mobile');
      return;
    }

    const previousMobile = otpStore.meta.mobile;
    const isNewRequest = previousMobile && previousMobile !== storedMobile;

    if (isNewRequest) {
      otpStore.clearExpireTime();
    }

    otpStore.setMobile(storedMobile);

    const hasValidExpire = otpStore.loadExpireTime();

    if (!hasValidExpire) {
      sendOtp();
    }

    globalLoading.value = false;
  });
</script>
