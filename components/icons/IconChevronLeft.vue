<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="20" :viewBoxHeight="20">
    <path
      d="M12.5 15L8.08926 10.5893C7.76382 10.2638 7.76382 9.73618 8.08926 9.41074L12.5 5"
      :stroke="stroke"
      stroke-width="1.66667"
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
