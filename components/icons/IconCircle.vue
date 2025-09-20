<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="24" :viewBoxHeight="24">
    <path
      d="M12 20
         C16.4183 20 20 16.4183 20 12
         C20 7.5817 16.4183 4 12 4
         C7.5817 4 4 7.5817 4 12
         C4 16.4183 7.5817 20 12 20Z"
      :stroke="stroke"
      fill="none"
      stroke-width="1"
    />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
<style scoped></style>
