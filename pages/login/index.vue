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
    <base-input
      id="username"
      v-model="username"
      autocomplete="username"
      name="username"
      label="نام کاربری"
      class="mb-4"
      :error="error.username"
      @input="username = toEnglishChars(username)"
    />
    <password-input
      id="password"
      v-model="password"
      autocomplete="current-password"
      name="password"
      label="رمز ورود"
      class="mb-6"
      :error="error.password"
      @input="password = toEnglishChars(password)"
    />
    <v-btn
      class="ap-radius-12 ap-btn-primary w-100 mb-3"
      height="48"
      @click="submitForm"
      :disabled="isLoading"
      :loading="isLoading"
    >
      <span class="ap-txt-button ap-text-btn">تایید</span>
    </v-btn>
    <v-btn variant="text" density="compact" @click="isSettingsModalOpen = true">
      <span class="ap-txt-body-2 ap-text-btn-primary">فراموشی ها / نیاز به کمک</span>
    </v-btn>
  </div>
  <app-version />
  <base-bottom-sheet v-model="isSettingsModalOpen">
    <v-btn
      variant="text"
      height="40"
      class="d-flex justify-start w-100 pa-1 mb-2"
      @click="router.push('account-setup/forget-password')"
    >
      <icon-lock width="20" height="20" class="me-2" />
      <span class="ap-txt-title-4">فراموشی رمز</span>
    </v-btn>
    <v-divider />
    <v-btn
      variant="text"
      height="40"
      class="d-flex justify-start w-100 pa-1 my-2"
      @click="router.push('account-setup/forget-username')"
    >
      <icon-user-account width="20" height="20" class="me-2" />
      <span class="ap-txt-title-4">فراموشی نام کاربری</span>
    </v-btn>
    <v-divider />
    <v-btn
      variant="text"
      height="40"
      class="d-flex justify-start w-100 pa-1 mt-2 mb-4"
      @click="router.push('support')"
    >
      <icon-call width="20" height="20" class="me-2" />
      <span class="ap-txt-title-4">تماس با پشتیبانی</span>
    </v-btn>
  </base-bottom-sheet>
</template>

<script lang="ts" setup>
  import { useTheme } from 'vuetify';
  import { isPasswordValid } from '@/utils/validators';
  import { useAuthStore } from '@/stores/auth';

  interface Error {
    username?: string;
    password?: string;
  }

  const router = useRouter();
  const theme = useTheme();
  const authStore = useAuthStore();

  const isSettingsModalOpen = ref<boolean>(false);
  const username = ref<string>('');
  const password = ref<string>('');
  const currentTheme = computed(() => theme.global.name.value);
  const isLoading = ref<boolean>(false);
  const error = ref<Error>({
    username: '',
    password: '',
  });

  watch(username, () => (error.value.username = ''));
  const validateUsername = () => {
    if (!username.value) {
      error.value.username = 'لطفا نام کاربری خود را وارد کنید.';
      return false;
    }

    if (username.value.length < 4) {
      error.value.username = 'نام کاربری حداقل باید شامل 4 کرکتر باشد.';
      return false;
    }

    error.value.username = '';
    return true;
  };

  watch(password, () => (error.value.password = ''));
  const validatePassword = () => {
    const isValidPassword = isPasswordValid(password.value);

    if (!password.value) {
      error.value.password = 'لطفا رمز عبور خود را وارد کنید.';
      return false;
    }

    // if (!isValidPassword) {
    //   error.value.password = 'فرمت رمز عبور صحیح نمی باشد.';
    //   return false;
    // }

    error.value.password = '';
    return true;
  };

  const validateForm = () => {
    const isValid = validateUsername() && validatePassword();
    return isValid;
  };

  const submitForm = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      isLoading.value = true;

      const payload = {
        username: username.value,
        password: password.value,
      };

      await authStore.loginAction(payload);

      if (authStore.isAuthenticated) {
        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
          localStorage.removeItem('redirectAfterLogin');
          router.push(redirect);
        } else {
          router.push({ name: 'profile' });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>

<style scoped>
  .ap-mb-64 {
    margin-bottom: 64px;
  }

  .ap-text-btn-primary {
    color: var(--ap-btn-primary);
  }
</style>
