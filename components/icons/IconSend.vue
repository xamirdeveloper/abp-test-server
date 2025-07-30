<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="25" :viewBoxHeight="24">
    <path
      d="M7.89993 6.31997L16.3899 3.48997C20.1999 2.21997 22.2699 4.29997 21.0099 8.10997L18.1799 16.6C16.2799 22.31 13.1599 22.31 11.2599 16.6L10.4199 14.08L7.89993 13.24C2.18993 11.34 2.18993 8.22997 7.89993 6.31997Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.6101 13.65L14.1901 10.06"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
