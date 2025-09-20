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
      :src="birthCertificate"
      @click="
        openCamera(
          'birthCertificate',
          'شناسنامه',
          'لطفا تصویر شناسنامه خود را اسکن و یا بارگذاری  کنید.'
        )
      "
      @remove="uploadStore.clearFile('birthCertificate')"
    />
  </div>
  <fixed-action-btn
    title="تایید"
    :disabled="!canConfirm"
    :is-loading="isLoading"
    @click="submitForm"
  />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { useCameraStore } from '@/stores/camera';
  import { useUploadStore } from '@/stores/upload';
  import { base64ToFile, compressAndConvertToPNG, uploadFile } from '@/utils/fileUploader';
  import { useToast } from 'vue-toastification';

  const router = useRouter();
  const cameraStore = useCameraStore();
  const uploadStore = useUploadStore();
  const toast = useToast();

  const cardReceipt = computed(() => uploadStore.cardReceipt);
  const birthCertificate = computed(() => uploadStore.birthCertificate);
  const canConfirm = computed(() => !!cardReceipt.value && !!birthCertificate.value);
  const isLoading = ref<boolean>(false);

  const openCamera = (key: string, title: string, subtitle: string) => {
    cameraStore.setTitleSubtitle(title, subtitle);
    cameraStore.setKey(key);
    router.push({ path: '/account-setup/camera-mode' });
  };

  const submitForm = async () => {
    const isValid = !!cardReceipt.value && !!birthCertificate.value;
    if (!isValid) {
      return;
    }

    try {
      isLoading.value = true;
      const request_id = localStorage.getItem('request_id') || '';
      const uploads = [];

      if (uploadStore.cardReceipt) {
        let file = base64ToFile(uploadStore.cardReceipt, 'cardReceipt.png');
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

      if (uploadStore.birthCertificate) {
        let file = base64ToFile(uploadStore.birthCertificate, 'birthCertificate.png');
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

      router.push('/signature-upload');
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
