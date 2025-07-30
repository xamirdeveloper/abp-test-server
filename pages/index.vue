<template>
  <div class="ap-page-wrapper pt-5">
    <video
      src="@/assets/video/start.mp4"
      autoplay
      muted
      playsinline
      loop
      class="start-video w-100 h-100"
    ></video>
  </div>
  <div class="d-flex justify-center align-center ga-5 buttons">
    <v-btn
      class="ap-radius-12 ap-btn-primary v-col-6"
      height="45px"
      elevation="0"
      @click="router.push('/login')"
    >
      <span class="ap-txt-button ap-text-btn">ورود</span>
    </v-btn>
    <v-btn
      class="ap-radius-12 ap-btn-primary v-col-6"
      height="45px"
      elevation="0"
      @click="router.push('/account-setup')"
    >
      <span class="ap-txt-button ap-text-btn">افتتاح حساب</span>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  definePageMeta({
    middleware: ['check-splash'],
  });
</script>

<style scoped>
  .start-video {
    object-fit: cover;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left:0;
  }

  .buttons {
    width: calc(100% - 80px);
    position: fixed;
    bottom: 24px;
    right: 40px;
    left: 40px;
  }
</style>
