<template>
  <page-header title="کارت" :has-support="true" class="pt-3 mb-3" />
  <div class="ap-page-wrapper mb-5">
    <div class="d-flex flex-column align-center">
      <card class="mb-6" :is-card-enabled="true"/>
      <div class="d-flex align-center justify-center ga-5">
        <div class="d-flex flex-column align-center ga-3">
          <v-btn
            variant="text"
            width="66"
            height="66"
            class="ap-border-1 ap-border-default ap-radius-24"
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
          >
            <icon-withdraw width="28" height="28" />
          </v-btn>
          <span class="ap-txt-menu ap-text-primary">مسدود موقت</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });
</script>

<style scoped></style>
