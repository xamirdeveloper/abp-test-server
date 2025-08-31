<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="24" :viewBoxHeight="24">
      <path
        d="M19 7V10.5C19 12.433 17.933 13.5 16 13.5H10.2C10.35 13.375 10.467 13.233 10.56 13.072C10.764 12.731 10.875 12.366 10.875 12C10.875 10.619 9.756 9.5 8.375 9.5C7.458 9.5 6.643 9.909 6 10.62V7C6 5.47 6.99 4.42 8.6 4.21C8.74 4.19 8.884 4.18 9.041 4.18H16C16.14 4.18 16.28 4.186 16.41 4.206C18.15 4.41 19 5.48 19 7Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.75 7.5H16.5C15.9 7.5 15.5 7.9 15.5 8.5C15.5 9.1 15.9 9.5 16.5 9.5H18.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 12C11 12.6 10.8 13.2 10.5 13.7C10.36 13.94 10.2 14.13 10.02 14.28C9.62 14.65 9.1 14.875 8.5 14.875C7.6 14.875 6.83 14.4 6.45 13.7C6.15 13.2 6 12.6 6 12C6 11.4 6.23 10.9 6.62 10.46C7.06 9.94 7.72 9.625 8.38 9.625C9.76 9.625 11 10.86 11 12Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 12.75L8 11.75M9 11.75L8 12.75"
        stroke="currentColor"
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
