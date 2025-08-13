<template>
  <page-header
    class="pt-3"
    title="تکمیل اطلاعات"
    subtitle="لطفا اطلاعات زیر را تکمیل کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input
      v-model="nationalId"
      label="کد ملی"
      type="number"
      class="mb-4"
      :error="error.nationalId"
      :maxlength="10"
    />
    <div class="mb-4">
      <label class="d-block ap-txt-label ap-text-primary ap-mb-6">تاریخ تولد</label>
      <persian-date-picker
        v-model="birthDate"
        format="jYYYY/jMM/jDD"
        display-format="jYYYY/jMM/jDD"
        locale="fa"
        digits="fa"
        calendar-class="ap-calendar"
        input-class="ap-input__field"
        :ap-input__field--error="!!error.birthDate"
      />
      <p :class="['ap-input__error', { 'ap-input__error--visible': !!error.birthDate }]">
        {{ error.birthDate }}
      </p>
    </div>
    <base-input
      v-model="mobile"
      label="تلفن همراه"
      type="number"
      :error="error.mobile"
      :maxlength="11"
    />
  </div>
  <fixed-action-btn title="ادامه" :is-loading="isLoading" @click="submitForm" />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { createRequest } from '~/api/account-setup';
  import type { CreateRequestParams } from '~/api/account-setup/types';
  import { isValidIranianMobile, isValidIranianNationalId } from '@/utils/validators';

  interface error {
    nationalId?: string;
    birthDate?: string;
    mobile?: string;
  }

  const router = useRouter();

  const nationalId = ref<number>();
  const birthDate = ref<string>('');
  const mobile = ref<number>();
  const error = ref<error>({
    nationalId: '',
    birthDate: '',
    mobile: '',
  });
  const isLoading = ref<boolean>(false);

  const validateForm = () => {
    const isValid = validateNationalId() && validateBirthDate() && validateMobile();
    return isValid;
  };

  watch(nationalId, () => (error.value.nationalId = ''));
  const validateNationalId = () => {
    if (!nationalId.value) {
      error.value.nationalId = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    const isValid = isValidIranianNationalId(nationalId.value);

    if (!isValid) {
      error.value.nationalId = 'کد ملی وارد شده نامعتبر است.';
    }

    return isValid;
  };

  watch(birthDate, () => (error.value.birthDate = ''));
  const validateBirthDate = () => {
    if (!birthDate.value) {
      error.value.birthDate = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    return true;
  };

  watch(mobile, () => (error.value.mobile = ''));
  const validateMobile = () => {
    if (!mobile.value) {
      error.value.mobile = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    const isValid = isValidIranianMobile(mobile.value);

    if (!isValid) {
      error.value.mobile = 'شماره موبایل وارد شده صحیح نمی‌باشد.';
    }

    return isValid;
  };

  const convertDigitsToEnglish = (str: string) =>
    str.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());

  const submitForm = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      isLoading.value = true;
      const englishDate = convertDigitsToEnglish(birthDate.value);

      const payload: CreateRequestParams = {
        national_id: nationalId.value?.toString() || '',
        mobile: mobile.value?.toString() || '',
        birthday: englishDate,
      };

      const response = await createRequest(payload);

      if (response.status === 'success' && response.data) {
        localStorage.setItem('national_id', nationalId.value?.toString() || '');
        localStorage.setItem('request_id', response.data.request_id);
        localStorage.setItem('user-mobile', mobile.value?.toString() || '');
        router.push({ name: 'otp' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  @use '@/assets/design-system/input.scss' as *;

  .ap-mb-6 {
    margin-bottom: 6px;
  }
</style>
