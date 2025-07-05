<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="12" :viewBoxHeight="8">
    <path d="M11 1.5L5.78261 6.5L1 1.5" :stroke="stroke" stroke-width="2" stroke-linecap="round" />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
