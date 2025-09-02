<template>
  <page-header title="کارت" :has-support="true" class="pt-3 mb-3" />
  <div class="ap-page-wrapper mb-5">
    <div class="d-flex flex-column align-center">
      <card class="mb-6" :is-card-enabled="isCardEnabled" :is-card-blocked="isCardBlocked" />
      <div class="d-flex align-center justify-center ga-5">
        <div class="d-flex flex-column align-center ga-3">
          <v-btn
            variant="text"
            width="66"
            height="66"
            class="ap-border-1 ap-border-default ap-radius-24"
            @click="isCardSettingSheetOpen = true"
          >
            <icon-setting2 width="28" height="28" />
          </v-btn>
          <span class="ap-txt-menu ap-text-primary">تنظیمات</span>
        </div>
        <div class="d-flex flex-column align-center ga-3">
          <v-btn
            variant="text"
            width="66"
            height="66"
            class="ap-border-1 ap-border-default ap-radius-24"
            @click="isCardChangeSheetOpen = true"
          >
            <icon-change width="24" height="24" />
          </v-btn>
          <span class="ap-txt-menu ap-text-primary">تعویض کارت</span>
        </div>
        <div class="d-flex flex-column align-center ga-3">
          <v-btn
            variant="text"
            width="66"
            height="66"
            class="ap-border-1 ap-border-default ap-radius-24"
            @click="isCardBlockingModalOpen = true"
          >
            <icon-withdraw width="28" height="28" />
          </v-btn>
          <span class="ap-txt-menu ap-text-primary">مسدود موقت</span>
        </div>
      </div>
    </div>
  </div>
  <card-blocking-modal
    v-model="isCardBlockingModalOpen"
    :closable="true"
    :loading="isLoading"
    @block="handleCardBlock"
  />
  <base-bottom-sheet v-model="isCardChangeSheetOpen">
    <v-btn height="" variant="text" class="d-flex justify-start w-100 my-4">
      <span class="ap-txt-title-4 ap-text-primary">درخواست کارت با شماره کارت فعلی</span>
    </v-btn>
    <v-divider />
    <v-btn height="" variant="text" class="d-flex justify-start w-100 mt-4 mb-5">
      <span class="ap-txt-title-4 ap-text-primary">درخواست کارت با شماره کارت جدید</span>
    </v-btn>
  </base-bottom-sheet>
  <base-bottom-sheet v-model="isCardSettingSheetOpen">
    <v-btn height="" variant="text" class="d-flex justify-start w-100 my-4">
      <span class="ap-txt-title-4 ap-text-primary">تغییر رمز اول کارت</span>
    </v-btn>
    <v-divider />
    <v-btn height="" variant="text" class="d-flex justify-start w-100 mt-4 mb-5">
      <span class="ap-txt-title-4 ap-text-primary">فراموشی رمز اول کارت</span>
    </v-btn>
  </base-bottom-sheet>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });

  const isCardBlockingModalOpen = ref<boolean>(false);
  const isCardChangeSheetOpen = ref<boolean>(false);
  const isCardSettingSheetOpen = ref<boolean>(false);
  const isCardBlocked = ref<boolean>(false);
  const isCardEnabled = ref<boolean>(true);
  const isLoading = ref<boolean>(false);

  const handleCardBlock = () => {
    console.log('block card');
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      isCardBlockingModalOpen.value = false;
    }, 2000);
  };
</script>

<style scoped></style>
