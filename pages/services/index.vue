<template>
  <Page-header title="امکانات" class="pt-3" :has-support="true" :shopping-cart="true" />
  <div class="ap-page-wrapper">
    <base-input v-model="searchValue" placeholder="جستجو امکانات, سرویس" class="mb-8">
      <template #prepend-icon>
        <icon-search width="18" height="18" stroke="var(--ap-text-secondary)" />
      </template>
    </base-input>
    <p class="ap-txt-title-4 ap-text-primary mb-4">خدمات پرداخت بین المللی</p>
    <div>
      <service-item />
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });

  const searchValue = ref<string>('');
</script>

<style scoped></style>
