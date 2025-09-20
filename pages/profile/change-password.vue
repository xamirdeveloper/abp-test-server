<template>
  <page-header
    class="pt-3"
    title="تغییر رمز عبور"
    subtitle="لطفا رمز عبور فعلی و جدید خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <password-input
      v-model="currentPassword"
      label="رمز عبور فعلی"
      autocomplete="current-password"
      :error="error.currentPassword"
      class="mb-4"
    />
    <password-input
      v-model="newPassword"
      label="رمز عبور جدید"
      autocomplete="new-password"
      :error="error.newPassword"
      class="mb-4"
    />
  </div>
  <fixed-action-btn
    title="تایید"
    :is-loading="isLoading"
    :disabled="isLoading"
    @click="submitForm"
  />
</template>

<script lang="ts" setup>
  import { isPasswordValid } from '@/utils/validators';
  import { changePassword } from '~/api/profile';
  import { useToast } from 'vue-toastification';

  interface Error {
    currentPassword?: string;
    newPassword?: string;
  }

  const toast = useToast();

  const currentPassword = ref<string>('');
  const newPassword = ref<string>('');
  const isLoading = ref<boolean>(false);
  const error = ref<Error>({
    currentPassword: '',
    newPassword: '',
  });

  watch(currentPassword, () => (error.value.currentPassword = ''));
  const validateCurrentPass = () => {
    const isValidPassword = isPasswordValid(currentPassword.value);

    if (!currentPassword.value) {
      error.value.currentPassword = 'لطفا رمز عبور فعلی خود را وارد کنید.';
      return false;
    }

    if (!isValidPassword) {
      error.value.currentPassword = 'فرمت رمز عبور صحیح نمی باشد.';
      return false;
    }

    error.value.currentPassword = '';
    return true;
  };

  watch(newPassword, () => (error.value.newPassword = ''));
  const validateNewPass = () => {
    const isValidPassword = isPasswordValid(newPassword.value);

    if (!newPassword.value) {
      error.value.newPassword = 'لطفا رمز عبور جدید خود را وارد کنید.';
      return false;
    }

    if (!isValidPassword) {
      error.value.newPassword = 'فرمت رمز عبور صحیح نمی باشد.';
      return false;
    }

    error.value.newPassword = '';
    return true;
  };

  const submitForm = async () => {
    const isValid = validateCurrentPass() && validateNewPass();
    if (!isValid) return;

    try {
      isLoading.value = true;
      const payload = {
        old_password: currentPassword.value,
        new_password: newPassword.value,
      };

      const res = await changePassword(payload);

      if (res.status == 'success') {
        toast.success('رمز عبور با موفقیت تغییر یافت.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      isLoading.value = false;
    }
  };
</script>
