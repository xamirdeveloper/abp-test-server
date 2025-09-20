<template>
  <page-header
    class="pt-3 mb-12"
    title="ضبط ویدیو"
    subtitle="لطفا متن زیر را بخوانید و از خود ویدیو بگیرید"
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <div class="video-mode">
      <div class="video-mode__circle">
        <svg class="video-mode__progress" viewBox="0 0 120 120">
          <circle class="video-mode__progress-bg" cx="60" cy="60" r="54" stroke-width="8" />
          <circle
            class="video-mode__progress-bar"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="progressOffset"
            cx="60"
            cy="60"
            r="54"
            stroke-width="8"
          />
        </svg>
        <video
          ref="video"
          :src="videoSrc"
          autoplay
          playsinline
          :muted="isRecording"
          :controls="false"
          class="video-mode__preview"
          @ended="handleVideoEnd"
        ></video>
        <div
          v-if="videoUrl && !isPlaying"
          class="video-mode__overlay d-flex justify-center align-center"
        >
          <v-btn width="40" height="40" variant="plain" class="opacity-100" icon @click="playVideo">
            <icon-play width="40" height="40" stroke="var(--ap-text-btn)" />
          </v-btn>
          <v-btn
            width="40"
            height="40"
            variant="plain"
            class="opacity-100"
            icon
            @click="removeVideo"
          >
            <icon-trash width="32" height="32" stroke="var(--ap-text-btn)" />
          </v-btn>
        </div>
      </div>
      <p v-if="!isLoading" class="ap-txt-body-1 ap-text-secondary text-center">“ {{ caption }} ”</p>
      <v-progress-circular
        v-else
        indeterminate
        size="28"
        color="var(--ap-btn-primary)"
        class="d-block mx-auto my-4"
      />
      <div
        v-if="!isRecording && !videoUrl"
        class="ap-radius-full ap-border-2 ap-border-error-300 video-mode__button"
      >
        <v-btn
          icon
          width="65"
          height="65"
          :class="[canStartRecording ? 'ap-btn-error' : 'ap-bg-error-100']"
          :disabled="!canStartRecording"
          @click="startRecording"
        ></v-btn>
      </div>
      <div
        v-if="isRecording"
        class="ap-radius-full ap-border-2 ap-border-error-300 video-mode__button"
      >
        <v-btn icon width="65" height="65" class="ap-btn-error" @click="stopRecording">
          <div class="record-shape"></div>
        </v-btn>
      </div>
      <fixed-action-btn
        v-if="videoUrl"
        title="ادامه"
        :is-loading="isSubmitting"
        @click="submitVideo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { uploadFile } from '@/utils/fileUploader';
  import { getVideoCaption as getVideoCaptionApi } from '~/api/account-setup';

  const router = useRouter();

  const caption = ref('');
  const isLoading = ref(false);
  const isSubmitting = ref(false);
  const video = ref<HTMLVideoElement | null>(null);
  const videoUrl = ref<string | null>(null);
  const isRecording = ref(false);
  const isPlaying = ref(false);
  const isCameraReady = ref(false);

  let mediaRecorder: MediaRecorder | null = null;
  let recordedChunks: BlobPart[] = [];
  let recordedBlob: Blob | null = null;

  const duration = 25;
  const circumference = 2 * Math.PI * 54;
  const progress = ref(0);
  const progressOffset = computed(
    () => circumference - (progress.value / duration) * circumference
  );
  const canStartRecording = computed(() => {
    return isCameraReady.value && !isLoading.value && !isRecording.value && caption.value;
  });

  let interval: ReturnType<typeof setInterval>;
  let stream: MediaStream | null = null;

  const videoSrc = computed(() => videoUrl.value || '');

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      if (video.value) {
        video.value.srcObject = stream;
        video.value.muted = true;
        video.value.play().catch(() => {});
      }
      isCameraReady.value = true;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8,opus' });
    recordedChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      recordedBlob = blob;
      videoUrl.value = URL.createObjectURL(blob);
      if (video.value) {
        video.value.srcObject = null;
        video.value.src = videoUrl.value;
        video.value.load();
        video.value.muted = false;
      }
    };

    mediaRecorder.start();
    isRecording.value = true;
    progress.value = 0;

    interval = setInterval(() => {
      progress.value += 1;
      if (progress.value >= duration) stopRecording();
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording.value) mediaRecorder.stop();
    isRecording.value = false;
    clearInterval(interval);
  };

  const playVideo = () => {
    isPlaying.value = true;
    if (video.value) {
      video.value.muted = false;
      video.value.play().catch((err) => console.error('Play error:', err));
    }
  };

  const handleVideoEnd = () => {
    isPlaying.value = false;
  };

  const removeVideo = () => {
    videoUrl.value = null;
    progress.value = 0;
    isPlaying.value = false;
    if (video.value) {
      video.value.src = '';
      video.value.srcObject = stream;
      video.value.load();
      video.value.muted = true;
      video.value.play().catch(() => {});
    }
  };

  const getVideoCaption = async () => {
    try {
      isLoading.value = true;
      const req_id = localStorage.getItem('request_id') || '';
      const response = await getVideoCaptionApi(req_id);
      if (response.status == 'success' && response.data) {
        caption.value = response.data.video_caption;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const submitVideo = async () => {
    if (!recordedBlob) {
      return;
    }

    const file = new File([recordedBlob], `video_${Date.now()}.webm`, { type: 'video/webm' });

    isSubmitting.value = true;

    try {
      const request_id = localStorage.getItem('request_id') || '';
      const res = await uploadFile({
        url: 'https://bank.alibabapays.com/api/video/upload/',
        file,
        request_id,
      });

      if (res?.status === 'success') {
        recordedChunks = [];
        recordedBlob = null;
        router.push('/account-setup/final-confirmation');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
    } finally {
      isSubmitting.value = false;
    }
  };

  onMounted(() => {
    startCamera();
    getVideoCaption();
  });

  onBeforeUnmount(() => {
    stream?.getTracks().forEach((track) => track.stop());
    clearInterval(interval);
  });
</script>

<style scoped lang="scss">
  .video-mode {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100%;

    &__circle {
      position: relative;
      width: 200px;
      height: 200px;
      margin-bottom: 30px;

      video {
        position: absolute;
        top: 8px;
        left: 8px;
        width: 184px;
        height: 184px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--ap-text-primary);
      }
    }

    &__progress {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);

      &-bg {
        fill: none;
        stroke: #e0e0e0;
      }

      &-bar {
        fill: none;
        stroke: var(--ap-btn-primary);
        transition: stroke-dashoffset 1s linear;
      }
    }

    &__overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2px;
      z-index: 9999;
      border-radius: 50%;
      top: 8px;
      bottom: 8px;
      right: 8px;
      left: 8px;
    }

    &__button {
      position: fixed;
      bottom: 40px;
      padding: 3px;
    }
  }

  .record-shape {
    width: 22px;
    height: 22px;
    background-color: var(--ap-text-btn);
    border-radius: 4px;
  }
</style>
