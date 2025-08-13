<template>
  <page-header
    class="pt-3"
    title="محل سکونت"
    subtitle="لطفا کد پستی خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="postalCode"
      :error="error.postalCode"
      :maxlength="10"
      :clearable="true"
      :disabled="isLoading"
      label="کد پستی ۱۰ رقمی"
      type="number"
      class="mb-4"
      @input="setPostalCodeAndGetAddressByIt"
    />
    <div class="mb-4">
      <label class="label ap-txt-label ap-text-primary d-block opacity-50">استان</label>
      <base-input v-if="!isLoading" v-model="province" :disabled="true" />
      <div v-else class="w-100 ap-border-1 ap-radius-12 ap-border-default skeleton-wrapper">
        <v-skeleton-loader class="ap-radius-8" width="119" height="24px"></v-skeleton-loader>
      </div>
    </div>
    <div class="mb-4">
      <label class="label ap-txt-label ap-text-primary d-block opacity-50">شهر</label>
      <base-input v-if="!isLoading" v-model="city" :disabled="true" />
      <div v-else class="w-100 ap-border-1 ap-radius-12 ap-border-default skeleton-wrapper">
        <v-skeleton-loader class="ap-radius-8" width="119" height="24px"></v-skeleton-loader>
      </div>
    </div>
    <div class="mb-4">
      <label class="label ap-txt-label ap-text-primary d-block opacity-50">نشانی پستی</label>
      <textarea v-if="!isLoading" v-model="address" disabled />
      <div v-else class="w-100 ap-border-1 ap-radius-12 ap-border-default text-area-skeleton">
        <v-skeleton-loader class="ap-radius-8 ma-3" width="209" height="24px"></v-skeleton-loader>
      </div>
    </div>
  </div>
  <fixed-action-btn title="تایید" @click="submitForm" :disabled="isLoading" />
</template>

<script lang="ts" setup>
  import { setPostalCode } from '~/api/account-setup';
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { useRouter } from 'vue-router';

  interface error {
    postalCode?: string;
  }

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const postalCode = ref<number>();
  const province = ref<string>('');
  const city = ref<string>('');
  const address = ref<string>('');
  const isLoading = ref(false);
  const error = ref<error>({
    postalCode: '',
  });

  const setPostalCodeAndGetAddressByIt = async () => {
    if (!postalCode.value) return;

    if (postalCode.value.toString().length < 10) return;
    try {
      isLoading.value = true;
      const params = {
        request_id: localStorage.getItem('request_id') || '',
        postal_code: postalCode.value?.toString() || '',
      };
      const response = await setPostalCode(params);
      if (response.status == 'success' && response.data) {
        address.value = response.data.address;
        province.value = response.data.province;
        city.value = response.data.city;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  watch(postalCode, (val) => {
    if (!val) {
      province.value = '';
      city.value = '';
      address.value = '';
    }
  });

  watch(postalCode, () => (error.value.postalCode = ''));
  const validatePostalCode = () => {
    const code = postalCode.value || '';
    const postalCodeRegex = /^\d{10}$/;

    if (!code) {
      error.value.postalCode = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    if (!postalCodeRegex.test(code.toString())) {
      error.value.postalCode = 'کد پستی معتبر نیست.';
      return false;
    }

    error.value.postalCode = '';
    return true;
  };

  const submitForm = () => {
    const isValid = validatePostalCode();
    if (!isValid) return;

    userDetailsStore.updateFields({
      postal_code: postalCode.value?.toString(),
      province: province.value,
      city: city.value,
      address: address.value,
    });

    router.push('birth-location');
  };
</script>

<style scoped lang="scss">
  .label {
    margin-bottom: 6px;
  }

  .skeleton-wrapper {
    height: 48px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
  }

  .text-area-skeleton {
    height: 78px;
  }
</style>
