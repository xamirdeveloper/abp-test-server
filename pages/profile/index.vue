<template>
  <page-header class="pt-3" title="پروفایل" :has-alert="true" :has-support="true" />
  <div class="ap-page-wrapper profile">
    <div class="d-flex flex-column justify-center align-center mb-8">
      <div class="profile__avatar-wrap mb-3">
        <v-avatar color="#FFD7FC" size="100" image="">
          <span class="text-h5">AS</span>
        </v-avatar>
        <v-btn icon width="32" height="32" class="ap-btn-primary profile__file-btn">
          <icon-gallery width="16" height="16" stroke="var(--ap-bg-surface)" />
        </v-btn>
      </div>
      <p class="ap-txt-title-2 ap-text-primary mb-1">امیرعلی سالاری</p>
      <span class="ap-txt-subtitle ap-text-secondary">09121234650</span>
    </div>
    <div class="d-flex flex-column justify-center">
      <profile-action-item
        v-for="(i, index) in 7"
        :key="index"
        :class="[index != 6 ? 'mb-4' : 'mb-0']"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: 'main' });
</script>

<style scoped lang="scss">
  .profile {
    &__avatar-wrap {
      width: fit-content;
      height: fit-content;
      position: relative;
    }

    &__file-btn {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
</style>
