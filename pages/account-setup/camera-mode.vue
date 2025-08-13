<template>
  <div class="camera-mode">
    <page-header
      class="pt-3"
      :title="cameraStore.title"
      :subtitle="cameraStore.subtitle"
      :show-back="true"
      :is-light="true"
    />

    <div class="ap-upload-card ap-page-wrapper">
      <div class="ap-upload-card__border">
        <video
          v-if="!capturedImage"
          ref="video"
          autoplay
          playsinline
          class="ap-upload-card__video"
        ></video>

        <!-- <div v-else class="ap-upload-card__preview">
          <img :src="capturedImage" alt="captured image" />
        </div> -->

        <img src="@/assets/images/corner.svg" class="corner top-left" />
        <img src="@/assets/images/corner.svg" class="corner top-right" />
        <img src="@/assets/images/corner.svg" class="corner bottom-left" />
        <img src="@/assets/images/corner.svg" class="corner bottom-right" />
      </div>
    </div>

    <div class="d-flex justify-space-between align-center camera-mode__buttons">
      <v-btn icon width="52" height="52" class="ap-bg-opposite">
        <icon-flash width="24" height="24" stroke="var(--ap-bg-surface)" />
      </v-btn>

      <div class="ap-radius-full ap-border-2 ap-border-accent camera-mode__snapshot">
        <v-btn icon width="60" height="60" class="bg-white" @click="captureImage"></v-btn>
      </div>

      <v-btn icon width="52" height="52" class="ap-bg-opposite" @click="openGallery">
        <icon-gallery width="20" height="20" stroke="var(--ap-bg-surface)" />
      </v-btn>
    </div>

    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useUploadStore } from '@/stores/upload';
  import { useCameraStore } from '@/stores/camera';

  const video = ref<HTMLVideoElement | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);
  const capturedImage = ref<string | null>(null);

  const router = useRouter();
  const uploadStore = useUploadStore();
  const cameraStore = useCameraStore();

  let stream: MediaStream | null = null;

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: 'environment' } },
      });
      if (video.value) {
        video.value.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (!video.value || !cameraStore.key) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video.value, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    uploadStore.setFile(cameraStore.key, dataUrl);
    cameraStore.clear();
    router.back();
  };

  const openGallery = () => {
    fileInput.value?.click();
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file && cameraStore.key) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadStore.setFile(cameraStore.key!, ev.target?.result as string);
        cameraStore.clear();
        router.back();
      };
      reader.readAsDataURL(file);
    }
  };

  onMounted(() => {
    startCamera();
  });

  onBeforeUnmount(() => {
    stream?.getTracks().forEach((track) => track.stop());
  });
</script>

<style scoped lang="scss">
  @use '@/assets/design-system/upload-file.scss' as *;

  .camera-mode {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2.5px);
    height: 100%;

    &__buttons {
      position: fixed;
      bottom: 40px;
      right: 60px;
      left: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% - 120px);
    }

    &__snapshot {
      padding: 3px;
    }
  }

  .ap-upload-card {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);

    &__video {
      width: 100%;
      border-radius: 12px;
      position: absolute;
    }
  }
</style>
