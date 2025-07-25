<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="220" :viewBoxHeight="129">
    <circle cx="205.5" cy="10.5" r="9.5" :fill="stroke" />
    <circle cx="7" cy="38" r="6" :fill="stroke" fill-opacity="0.5" />
    <circle cx="19" cy="96" r="6" :fill="stroke" fill-opacity="0.4" />
    <circle cx="195" cy="124" r="4" :fill="stroke" />
    <circle cx="195" cy="54" r="4" :fill="stroke" fill-opacity="0.8" />
    <circle cx="215" cy="84" r="4" :fill="stroke" fill-opacity="0.6" />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
