<template>
  <base-modal v-model="model" :closable="closable">
    <template #default>
      <div class="d-flex flex-column justify-center align-center">
        <div class="mb-6 icon-wrapper">
          <icon-danger width="48" height="48" stroke="var(--ap-text-btn)" />
        </div>
        <P class="ap-txt-title-3 mb-2 modal-title">مسدود موقت</P>
        <span class="ap-txt-body-1 ap-text-secondary text-center px-5 mb-6">
          پس از تایید کارت فعلی شما مسدود میشود.و برای برگرداندن مجدد افتتاح حساب کنید.
        </span>
        <div class="d-flex w-100 ga-3">
          <div class="w-50">
            <v-btn
              variant="text"
              class="cancel-btn ap-radius-12 w-100"
              height="48px"
              :disabled="loading"
              @click="model = false"
            >
              <span class="ap-txt-title-4 ap-text-primary">انصراف</span>
            </v-btn>
          </div>

          <div class="w-50">
            <v-btn
              variant="text"
              class="ap-btn-error ap-radius-12 w-100"
              height="48px"
              :loading="loading"
              @click="emit('block')"
            >
              <span class="ap-txt-title-4 ap-text-btn">مسدود کردن</span>
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </base-modal>
</template>
<script lang="ts" setup>
  interface Props {
    modelValue: boolean;
    title?: string;
    description?: string;
    closable?: boolean;
    actionText?: string;
    loading: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'اطلاعات شما با موفقیت ثبت شد.',
    description: 'ما اطلاعات را بررسی می‌کنیم. لطفا منتظر دریافت پیامک باشید.',
    closable: false,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'block'): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
</script>
<style scoped>
  .icon-wrapper {
    width: 120px;
    height: 120px;
    background-color: var(--ap-btn-error);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-title {
    color: var(--ap-btn-error);
  }

  .cancel-btn {
    background-color: var(--ap-border-default);
  }
</style>
