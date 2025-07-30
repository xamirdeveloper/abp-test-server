<template>
  <page-header class="pt-3" title="اعلانات" :show-back="true" :has-support="true" />
  <div class="ap-page-wrapper">
    <base-select
      v-model="securityNotifsType"
      :items="notifTypes"
      label="اطلاع رسانی امنیتی"
      class="mb-4"
    />
    <base-select
      v-model="transactionsNotifsType"
      :items="notifTypes"
      label="اطلاع رسانی تراکنش ها"
      class="mb-4"
    />
    <base-select v-model="loginNotifsType" :items="notifTypes" label="اطلاع رسانی های ورود" />
  </div>
</template>

<script lang="ts" setup>
  const securityNotifsType = ref<number>(1);
  const transactionsNotifsType = ref<number>(2);
  const loginNotifsType = ref<number>(2);

  const notifTypes = ref([
    { value: 1, label: 'پیامک' },
    { value: 2, label: 'اعلان' },
    { value: 3, label: 'ایمیل' },
  ]);
</script>
