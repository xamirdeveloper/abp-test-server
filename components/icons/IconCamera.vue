<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="32" :viewBoxHeight="33">
    <path
      d="M9.01335 29.8334H22.9867C26.6667 29.8334 28.1334 27.58 28.3067 24.8334L29 13.82C29.1867 10.94 26.8934 8.50002 24 8.50002C23.1867 8.50002 22.44 8.03335 22.0667 7.31335L21.1067 5.38002C20.4934 4.16669 18.8934 3.16669 17.5334 3.16669H14.48C13.1067 3.16669 11.5067 4.16669 10.8934 5.38002L9.93335 7.31335C9.56002 8.03335 8.81335 8.50002 8.00002 8.50002C5.10669 8.50002 2.81335 10.94 3.00002 13.82L3.69335 24.8334C3.85335 27.58 5.33335 29.8334 9.01335 29.8334Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 11.1667H18"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 24.5C18.3867 24.5 20.3334 22.5533 20.3334 20.1666C20.3334 17.78 18.3867 15.8333 16 15.8333C13.6134 15.8333 11.6667 17.78 11.6667 20.1666C11.6667 22.5533 13.6134 24.5 16 24.5Z"
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
