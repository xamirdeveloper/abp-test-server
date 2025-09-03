<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="25" :viewBoxHeight="24">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.5 3C2.39543 3 1.5 3.89543 1.5 5V11C1.5 12.1046 2.39543 13 3.5 13C4.05228 13 4.5 12.5523 4.5 12V9C4.5 7.89543 5.39543 7 6.5 7H18.5C19.6046 7 20.5 7.89543 20.5 9V12C20.5 12.5523 20.9477 13 21.5 13C22.6046 13 23.5 12.1046 23.5 11V5C23.5 3.89543 22.6046 3 21.5 3H3.5Z"
      :fill="stroke"
    />
    <path
      d="M12 9C12.2761 9 12.5 9.22386 12.5 9.5V20.5C12.5 20.7761 12.2761 21 12 21H9.5C7.84315 21 6.5 19.6569 6.5 18V10C6.5 9.44772 6.94772 9 7.5 9H12ZM17.5 9C18.0523 9 18.5 9.44772 18.5 10V18C18.5 19.6569 17.1569 21 15.5 21H15C14.7239 21 14.5 20.7761 14.5 20.5V9.5C14.5 9.22386 14.7239 9 15 9H17.5Z"
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
