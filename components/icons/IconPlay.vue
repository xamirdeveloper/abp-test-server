<template>
  <icon-base v-bind="$attrs">
      <path :fill="stroke" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
