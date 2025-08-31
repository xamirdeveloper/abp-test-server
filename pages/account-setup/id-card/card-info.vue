<template>
  <page-header
    class="pt-3"
    title="کارت ملی"
    subtitle="لطفا اطلاعات کارت ملی خود را وارد کنید."
    :show-back="true"
    :has-support="false"
  />
  <div class="ap-page-wrapper">
    <div class="form-wrapper">
      <base-input
        v-model="nationalCardSerial"
        :error="error.nationalCardSerial"
        :maxlength="10"
        label="شماره سریال"
        @input="nationalCardSerial = nationalCardSerial.replace(/[^A-Za-z0-9]/g, '')"
      />
    </div>
    <div class="d-flex justify-center w-100">
      <div class="d-flex justify-center img-wrap">
        <img
          src="/images/idcard-back.webp"
          width="289"
          height="192"
          alt="idcard"
          class="idcard-img"
        />
        <div class="serial-box">
          <img
            src="/images/idcard-back.webp"
            width="289"
            height="192"
            alt="serial"
            class="serial-img"
          />
        </div>
        <span class="serial-text px-2">شماره سریال</span>
      </div>
    </div>
  </div>
  <fixed-action-btn title="تایید" @click="submitForm" :is-loading="isLoading" />
</template>

<script lang="ts" setup>
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { setUserDetails } from '~/api/account-setup';
  import { useRouter } from 'vue-router';

  interface error {
    nationalCardSerial?: string;
  }

  const userDetailsStore = useUserDetailsStore();
  const router = useRouter();

  const nationalCardSerial = ref<string>('');
  const error = ref<error>({
    nationalCardSerial: '',
  });
  const isLoading = ref<boolean>(false);

  watch(nationalCardSerial, () => (error.value.nationalCardSerial = ''));
  const validateNationalCardSerial = () => {
    const serial = nationalCardSerial.value?.trim() || '';
    const serialRegex = /^[A-Za-z0-9]{6,10}$/;

    if (!serial) {
      error.value.nationalCardSerial = 'وارد کردن این فیلد الزامی است.';
      return false;
    }

    if (!serialRegex.test(serial)) {
      error.value.nationalCardSerial =
        'سریال کارت ملی باید ۶ تا ۱۰ کاراکتر و فقط شامل حروف و اعداد باشد.';
      return false;
    }

    error.value.nationalCardSerial = '';
    return true;
  };

  const validateForm = () => {
    const isValid = validateNationalCardSerial();

    return isValid;
  };

  const submitForm = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    userDetailsStore.updateFields({
      national_card_serial: nationalCardSerial.value,
    });

    try {
      isLoading.value = true;
      const payload = userDetailsStore.getPayload();
      const response = await setUserDetails(payload);
      if (response.status == 'success' && response.data) {
        router.push('card-upload');
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  @use '@/assets/design-system/input.scss' as *;

  .form-wrapper {
    margin-bottom: 80px;
    height: 100px;
  }

  .ap-mb-6 {
    margin-bottom: 6px;
  }

  .img-wrap {
    position: relative;
    width: fit-content;
  }

  .idcard-img {
    filter: blur(2px);
  }

  .serial-box {
    position: absolute;
    left: 4px;
    top: 4px;
    width: 20px;
    height: 58px;
    overflow: hidden;
    border: 2px solid red;
    border-radius: 2px;
  }

  .serial-img {
    position: absolute;
    top: -8px;
    left: -5px;
  }

  .serial-text {
    position: absolute;
    left: 30px;
    top: 4px;
    font-size: 12px;
    font-weight: 600;
    background-color: var(--ap-border-default);
  }
</style>
