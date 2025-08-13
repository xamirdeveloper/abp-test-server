<template>
  <page-header
    class="pt-3"
    title="کد رهگیری کارت ملی"
    subtitle="لطفا کد رهگیری کارت ملی خود را وارد کنید."
    :show-back="true"
    :has-support="false"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="trackingCode"
      :error="error"
      :maxlength="12"
      type="text"
      label="کد رهگیری"
      class="ap-mb-73"
    />
  </div>
  <fixed-action-btn title="تایید" @click="submitForm" :is-loading="isLoading" />
</template>

<script lang="ts" setup>
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { setUserDetails } from '~/api/account-setup';
  import { useRouter } from 'vue-router';

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const trackingCode = ref<string>('');
  const error = ref<string>('');
  const isLoading = ref<boolean>(false);

  watch(trackingCode, () => (error.value = ''));
  const validateTrackingCode = () => {
    if (!trackingCode.value) {
      error.value = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    error.value = '';
    return true;
  };

  const submitForm = async () => {
    const isValid = validateTrackingCode();
    if (!isValid) return;

    userDetailsStore.updateFields({
      national_card_serial: trackingCode.value,
    });

    try {
      isLoading.value = true;
      const payload = userDetailsStore.getPayload();
      const response = await setUserDetails(payload);
      if (response.status == 'success' && response.data) {
        router.push('card-receipt');
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>
