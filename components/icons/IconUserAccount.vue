<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="20" :viewBoxHeight="20">
    <path
      d="M10 9.99999C12.3012 9.99999 14.1667 8.13451 14.1667 5.83332C14.1667 3.53214 12.3012 1.66666 10 1.66666C7.69882 1.66666 5.83334 3.53214 5.83334 5.83332C5.83334 8.13451 7.69882 9.99999 10 9.99999Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.0083 13.1167L13.0583 16.0667C12.9416 16.1834 12.8333 16.4 12.8083 16.5584L12.65 17.6833C12.5916 18.0917 12.875 18.375 13.2833 18.3167L14.4083 18.1583C14.5666 18.1333 14.7917 18.025 14.9 17.9084L17.85 14.9584C18.3583 14.45 18.6 13.8583 17.85 13.1083C17.1083 12.3667 16.5167 12.6083 16.0083 13.1167Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.5833 13.5417C15.8333 14.4417 16.5333 15.1416 17.4333 15.3916"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.84164 18.3333C2.84164 15.1083 6.05 12.5 10 12.5C10.8667 12.5 11.7 12.625 12.475 12.8583"
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
