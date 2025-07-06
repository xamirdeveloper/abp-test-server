<template>
  <div class="camera-mode">
    <page-header
      class="pt-3"
      title="کارت ملی"
      subtitle="لطفا تصاویر جلو و پشت کارت ملی خود را بارگذاری کنید."
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

        <div v-else class="ap-upload-card__preview">
          <img :src="capturedImage" alt="captured image" />
        </div>

        <img src="@/assets/images/corner.png" width="260" height="167" class="corner top-left" />
        <img src="@/assets/images/corner.png" width="260" height="167" class="corner top-right" />
        <img src="@/assets/images/corner.png" width="260" height="167" class="corner bottom-left" />
        <img
          src="@/assets/images/corner.png"
          width="260"
          height="167"
          class="corner bottom-right"
        />
      </div>
    </div>

    <div class="d-flex justify-space-between align-center camera-mode__buttons">
      <v-btn icon width="52" height="52" class="bg-black">
        <icon-flash width="24" height="24" />
      </v-btn>

      <div class="ap-radius-full ap-border-2 ap-border-accent camera-mode__snapshot">
        <v-btn icon width="60" height="60" @click="captureImage"></v-btn>
      </div>

      <v-btn icon width="52" height="52" class="bg-black" @click="openGallery">
        <icon-gallery width="20" height="20" />
      </v-btn>
    </div>

    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const video = ref<HTMLVideoElement | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);
  const capturedImage = ref<string | null>(null);

  let stream: MediaStream | null = null;

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (video.value) {
        video.value.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (!video.value) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video.value, 0, 0, canvas.width, canvas.height);
    capturedImage.value = canvas.toDataURL('image/png');
  };

  const openGallery = () => {
    fileInput.value?.click();
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      capturedImage.value = URL.createObjectURL(file);
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
      width: 100% !important;
      height: 100% !important;
      z-index: 999;
    }
  }
</style>
