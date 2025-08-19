<template>
  <page-header
    class="pt-3"
    title="امضا"
    subtitle="لطفا امضا خود را اسکن و یا بارگذاری کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <file-preview
      class="mb-4"
      :removable="true"
      :src="userSignature"
      @click="
        openCamera('userSignature', 'امضا', 'لطفا تصویر امضا خود را اسکن و یا بارگذاری  کنید.')
      "
      @remove="uploadStore.clearFile('userSignature')"
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

  const userSignature = computed(() => uploadStore.userSignature);
  const canConfirm = computed(() => !!userSignature.value);
  const isLoading = ref<boolean>(false);

  const openCamera = (key: string, title: string, subtitle: string) => {
    cameraStore.setTitleSubtitle(title, subtitle);
    cameraStore.setKey(key);
    router.push({ path: '/account-setup/camera-mode' });
  };

  const submitForm = async () => {
    if (!uploadStore.userSignature) {
      return;
    }

    try {
      isLoading.value = true;
      const request_id = localStorage.getItem('request_id') || '';

      let file = base64ToFile(uploadStore.userSignature, 'userSignature.png');
      if (!file.type.startsWith('image/')) {
        toast.error('فایل باید فرمت تصویر داشته باشد.');
        return;
      }
      file = await compressAndConvertToPNG(file);
      const res = await uploadFile({
        url: 'upload/signature/',
        request_id,
        file,
      });

      if (res.status == 'success') {
        router.push('video/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>
