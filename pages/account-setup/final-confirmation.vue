<template>
  <page-header
    class="pt-3"
    title="تایید نهایی اطلاعات"
    subtitle="لطفا در صورت صحت, اطلاعات خود را تایید کنید."
    :show-back="true"
    :has-support="true"
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
      v-model="LastName"
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
    :is-loading="isSubmitting"
    @click="setFinalize"
  />
  <success-modal
    v-model="showSuccessModal"
    title="اطلاعات شما با موفقیت ثبت شد."
    description="ما اطلاعات را بررسی میکنیم لطفا منتظر دریافت پیامک باشید."
    actionText="بازگشت به برنامه"
  />
  <fail-modal
    v-model="showFailModel"
    title="عملیات ناموفق"
    description="لطفا مجددا تلاش کنید یا با پشتیبانی تماس بگیرید."
    actionText="بازگشت به برنامه"
  />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import {
    getUserAllData as getUserAllDataApi,
    setFinalize as setFinalizeApi,
  } from '~/api/account-setup';
  import { GENDER_LABELS } from '~/api/account-setup/types';

  const router = useRouter();

  const isLoading = ref<boolean>(false);
  const isSubmitting = ref<boolean>(false);
  const firstName = ref<string>('');
  const LastName = ref<string>('');
  const gender = ref<string>('');
  const fatherName = ref<string>('');
  const nationalId = ref<string>('');
  const birthCertificateNum = ref<string>('');
  const canConfirm = ref<boolean>(false);
  const showSuccessModal = ref<boolean>(false);
  const showFailModel = ref<boolean>(false);

  const getUserAllData = async () => {
    const request_id = localStorage.getItem('request_id');
    if (!request_id) return;

    try {
      isLoading.value = true;
      nationalId.value = localStorage.getItem('national_id') || '';
      const response = await getUserAllDataApi(request_id);
      if (response.status === 'success' && response.data) {
        firstName.value = response.data.firstName;
        LastName.value = response.data.lastName;
        fatherName.value = response.data.fatherName;
        gender.value = GENDER_LABELS[response.data.gender];
        birthCertificateNum.value =
          response.data.birthCertificateNo !== '0' ? response.data.birthCertificateNo : '___';
        canConfirm.value = true;
      } else {
        canConfirm.value = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const setFinalize = async () => {
    const request_id = localStorage.getItem('request_id');
    if (!request_id) return;

    try {
      isSubmitting.value = true;
      const response = await setFinalizeApi(request_id);
      if (response.status === 'success' && response.data) {
        showSuccessModal.value = true;
      } else {
        showFailModel.value = true;
      }
    } catch (error) {
      showFailModel.value = true;
      console.log(error);
    } finally {
      isSubmitting.value = false;
    }
  };

  onBeforeMount(() => {
    getUserAllData();
  });
</script>

<style scoped>
  .ap-page-wrapper {
    height: calc(100% - 200px);
    overflow-y: auto;
  }
</style>
