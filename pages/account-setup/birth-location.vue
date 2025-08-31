<template>
  <page-header
    class="pt-3"
    title="محل تولد و صدور"
    subtitle="لطفا محل تولد و صدور شناسنامه خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-select
      v-model="selectedBirthProvince"
      :items="provinces"
      :loading="isLoading"
      :disabled="isLoading"
      label="استان محل تولد"
      class="mb-4"
    />
    <base-select
      v-model="selectedBirthLocation"
      :items="birthCities"
      :error="error.birth"
      :loading="isBirthLocationLoading"
      :disabled="!selectedBirthProvince || isBirthLocationLoading"
      label="شهر محل تولد"
      class="mb-4"
    />
    <base-select
      v-model="selectedIssuanceProvince"
      :items="provinces"
      :loading="isLoading"
      :disabled="isLoading"
      label="استان محل صدور"
      class="mb-4"
    />
    <base-select
      v-model="selectedIssuanceLocation"
      :items="issuanceCities"
      :error="error.issuance"
      :loading="isIssuanceLocationLoading"
      :disabled="!selectedIssuanceProvince || isIssuanceLocationLoading"
      label="شهر محل صدور"
    />
  </div>
  <fixed-action-btn title="تایید" @click="submitForm" :disabled="isLoading" />
</template>

<script lang="ts" setup>
  import {
    getBirthIssuanceCities as getCitiesApi,
    getProvinces as getProvincesApi,
  } from '~/api/account-setup';
  import type { SelectItems } from '~/components/base/BaseSelect.vue';
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { useRouter } from 'vue-router';

  interface error {
    birth?: string;
    issuance?: string;
  }

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const birthCities = ref<SelectItems[]>([]);
  const issuanceCities = ref<SelectItems[]>([]);
  const provinces = ref<SelectItems[]>([]);
  const selectedBirthProvince = ref<string>('');
  const selectedBirthLocation = ref<string>('');
  const selectedIssuanceProvince = ref<string>('');
  const selectedIssuanceLocation = ref<string>('');
  const isLoading = ref(false);
  const isIssuanceLocationLoading = ref(false);
  const isBirthLocationLoading = ref(false);
  const error = ref<error>({
    birth: '',
    issuance: '',
  });

  const getProvinces = async () => {
    try {
      isLoading.value = true;
      const response = await getProvincesApi();
      if (response.status == 'success' && response.data) {
        provinces.value = response.data.map((p) => ({
          value: p.code,
          label: p.name,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const getCities = async (pId: string, cityType: number) => {
    try {
      cityType == 1
        ? (isBirthLocationLoading.value = true)
        : (isIssuanceLocationLoading.value = true);
      const response = await getCitiesApi({ pId: pId });
      if (response.status == 'success' && response.data) {
        if (cityType == 1) {
          birthCities.value = response.data.map((p) => ({
            value: p.code,
            label: p.name,
          }));
        } else {
          issuanceCities.value = response.data.map((p) => ({
            value: p.code,
            label: p.name,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isBirthLocationLoading.value = false;
      isIssuanceLocationLoading.value = false;
    }
  };

  watch(selectedBirthProvince, () => {
    getCities(selectedBirthProvince.value, 1);
    selectedBirthLocation.value = '';
  });
  watch(selectedIssuanceProvince, () => {
    getCities(selectedIssuanceProvince.value, 2);
    selectedIssuanceLocation.value = '';
  });

  watch(selectedBirthLocation, () => (error.value.birth = ''));
  const validateBirthLocation = () => {
    if (!selectedBirthLocation.value) {
      error.value.birth = 'انتخاب کردن شهر محل تولد الزامی است.';
      return false;
    }

    error.value.birth = '';
    return true;
  };

  watch(selectedIssuanceLocation, () => (error.value.issuance = ''));
  const validateIssuanceLocation = () => {
    if (!selectedIssuanceLocation.value) {
      error.value.issuance = 'انتخاب کردن شهر محل صدور شناسنامه الزامی است.';
      return false;
    }

    error.value.issuance = '';
    return true;
  };

  const validateForm = () => {
    const isValid = validateBirthLocation() && validateIssuanceLocation();

    return isValid;
  };

  const submitForm = () => {
    const isValid = validateForm();
    if (!isValid) return;

    userDetailsStore.updateFields({
      birth_location: selectedBirthLocation.value,
      issuance_location: selectedIssuanceLocation.value,
    });

    router.push('id-card/');
  };

  onMounted(() => {
    getProvinces();
  });
</script>
