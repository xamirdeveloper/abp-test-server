<template>
  <page-header
    class="pt-3"
    title="تکمیل اطلاعات"
    subtitle="لطفا اطلاعات زیر را تکمیل کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <div class="mb-4">
      <label class="ap-txt-label ap-text-primary d-block ap-mb-6 opacity-50">نام کامل</label>
      <base-input v-if="!isLoading" v-model="fullName" type="text" :disabled="true" />
      <div
        v-else
        class="w-100 ap-border-1 ap-radius-12 ap-border-default opacity-50 skeleton-wrapper"
      >
        <v-skeleton-loader class="ap-radius-8" width="119" height="24px" />
      </div>
    </div>
    <div class="mb-4">
      <label class="ap-txt-label ap-text-primary d-block ap-mb-6 opacity-50">جنسیت</label>
      <base-input v-if="!isLoading" v-model="gender" type="text" :disabled="true" />
      <div
        v-else
        class="w-100 ap-border-1 ap-radius-12 ap-border-default opacity-50 skeleton-wrapper"
      >
        <v-skeleton-loader class="ap-radius-8" width="119" height="24px" />
      </div>
    </div>
    <div class="mb-4">
      <label class="ap-txt-label ap-text-primary d-block ap-mb-6 opacity-50">نام پدر</label>
      <base-input v-if="!isLoading" v-model="fatherName" type="text" :disabled="true" />
      <div
        v-else
        class="w-100 ap-border-1 ap-radius-12 ap-border-default opacity-50 skeleton-wrapper"
      >
        <v-skeleton-loader class="ap-radius-8" width="119" height="24px" />
      </div>
    </div>
    <base-input v-model="nationalId" label="کد ملی" type="number" class="mb-4" :disabled="true" />
    <div>
      <label class="ap-txt-label ap-text-primary d-block ap-mb-6 opacity-50">شماره شناسنامه</label>
      <base-input v-if="!isLoading" v-model="birthCertificateNum" type="number" :disabled="true" />
      <div
        v-else
        class="w-100 ap-border-1 ap-radius-12 ap-border-default opacity-50 skeleton-wrapper"
      >
        <v-skeleton-loader class="ap-radius-8" width="119" height="24px" />
      </div>
    </div>
  </div>
  <fixed-action-btn
    title="تایید"
    :disabled="!canConfirm"
    :is-loading="isLoading"
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
  const fullName = ref<string>('');
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
        fullName.value = response.data.full_name;
        fatherName.value = response.data.father_name;
        gender.value = GENDER_LABELS[response.data.gender];
        birthCertificateNum.value =
          response.data.birth_certificate_no !== '0' ? response.data.birth_certificate_no : '___';
        canConfirm.value = true;

        userDetailsStore.updateFields({
          request_id: localStorage.getItem('request_id') || '',
          national_id: nationalId.value,
          first_name: fullName.value,
          last_name: fullName.value,
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
    height: calc(100% - 200px);
    overflow-y: auto;
  }

  .ap-mb-6 {
    margin-bottom: 6px;
  }

  .skeleton-wrapper {
    height: 48px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
  }
</style>
