<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="18" :viewBoxHeight="18">
    <path
      d="M4.05005 1.575H13.95C14.775 1.575 15.45 2.25 15.45 3.075V4.725C15.45 5.325 15.075 6.075 14.7 6.45L11.475 9.3C11.025 9.675 10.725 10.425 10.725 11.025V14.25C10.725 14.7 10.425 15.3 10.05 15.525L9.00005 16.2C8.02505 16.8 6.67505 16.125 6.67505 14.925V10.95C6.67505 10.425 6.37505 9.75 6.07505 9.375L3.22505 6.375C2.85005 6 2.55005 5.325 2.55005 4.875V3.15C2.55005 2.25 3.22505 1.575 4.05005 1.575Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.1975 1.575L4.5 7.5"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
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
