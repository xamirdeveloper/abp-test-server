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
    <base-input
      v-model="province"
      label="استان"
      type="number"
      class="mb-4"
      :disabled="true"
      :loading="isLoading"
    />
    <base-input
      v-model="city"
      label="شهر"
      type="number"
      class="mb-4"
      :disabled="true"
      :loading="isLoading"
    />
    <div class="mb-4">
      <label :class="['label ap-txt-label ap-text-primary d-block', cantEdit ? 'opacity-50' : '']">
        نشانی پستی
      </label>
      <textarea v-if="!isLoading" v-model="address" :disabled="cantEdit" />
      <div
        v-else
        class="w-100 ap-border-1 ap-radius-12 ap-border-default text-area-skeleton opacity-50"
      >
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
    province?: string;
    city?: string;
    address?: string;
  }

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const postalCode = ref<string>();
  const province = ref<string>('');
  const provinceCode = ref<string>('');
  const city = ref<string>('');
  const cityCode = ref<string>('');
  const address = ref<string>('');
  const isLoading = ref(false);
  const error = ref<error>({
    postalCode: '',
    province: '',
    city: '',
    address: '',
  });

  const cantEdit = computed(() => {
    return isLoading.value || postalCode.value?.length !== 10;
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
        provinceCode.value = response.data.province_code;
        cityCode.value = response.data.city_code;
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

  watch(provinceCode, () => (error.value.province = ''));
  const validateProvince = () => {
    if (!provinceCode.value) {
      error.value.province = 'لطفا مجدد کد پستی را وارد کنید تا فیلد استان به درستی پر شود.';
      return false;
    }

    error.value.province = '';
    return true;
  };

  watch(cityCode, () => (error.value.city = ''));
  const validateCity = () => {
    if (!cityCode.value) {
      error.value.city = 'لطفا مجدد کد پستی را وارد کنید تا فیلد شهر به درستی پر شود.';
      return false;
    }

    error.value.city = '';
    return true;
  };

  watch(address, () => (error.value.address = ''));
  const validateAddress = () => {
    if (!address.value) {
      error.value.address = 'وارد کردن آدرس الزامی است.';
      return false;
    }

    error.value.address = '';
    return true;
  };

  const submitForm = () => {
    const isValid =
      validatePostalCode() && validateProvince() && validateCity() && validateAddress();
    if (!isValid) return;

    userDetailsStore.updateFields({
      postal_code: postalCode.value,
      province: provinceCode.value,
      city: cityCode.value,
      address: address.value,
    });

    router.push('birth-location');
  };
</script>

<style scoped lang="scss">
  .label {
    margin-bottom: 6px;
  }

  .text-area-skeleton {
    height: 78px;
  }
</style>
