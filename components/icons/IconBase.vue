<template>
  <component
    :is="tag"
    :width="width"
    :height="height"
    :fill="fill"
    :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
  interface IconProps {
    tag?: string;
    width?: string | number;
    height?: string | number;
    fill?: string;
    viewBoxWidth?: number;
    viewBoxHeight?: number;
  }

  const props = withDefaults(defineProps<IconProps>(), {
    tag: 'svg',
    width: 24,
    height: 24,
    fill: 'none',
    viewBoxWidth: 24,
    viewBoxHeight: 24,
  });
</script>
