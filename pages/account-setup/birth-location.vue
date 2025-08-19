<template>
  <page-header
    class="pt-3"
    title="محل تولد و صدور"
    subtitle="لطفا محل تولد و صدور شناسنامه خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-select
      v-model="selectedBirthLocation"
      :items="cities"
      :error="error.birth"
      :loading="isLoading"
      label="شهر محل تولد"
      class="mb-4"
    />
    <base-select
      v-model="selectedIssuanceLocation"
      :items="cities"
      :error="error.issuance"
      :loading="isLoading"
      label="شهر محل صدور"
    />
  </div>
  <fixed-action-btn title="تایید" @click="submitForm" :disabled="isLoading" />
</template>

<script lang="ts" setup>
  import { getBirthIssuanceCities as getCitiesApi } from '~/api/account-setup';
  import type { SelectItems } from '~/components/base/BaseSelect.vue';
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { useRouter } from 'vue-router';

  interface error {
    birth?: string;
    issuance?: string;
  }

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const cities = ref<SelectItems[]>([]);
  const selectedBirthLocation = ref<string>('');
  const selectedIssuanceLocation = ref<string>('');
  const isLoading = ref(false);
  const error = ref<error>({
    birth: '',
    issuance: '',
  });

  const getCities = async (pId: string) => {
    try {
      isLoading.value = true;
      const response = await getCitiesApi(pId);
      if (response.status == 'success' && response.data) {
        cities.value = response.data.map((p) => ({
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
    getCities('1');
  });
</script>
