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
  <fixed-action-btn
    title="تایید"
    :disabled="!canConfirm"
    :is-loading="isLoading"
    @click="submitForm"
  />
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useCameraStore } from '@/stores/camera';
  import { useUploadStore } from '@/stores/upload';
  import { base64ToFile, compressAndConvertToPNG, uploadFile } from '@/utils/fileUploader';
  import { useToast } from 'vue-toastification';

  const router = useRouter();
  const cameraStore = useCameraStore();
  const uploadStore = useUploadStore();
  const toast = useToast();

  const frontImage = computed(() => uploadStore.frontCard);
  const backImage = computed(() => uploadStore.backCard);
  const canConfirm = computed(() => !!frontImage.value && !!backImage.value);
  const isLoading = ref<boolean>(false);

  const openCamera = (key: string, title: string, subtitle: string) => {
    cameraStore.setTitleSubtitle(title, subtitle);
    cameraStore.setKey(key);
    router.push({ path: '/account-setup/camera-mode' });
  };

  const submitForm = async () => {
    const isValid = !!frontImage.value && !!backImage.value;
    if (!isValid) {
      return;
    }

    try {
      isLoading.value = true;
      const request_id = localStorage.getItem('request_id') || '';
      const uploads = [];

      if (uploadStore.frontCard) {
        let file = base64ToFile(uploadStore.frontCard, 'front.png');
        if (!file.type.startsWith('image/')) {
          toast.error('فایل باید فرمت تصویر داشته باشد.');
          return;
        }
        file = await compressAndConvertToPNG(file);
        uploads.push(
          uploadFile({
            url: 'upload/card/front/',
            request_id,
            file,
          })
        );
      }

      if (uploadStore.backCard) {
        let file = base64ToFile(uploadStore.backCard, 'back.png');
        if (!file.type.startsWith('image/')) {
          toast.error('فایل باید فرمت تصویر داشته باشد.');
          return;
        }
        file = await compressAndConvertToPNG(file);
        uploads.push(
          uploadFile({
            url: 'upload/card/back/',
            request_id,
            file,
          })
        );
      }

      await Promise.all(uploads);

      router.push('/account-setup/signature-upload');
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>

<style scoped>
  .ap-page-wrapper {
    margin-bottom: 96px;
  }
</style>
