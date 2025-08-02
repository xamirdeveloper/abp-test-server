<template>
  <div class="d-flex flex-column justify-center align-start">
    <p class="ap-txt-body-2 ap-text-secondary">موجودی فعلی</p>
    <div class="d-flex align-center">
      <span class="ap-txt-title-1 ap-text-primary me-2 current">{{ currentInventory }}</span>
      <span class="me-2">ریال</span>
      <v-btn
        variant="text"
        icon
        density="compact"
        @click="toggleVisibility"
        class="d-flex align-center"
      >
        <icon-close-eye v-if="isVisible" width="20" height="20" />
        <icon-open-eye1 v-else width="20" height="20" />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const isVisible = ref<boolean>(true);
  const currentInventory = ref<string>('۲۳,۹۹۹,۰۰۰');
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
    isVisible.value ? (currentInventory.value = '۲۳,۹۹۹,۰۰۰') : (currentInventory.value = '*******');
  };
</script>

<style scoped>
  .current {
    max-width: 160px;
    width: 110px;
  }
</style>
