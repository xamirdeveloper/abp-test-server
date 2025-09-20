<template>
  <page-header
    class="pt-3"
    title="تنظیمات ورود به برنامه"
    subtitle="لطفا نام کاربری و رمز ورود خود را انتخاب کنید."
    :show-back="false"
    :has-support="true"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="username"
      label="نام کاربری"
      autocomplete="username"
      :error="error.username"
      class="mb-4"
      @input="username = toEnglishChars(username)"
    />
    <password-input
      v-model="password"
      label="رمز ورود"
      autocomplete="new-password"
      :error="error.password"
      class="mb-4"
      @input="password = toEnglishChars(password)"
    />
    <password-input
      v-model="passwordRepeat"
      label="تکرار رمز ورود"
      autocomplete="new-password"
      :error="error.passwordRepeat"
      class="mb-6"
      @input="passwordRepeat = toEnglishChars(passwordRepeat)"
    />
    <password-check-list :password="password" @valid="passwordValidation" />
    <fixed-action-btn title="تایید" @click="submitForm" />
  </div>
  <success-modal v-model="showSuccessModal" :closable="true" title="اطلاعات شما ثبت شد." />
</template>

<script lang="ts" setup>
  import { setUsernamePasswordStepThree } from '~/api/account-setup';

  interface Error {
    username?: string;
    password?: string;
    passwordRepeat?: string;
  }

  const showSuccessModal = ref<boolean>(false);
  const username = ref<string>('');
  const password = ref<string>('');
  const passwordRepeat = ref<string>('');
  const isPasswordValid = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const error = ref<Error>({
    username: '',
    password: '',
    passwordRepeat: '',
  });

  watch(username, () => (error.value.username = ''));
  const validateUsername = () => {
    if (!username.value) {
      error.value.username = 'لطفا نام کاربری خود را تعیین کنید.';
      return false;
    }

    if (username.value.length < 4) {
      error.value.username = 'نام کاربری حداقل باید شامل 4 کرکتر باشد.';
      return false;
    }

    error.value.username = '';
    return true;
  };

  const passwordValidation = (value: boolean) => {
    isPasswordValid.value = value;
  };

  watch(password, () => (error.value.password = ''));
  const validatePassword = () => {
    if (!isPasswordValid.value) {
      error.value.password = 'در تعیین رمز عبور موارد زیر را رعایت کنید.';
      return false;
    }

    error.value.password = '';
    return true;
  };

  watch(passwordRepeat, () => (error.value.passwordRepeat = ''));
  const validatepasswordRepeat = () => {
    if (!passwordRepeat.value) {
      error.value.passwordRepeat = 'تکرار رمز عبور الزامی است.';
      return false;
    }

    if (passwordRepeat.value != password.value) {
      error.value.passwordRepeat = 'رمز عبور و تکرارش باهم برابر نیستند.';
      return false;
    }

    error.value.passwordRepeat = '';
    return true;
  };

  const validateForm = () => {
    const isValid = validateUsername() && validatePassword() && validatepasswordRepeat();
    return isValid;
  };

  const submitForm = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      isLoading.value = true;

      const payload = {
        mobile: localStorage.getItem('user-mobile') || '',
        uname: username.value,
        password: password.value,
        confirm_pass: passwordRepeat.value,
      };

      const res = await setUsernamePasswordStepThree(payload);

      if (res.status == 'success') {
        showSuccessModal.value = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>
