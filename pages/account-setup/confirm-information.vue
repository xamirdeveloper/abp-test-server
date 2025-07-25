<template>
  <page-header
    class="pt-3"
    title="تکمیل اطلاعات"
    subtitle="لطفا اطلاعات زیر را تکمیل کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input v-model="firstName" label="نام" type="text" class="mb-4" :disabled="true" />
    <base-input v-model="lastName" label="نام خانوادگی" type="text" class="mb-4" :disabled="true" />
    <base-input v-model="gender" label="جنسیت" type="text" class="mb-4" :disabled="true" />
    <base-input v-model="fatherName" label="نام پدر" type="text" class="mb-4" :disabled="true" />
    <base-input v-model="nationalCode" label="کد ملی" type="number" class="mb-4" :disabled="true" />
    <base-input
      v-model="idNumber"
      label="شماره شناسنامه "
      type="number"
      class="mb-4"
      :disabled="true"
    />
  </div>
  <fixed-action-btn title="تایید" :disabled="isLoading" />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { estelamSabt as estelamSabtApi } from '~/api/account-setup';

  const router = useRouter();

  const isLoading = ref<boolean>();
  const firstName = ref<string>('');
  const lastName = ref<string>('');
  const gender = ref<string>('');
  const fatherName = ref<string>('');
  const nationalCode = ref<string>('');
  const idNumber = ref<string>('');

  const estelamSabt = async () => {
    const request_id = localStorage.getItem('request_id');
    if (!request_id) return;

    try {
      isLoading.value = true;
      const response = await estelamSabtApi(request_id);
      if (response.status === 'success' && response.data) {
        firstName.value = response.data.full_name
        lastName.value = response.data.full_name
        fatherName.value = response.data.father_name
        firstName.value = response.data.full_name
      }

      console.log(response);
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
</style>
