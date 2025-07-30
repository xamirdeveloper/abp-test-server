<template>
  <page-header
    class="pt-3"
    title="کارت ملی"
    subtitle="لطفا تصاویر جلو و پشت کارت ملی خود را بارگذاری کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <file-preview
      class="mb-4"
      :removable="true"
      :src="frontImage"
      @click="
        openCamera(
          'frontCard',
          'کارت ملی',
          'لطفا تصویر جلوی کارت ملی خود را اسکن و یا بارگذاری کنید.'
        )
      "
      @remove="uploadStore.clearFile('frontCard')"
    />
    <file-preview
      :removable="true"
      :src="backImage"
      @click="
        openCamera('backCard', 'کارت ملی', 'لطفا تصویر پشت کارت ملی خود را اسکن یا بارگذاری کنید.')
      "
      @remove="uploadStore.clearFile('backCard')"
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

  const frontImage = computed(() => uploadStore.frontCard);
  const backImage = computed(() => uploadStore.backCard);

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
