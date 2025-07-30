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
  <fixed-action-btn title="تایید" :disabled="true" />
</template>

<script lang="ts" setup>
  import { useCameraStore } from '@/stores/camera';
  import { useUploadStore } from '@/stores/upload';

  const router = useRouter();
  const cameraStore = useCameraStore();
  const uploadStore = useUploadStore();

  const userSignature = computed(() => uploadStore.userSignature);

  const openCamera = (key: string, title: string, subtitle: string) => {
    cameraStore.setTitleSubtitle(title, subtitle);
    cameraStore.setKey(key);
    router.push({ path: '/account-setup/camera-mode' });
  };
</script>
