<template>
  <icon-base v-bind="$attrs">
    <g transform="translate(0,1)">
      <path
        d="M5 12L10 17L20 7"
        :stroke="stroke"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
