<template>
  <page-header
    class="pt-3"
    title="تغییر نام کاربری"
    subtitle="لطفا نام کاربری جدید خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="username"
      label="نام کاربری جدید"
      autocomplete="current-password"
      :error="error.username"
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
  import { changeUsername } from '~/api/profile';
  import { useToast } from 'vue-toastification';

  interface Error {
    username?: string;
  }

  const toast = useToast();

  const username = ref<string>('');
  const isLoading = ref<boolean>(false);
  const error = ref<Error>({
    username: '',
  });

  watch(username, () => (error.value.username = ''));
  const validateUsername = () => {
    if (!username.value) {
      error.value.username = 'لطفا نام کاربری جدید خود را وارد کنید.';
      return false;
    }

    if (username.value.length < 4) {
      error.value.username = 'نام کاربری حداقل باید شامل 4 کاراکتر باشد.';
      return false;
    }

    error.value.username = '';
    return true;
  };

  const submitForm = async () => {
    const isValid = validateUsername();
    if (!isValid) return;

    try {
      isLoading.value = true;

      const res = await changeUsername(username.value);

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
