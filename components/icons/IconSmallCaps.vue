<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="20" :viewBoxHeight="20">
      <path
        d="M1.65833 4.94166V3.68333C1.65833 2.83333 2.34999 2.14166 3.19999 2.14166H13.9667C14.8167 2.14166 15.5083 2.83333 15.5083 3.68333V4.94166"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.58334 15.0833V2.76666"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.75 15.0833H10.4"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.4 8.61664H17.2417C17.85 8.61664 18.3417 9.1083 18.3417 9.71664V10.3833"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4 17.8583V9.05835"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6167 17.8583H15.1833"
        :stroke="stroke"
        stroke-width="1.5"
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
