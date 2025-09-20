<template>
  <page-header
    class="pt-3"
    title="تنظیمات ورود به برنامه"
    subtitle="لطفا اطلاعات خود را وارد کنید."
    :show-back="true"
    :has-support="true"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="mobile"
      label="تلفن همراه"
      type="number"
      :error="error.mobile"
      :maxlength="11"
      class="mb-4"
    />
    <base-input
      v-model="nationalId"
      label="کد ملی"
      type="number"
      :error="error.nationalId"
      :maxlength="10"
    />
  </div>
  <fixed-action-btn title="تایید" :is-loading="isLoading" @click="submitForm" />
</template>

<script lang="ts" setup>
  import { isValidIranianMobile, isValidIranianNationalId } from '@/utils/validators';
  import { setUsernamePasswordStepOne } from '~/api/account-setup';
  import { useOtpStore } from '@/stores/otp';

  interface error {
    nationalId?: string;
    mobile?: string;
  }

  const otpStore = useOtpStore();
  const router = useRouter();

  const nationalId = ref<string>('');
  const mobile = ref<string>('');
  const error = ref<error>({
    nationalId: '',
    mobile: '',
  });
  const isLoading = ref(false);

  const validateForm = () => {
    const isValid = validateMobile() && validateNationalId();
    return isValid;
  };

  watch(nationalId, () => (error.value.nationalId = ''));
  const validateNationalId = () => {
    if (!nationalId.value) {
      error.value.nationalId = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    const isValid = isValidIranianNationalId(nationalId.value);

    if (!isValid) {
      error.value.nationalId = 'کد ملی وارد شده نامعتبر است.';
    }

    return isValid;
  };

  watch(mobile, () => (error.value.mobile = ''));
  const validateMobile = () => {
    if (!mobile.value) {
      error.value.mobile = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    const isValid = isValidIranianMobile(mobile.value);

    if (!isValid) {
      error.value.mobile = 'شماره موبایل وارد شده صحیح نمی‌باشد.';
    }

    return isValid;
  };

  const hasValidExpire = () => {
    const previousMobile = otpStore.meta.mobile;
    const isNewRequest = previousMobile && previousMobile !== mobile.value;

    if (isNewRequest) {
      otpStore.clearExpireTime();
    }

    otpStore.setMobile(mobile.value);
    const hasValidExpire = otpStore.loadExpireTime();

    return hasValidExpire;
  };

  const submitForm = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    const isExpireValid = hasValidExpire();
    if (!isExpireValid) {
      try {
        isLoading.value = true;

        const payload = {
          national_id: nationalId.value,
          mobile: mobile.value,
        };

        const response = await setUsernamePasswordStepOne(payload);

        if ((response.status === 'success', response.data)) {
          localStorage.setItem('national_id', nationalId.value);
          localStorage.setItem('user-mobile', mobile.value);
          const expireISO = response.data.expiretime;
          const expireTimestamp = new Date(expireISO).getTime();
          otpStore.setMobile(mobile.value);
          otpStore.setExpireTimeAbsolute(expireTimestamp);
          router.push('/account-setup/set-username-password/otp');
        }
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    } else {
      router.push('/account-setup/set-username-password/otp');
    }
  };
</script>
