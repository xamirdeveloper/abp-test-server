<template>
  <page-header
    class="pt-3"
    title="محل سکونت"
    subtitle="لطفا کد پستی خود را وارد کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input label="کد پستی ۱۰ رقمی" type="number" class="mb-4" />
    <div class="mb-4">
      <label class="label ap-txt-label ap-text-primary d-block">استان</label>
      <base-select v-if="cond" :items="test" v-model="test1" />
      <v-skeleton-loader
        v-else
        class="ap-radius-8 ma-3"
        width="119"
        height="24px"
      ></v-skeleton-loader>
    </div>
    <div class="mb-4">
      <label class="label ap-txt-label ap-text-primary d-block">شهر</label>
      <base-select v-if="cond" :items="test" v-model="test1" />
      <v-skeleton-loader
        v-else
        class="ap-radius-8 ma-3"
        width="119"
        height="24px"
      ></v-skeleton-loader>
    </div>
    <div class="mb-4">
      <label class="label ap-txt-label ap-text-primary d-block">نشانی پستی</label>
      <textarea v-if="cond" />
      <v-skeleton-loader
        v-else
        class="ap-radius-8 ma-3"
        width="209"
        height="24px"
      ></v-skeleton-loader>
    </div>
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const test = ref([
    { value: 1, label: 'تهران' },
    { value: 2, label: 'تبریز' },
    { value: 3, label: 'شیراز' },
    { value: 4, label: 'اضفهان' },
    { value: 5, label: 'خرم' },
  ]);

  const test1 = ref();
  const cond = ref(true);
</script>

<style scoped>
  .label {
    margin-bottom: 6px;
  }
</style>
