<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="507" :viewBoxHeight="408">
    <path
      d="M222.8 2.6C176.4 8.4 132.2 26.1 94.4002 53.7C57.5002 80.7 21.0002 115.1 6.80017 159.8C-6.79983 202.4 0.200167 251.4 26.0002 288.1C52.4002 325.8 91.8002 357.7 132.7 378.4C217.2 421.2 317 416.1 396.9 365.3C439.9 338 483.8 298.5 499.8 248.8C515.7 199.4 502.8 146.4 470.2 107.1C408.6 36.1 318.2 -9.3 222.8 2.6ZM256 86C320.3 86 372.4 138.1 372.4 202.4C372.4 266.7 320.2 318.7 256 318.7C191.7 318.7 139.6 266.6 139.6 202.3C139.6 138 191.7 86 256 86Z"
      :fill="stroke"
    />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
