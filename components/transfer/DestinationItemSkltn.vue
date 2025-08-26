<template>
  <v-card variant="text" class="d-block ap-bg-surface ap-radius-12 pa-3 w-100 destination-item">
    <div class="d-flex justify-start align-center w-100 destination-item__content">
      <div class="me-2 d-flex align-center position-relative">
        <v-skeleton-loader type="avatar" width="52" height="52" class="ma-0"></v-skeleton-loader>
        <div class="destination-item__bank-logo d-flex justify-center align-center"></div>
      </div>
      <div class="text-start flex-grow-1">
        <v-skeleton-loader
          width="119"
          height="24"
          class="ma-0 ap-radius-8 mb-2"
        ></v-skeleton-loader>
        <v-skeleton-loader width="209" height="24" class="ma-0 ap-radius-8"></v-skeleton-loader>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
  .destination-item {
    height: fit-content;
    border: 1px solid transparent;
    box-sizing: border-box;

    &__content {
      height: 52px;
    }

    &__bank-logo {
      background-color: var(--ap-bg-surface);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: -5px;
      left: 0;
    }
  }
</style>
<style>
  .destination-item .v-skeleton-loader__avatar {
    margin: 0 !important;
  }
</style>
