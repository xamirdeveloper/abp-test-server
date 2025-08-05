<template>
  <div
    :class="[
      'ap-page-header d-flex justify-space-between ap-mb-30',
      subtitle ? 'align-start' : 'align-center',
    ]"
  >
    <div class="me-3">
      <p
        :class="[
          isLight ? 'ap-text-btn' : 'ap-text-primary',
          subtitle ? 'mb-2' : 'mb-0',
          'ap-txt-title-3 ap-text-primary',
        ]"
      >
        {{ title }}
      </p>
      <span :class="[isLight ? 'ap-text-btn' : 'ap-text-secondary', 'ap-txt-subtitle']">
        {{ subtitle }}
      </span>
    </div>
    <div class="d-inline-flex">
      <v-btn
        v-if="hasSupport"
        icon
        :class="[
          'ap-border-1 ap-border-accent-primary opacity-100',
          hasAlert || showBack ? 'ap-me-10' : '',
        ]"
        width="40"
        height="40"
        variant="plain"
        @click="goSupport"
      >
        <icon-support width="22" height="22" />
      </v-btn>
      <slot name="prepend-back" />
      <v-btn
        v-if="showBack"
        icon
        :class="['ap-border-1 ap-border-accent-primary opacity-100', hasAlert ? 'ap-me-10' : '']"
        width="40"
        height="40"
        variant="plain"
        @click="goBack"
      >
        <icon-chevron-left
          width="20"
          height="20"
          :stroke="isLight ? 'var(--ap-border-accent-primary)' : 'var(--ap-text-primary)'"
        />
      </v-btn>
      <v-btn
        v-if="hasAlert"
        icon
        class="ap-border-1 ap-border-accent-primary opacity-100"
        width="40"
        height="40"
        variant="plain"
      >
        <v-badge color="error"></v-badge>
        <icon-alert width="20" height="20" />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface PageHeaderProps {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    hasSupport?: boolean;
    isLight?: boolean;
    hasAlert?: boolean;
  }

  const props = defineProps<PageHeaderProps>();

  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const goSupport = () => {
    router.push({ name: 'support' });
  };
</script>

<style scoped>
  .ap-me-10 {
    margin-inline-end: 10px;
  }

  .ap-mb-30 {
    margin-bottom: 30px;
  }
</style>
