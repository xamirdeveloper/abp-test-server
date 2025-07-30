<template>
  <page-header
    class="pt-3"
    title="رسید کارت ملی"
    subtitle="لطفا تصاویر رسید کارت ملی و شناسنامه خود را بارگذاری کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <file-preview
      class="mb-4"
      :removable="true"
      :src="cardReceipt"
      @click="
        openCamera(
          'cardReceipt',
          'رسید کارت ملی',
          'لطفا تصویر رسید کارت ملی خود را اسکن و یا بارگذاری کنید.'
        )
      "
      @remove="uploadStore.clearFile('cardReceipt')"
    />
    <file-preview
      :removable="true"
      :src="birthCard"
      @click="
        openCamera('birthCard', 'شناسنامه', 'لطفا تصویر شناسنامه خود را اسکن و یا بارگذاری  کنید.')
      "
      @remove="uploadStore.clearFile('birthCard')"
    />
  </div>
  <fixed-action-btn title="تایید" :disabled="true" />
</template>

<script lang="ts" setup>
  import { useCameraStore } from '@/stores/camera';
  import { useUploadStore } from '@/stores/upload';

  const router = useRouter();
  const cameraStore = useCameraStore();
  const uploadStore = useUploadStore();

  const cardReceipt = computed(() => uploadStore.cardReceipt);
  const birthCard = computed(() => uploadStore.birthCard);

  const openCamera = (key: string, title: string, subtitle: string) => {
    cameraStore.setTitleSubtitle(title, subtitle);
    cameraStore.setKey(key);
    router.push({ path: '/account-setup/camera-mode' });
  };
</script>

<style scoped>
  .ap-page-wrapper {
    height: calc(100% - 230px);
    overflow-y: auto;
  }
</style>
