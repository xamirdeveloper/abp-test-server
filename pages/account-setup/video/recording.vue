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
      <p class="ap-txt-body-1 ap-text-secondary">
        “ لطفا متن زیر را بخوانید و از خود ویدیو بگیرید”
      </p>
      <div
        v-if="!isRecording && !videoUrl"
        class="ap-radius-full ap-border-2 ap-border-error-300 video-mode__button"
      >
        <v-btn icon width="65" height="65" @click="startRecording" class="ap-btn-error"></v-btn>
      </div>
      <div
        v-if="isRecording"
        class="ap-radius-full ap-border-2 ap-border-error-300 video-mode__button"
      >
        <v-btn icon width="65" height="65" @click="stopRecording" class="ap-btn-error">
          <span class="ap-txt-32">■</span>
        </v-btn>
      </div>
      <fixed-action-btn v-if="videoUrl" title="ادامه" />
    </div>
  </div>
</template>
<script setup lang="ts">
const video = ref<HTMLVideoElement | null>(null);
const videoUrl = ref<string | null>(null);
const isRecording = ref(false);
const isPlaying = ref(false);
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: BlobPart[] = [];

const duration = 40;
const circumference = 2 * Math.PI * 54;
const progress = ref(0);

const progressOffset = computed(() => {
  return circumference - (progress.value / duration) * circumference;
});

let interval: ReturnType<typeof setInterval>;
let stream: MediaStream | null = null;

const videoSrc = computed(() => {
  if (videoUrl.value) return videoUrl.value;
  return '';
});

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: true,
    });
    if (video.value) {
      video.value.srcObject = stream;
      video.value.muted = true;
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
};

const startRecording = () => {
  if (!stream) return;

  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
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
    if (progress.value >= duration) {
      stopRecording();
    }
  }, 1000);
};

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop();
  }
  isRecording.value = false;
  clearInterval(interval);
};

const playVideo = () => {
  isPlaying.value = true;
  if (video.value) {
    video.value.muted = false; // موقع پخش، صدا روشن
    video.value.play();
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
  }
};

onMounted(() => {
  startCamera();
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
    justify-content: center;
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
</style>
