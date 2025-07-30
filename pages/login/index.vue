<template>
  <div class="text-end mt-3 mb-5 ap-page-header">
    <v-btn
      icon
      class="ap-border-1 ap-border-accent-primary opacity-100 ap-me-10"
      width="40"
      height="40"
      variant="plain"
      @click="router.push({ name: 'support' })"
    >
      <icon-support width="22" height="22" />
    </v-btn>
  </div>
  <div class="text-center ap-mb-64">
    <img
      alt="alibabapays logo"
      :src="`/images/alibabapays-logo-${currentTheme}.svg`"
      width="225"
      height="120"
    />
  </div>
  <div class="ap-page-wrapper d-flex flex-column align-center">
    <password-input label="نام کاربری" class="mb-4" :has-icon="false" />
    <password-input label="رمز ورود" class="mb-6" />
    <v-btn class="ap-radius-12 ap-btn-primary w-100 mb-3" height="48">
      <span class="ap-txt-button ap-text-btn">تایید</span>
    </v-btn>
    <v-btn variant="text" density="compact">
      <span class="ap-txt-body-2 ap-text-btn-primary">فراموشی ها / نیاز به کمک</span>
    </v-btn>
  </div>
  <app-version />
</template>

<script lang="ts" setup>
  import { useTheme } from 'vuetify';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const theme = useTheme();

  const currentTheme = computed(() => theme.global.name.value);
</script>

<style scoped>
  .ap-mb-64 {
    margin-bottom: 64px;
  }

  .ap-text-btn-primary {
    color: var(--ap-btn-primary);
  }
</style>
