<template>
  <page-header
    class="pt-3"
    title="تلفن همراه"
    subtitle="لطفا تلفن همراه خود را وارد کنید."
    :show-back="true"
    :has-support="true"
  />
  <div class="ap-page-wrapper">
    <base-input label="تلفن همراه" type="number" class="mb-4" />
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup></script>
