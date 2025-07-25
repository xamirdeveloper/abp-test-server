<template>
  <v-btn height="40" class="d-flex align-center justify-space-between px-0">
    <div class="d-flex align-center">
      <div
        class="ap-border-1 ap-border-accent-primary ap-radius-full icon-wrapper me-3"
        width="40"
        height="40"
      >
        <icon-support width="20" height="20" />
      </div>
      <span class="ap-txt-subtitle ap-text-primary">حساب کاربری</span>
    </div>
    <icon-chevron-left width="24" height="24" />
  </v-btn>
</template>

<script lang="ts" setup></script>

<style scoped>
  .icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
