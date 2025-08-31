<template>
  <page-header
    class="pt-3"
    title="تکمیل اطلاعات"
    subtitle="لطفا اطلاعات زیر را تکمیل کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="firstName"
      label="نام"
      type="text"
      class="mb-4"
      :disabled="canConfirm"
      :loading="isLoading"
    />
    <base-input
      v-model="lastName"
      label="نام خانوادگی"
      type="text"
      class="mb-4"
      :disabled="canConfirm"
      :loading="isLoading"
    />
    <base-input
      v-model="gender"
      label="جنسیت"
      type="text"
      class="mb-4"
      :disabled="canConfirm"
      :loading="isLoading"
    />
    <base-input
      v-model="fatherName"
      label="نام پدر"
      type="text"
      class="mb-4"
      :disabled="canConfirm"
      :loading="isLoading"
    />
    <base-input
      v-model="nationalId"
      label="کد ملی"
      type="number"
      class="mb-4"
      :disabled="canConfirm"
      :loading="isLoading"
    />
    <base-input
      v-model="birthCertificateNum"
      label="شماره شناسنامه"
      type="number"
      class="mb-4"
      :disabled="canConfirm"
      :loading="isLoading"
    />
  </div>
  <fixed-action-btn
    title="تایید"
    :disabled="!canConfirm"
    @click="router.push('/account-setup/address')"
  />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { estelamSabt as estelamSabtApi } from '~/api/account-setup';
  import { GENDER_LABELS } from '~/api/account-setup/types';
  import { useUserDetailsStore } from '@/stores/userDetails';

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const isLoading = ref<boolean>(false);
  const firstName = ref<string>('');
  const lastName = ref<string>('');
  const gender = ref<string>('');
  const fatherName = ref<string>('');
  const nationalId = ref<string>('');
  const birthCertificateNum = ref<string>('');
  const canConfirm = ref<boolean>(false);

  const estelamSabt = async () => {
    const request_id = localStorage.getItem('request_id');
    if (!request_id) return;

    try {
      isLoading.value = true;
      nationalId.value = localStorage.getItem('national_id') || '';
      const response = await estelamSabtApi(request_id);
      if (response.status === 'success' && response.data) {
        firstName.value = response.data.first_name;
        lastName.value = response.data.last_name;
        fatherName.value = response.data.father_name;
        gender.value = GENDER_LABELS[response.data.gender];
        birthCertificateNum.value =
          response.data.birth_certificate_no !== '0' ? response.data.birth_certificate_no : '___';
        canConfirm.value = true;

        userDetailsStore.updateFields({
          request_id: localStorage.getItem('request_id') || '',
          national_id: nationalId.value,
          first_name: firstName.value,
          last_name: lastName.value,
          gender: gender.value,
          father_name: fatherName.value,
          birth_certificate_number: response.data.birth_certificate_no,
        });
      } else {
        canConfirm.value = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  onBeforeMount(() => {
    estelamSabt();
  });
</script>

<style scoped>
  .ap-page-wrapper {
    overflow-y: auto;
    scroll-behavior: smooth;
    margin-bottom: 100px;
    flex: 1;
  }

  .ap-mb-6 {
    margin-bottom: 6px;
  }
</style>
