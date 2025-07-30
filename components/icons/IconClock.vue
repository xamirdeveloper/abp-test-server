<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="49" :viewBoxHeight="49">
    <path
      d="M24.5 4.5C13.48 4.5 4.5 13.48 4.5 24.5C4.5 35.52 13.48 44.5 24.5 44.5C35.52 44.5 44.5 35.52 44.5 24.5C44.5 13.48 35.52 4.5 24.5 4.5ZM33.2 31.64C32.92 32.12 32.42 32.38 31.9 32.38C31.64 32.38 31.38 32.32 31.14 32.16L24.94 28.46C23.4 27.54 22.26 25.52 22.26 23.74V15.54C22.26 14.72 22.94 14.04 23.76 14.04C24.58 14.04 25.26 14.72 25.26 15.54V23.74C25.26 24.46 25.86 25.52 26.48 25.88L32.68 29.58C33.4 30 33.64 30.92 33.2 31.64Z"
      fill="white"
    />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
