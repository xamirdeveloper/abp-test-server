<template>
  <div class="splash-wrapper">
    <video
      src="/videos/splash.mp4"
      autoplay
      muted
      playsinline
      @ended="handleSplashEnd"
      class="splash-video"
    ></video>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useTheme } from 'vuetify';
  import { useAuthStore } from '@/stores/auth';
  import { useLanguageStore } from '@/stores/language';
  import { useThemeStore } from '@/stores/theme';
  import { useSplashStore } from '@/stores/splash';

  const router = useRouter();
  const vuetifyTheme = useTheme();
  const authStore = useAuthStore();
  const languageStore = useLanguageStore();
  const themeStore = useThemeStore();
  const splashStore = useSplashStore();

  onMounted(() => {
    const lang = localStorage.getItem('lang') || 'fa';
    languageStore.setLang(lang);

    themeStore.initTheme();
    vuetifyTheme.global.name.value = themeStore.theme;
  });

  const handleSplashEnd = () => {
    splashStore.setSplashShown(true);
    if (authStore.isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/');
    }
  };
</script>

<style scoped lang="scss">
  .splash-wrapper {
    position: fixed;
    inset: 0;
    background: black;
    z-index: 9999;
  }
  .splash-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
