<template>
  <page-header class="pt-3" title="پروفایل" :has-alert="true" :has-support="true" />
  <div class="ap-page-wrapper">
    <profile-avatar title="امیرعلی سالاری" sub-title="0992 571 1758" />
    <div class="d-flex flex-column justify-center mt-8">
      <profile-action-item
        v-for="(item, index) in items"
        :key="item.title"
        :title="item.title"
        :to="item.to"
        :icon="item.icon"
        :icon-props="item.iconProps"
        :chevron="item.chevron ?? true"
        @click="item.onClick?.()"
        class="mb-4"
      />
      <div class="d-flex justify-space-between align-center switch-wrapper px-0 w-100 mb-4">
        <div class="d-flex align-center">
          <div class="ap-border-1 ap-border-accent-primary ap-radius-full icon-wrapper me-3">
            <icon-brush width="20" height="20" />
          </div>
          <span class="ap-txt-subtitle ap-text-primary title">حالت روز</span>
        </div>
        <v-switch
          v-model="isLight"
          color="var(--ap-btn-primary)"
          hide-details
          inset
          density="compact"
        />
      </div>
      <profile-action-item title="خروج" :error="true" @click="logout">
        <template #icon>
          <icon-error width="20" height="20" stroke="var(--ap-btn-error)" />
        </template>
      </profile-action-item>
    </div>
  </div>
  <app-version class="app-version" />
  <base-bottom-sheet v-model="isSettingsModalOpen">
    <v-btn
      variant="text"
      height="40"
      class="d-flex justify-start w-100 pa-1 mb-4"
      @click="router.push('profile/change-password')"
    >
      <icon-lock width="24" height="24" class="me-2" />
      <span class="ap-txt-title-4">تغییر رمز عبور</span>
    </v-btn>
    <v-divider />
    <v-btn
      variant="text"
      height="40"
      class="d-flex justify-start w-100 pa-1 mt-4 mb-5"
      @click="router.push('profile/change-username')"
    >
      <icon-user-account width="24" height="24" class="me-2" />
      <span class="ap-txt-title-4">تغییر نام کاربری</span>
    </v-btn>
  </base-bottom-sheet>
  <base-select
    v-model="selectedLang"
    v-model:sheetVisible="isLanguagesModalOpen"
    :items="languageItem"
    :hide-input="true"
  />
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });

  import { useThemeStore } from '@/stores/theme';
  import { useAuthStore } from '@/stores/auth';
  import IconAlert from '~/components/icons/IconAlert.vue';
  import IconSetting from '~/components/icons/IconSetting.vue';
  import IconSmallCaps from '~/components/icons/IconSmallCaps.vue';
  import IconUserAccount from '~/components/icons/IconUserAccount.vue';

  interface ProfileListItem {
    title: string;
    to?: string;
    icon?: Component;
    iconProps?: Record<string, any>;
    chevron?: boolean;
    onClick?: () => void;
  }

  const router = useRouter();
  const themeStore = useThemeStore();
  const authStore = useAuthStore();

  const isSettingsModalOpen = ref<boolean>(false);
  const isLanguagesModalOpen = ref<boolean>(false);
  const selectedLang = ref<string>('fa');

  const isLight = computed({
    get: () => themeStore.theme === 'light',
    set: (val) => {
      themeStore.setTheme(val ? 'light' : 'dark');
    },
  });

  const items: ProfileListItem[] = [
    {
      title: 'حساب کاربری',
      icon: IconUserAccount,
      to: '/profile/account',
    },
    {
      title: 'تنظیمات',
      icon: IconSetting,
      onClick: () => openSettingsModal(),
    },
    {
      title: 'اعلانات',
      icon: IconAlert,
      to: '/profile/notifications',
    },
    {
      title: 'زبان',
      icon: IconSmallCaps,
      onClick: () => openLanguageModal(),
    },
    {
      title: 'دعوت از دوستان',
      icon: IconAlert,
      to: '/profile/referral-code',
    },
  ];

  const languageItem = ref([
    { value: 'fa', label: 'فارسی' },
    { value: 'en', label: 'انگلیسی' },
  ]);

  function openSettingsModal() {
    isSettingsModalOpen.value = true;
  }

  function openLanguageModal() {
    isLanguagesModalOpen.value = true;
  }

  function logout() {
    authStore.logout();
  }
</script>

<style scoped lang="scss">
  .ap-page-wrapper {
    margin-bottom: 70px;
  }

  .app-version {
    bottom: 80px;
    position: absolute;
  }

  .switch-wrapper {
    height: 40px;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
