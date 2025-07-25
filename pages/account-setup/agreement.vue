<template>
  <page-header
    class="pt-3"
    title="توافق نامه"
    subtitle="لطفا متن توافق نامه را مطالعه کرده و امضا کنید."
    :show-back="true"
    :has-support="false"
  />
  <div class="ap-page-wrapper">
    <p v-if="!isLoading" class="ap-txt-body-2 ap-text-primary agreement">
      {{ contractText }}
    </p>
    <v-progress-circular
      v-else
      color="var(--ap-text-secondary)"
      class="load-spinner"
      model-value="20"
      indeterminate
    ></v-progress-circular>
  </div>
  <fixed-action-btn
    title="تایید"
    :disabled="!contractText"
    :is-loading="submitLoading"
    @click="contractConfirm"
  />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import {
    contract as contractApi,
    contractConfirm as contractConfirmApi,
  } from '~/api/account-setup';

  const router = useRouter();

  const contractText = ref<string>('');
  const isLoading = ref<boolean>(false);
  const submitLoading = ref<boolean>(false);

  const getContract = async () => {
    try {
      isLoading.value = true;
      const response = await contractApi();
      if (response.data) {
        contractText.value = response.data.contract_text;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const contractConfirm = async () => {
    const request_id = localStorage.getItem('request_id');
    if (!request_id) return;

    try {
      submitLoading.value = true;
      const response = await contractConfirmApi(request_id);
      if (response.status === 'success') {
        router.push('/account-setup/confirm-information');
      }
    } catch (error) {
      console.log(error);
    } finally {
      submitLoading.value = false;
    }
  };

  onMounted(() => {
    getContract();
  });
</script>

<style scoped>
  .ap-page-wrapper {
    height: calc(100vh - 230px);
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .agreement {
    line-height: 28px;
    text-align: justify;
  }

  .load-spinner {
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
</style>
