<template>
  <icon-base v-bind="$attrs" :viewBoxWidth="25" :viewBoxHeight="24">
    <path
      opacity="0.4"
      d="M20.47 10V18C20.47 21 19.47 22 16.47 22H8.46997C5.46997 22 4.46997 21 4.46997 18V10H20.47Z"
      :fill="stroke"
    />
    <path
      d="M22 7V8C22 9.1 21.47 10 20 10H5C3.47 10 3 9.1 3 8V7C3 5.9 3.47 5 5 5H20C21.47 5 22 5.9 22 7Z"
      :fill="stroke"
    />
    <path
      opacity="0.4"
      d="M12.14 4.99994H6.62003C6.28003 4.62994 6.29003 4.05994 6.65003 3.69994L8.07003 2.27994C8.44003 1.90994 9.05003 1.90994 9.42003 2.27994L12.14 4.99994Z"
      :fill="stroke"
    />
    <path
      opacity="0.4"
      d="M18.3701 4.99994H12.8501L15.5701 2.27994C15.9401 1.90994 16.5501 1.90994 16.9201 2.27994L18.3401 3.69994C18.7001 4.05994 18.7101 4.62994 18.3701 4.99994Z"
      :fill="stroke"
    />
    <path
      opacity="0.6"
      d="M9.43994 10V15.14C9.43994 15.94 10.3199 16.41 10.9899 15.98L11.9299 15.36C12.2699 15.14 12.6999 15.14 13.0299 15.36L13.9199 15.96C14.5799 16.4 15.4699 15.93 15.4699 15.13V10H9.43994Z"
      :fill="stroke"
    />
  </icon-base>
</template>
<script lang="ts" setup>
  const props = withDefaults(defineProps<{ stroke?: string }>(), {
    stroke: 'var(--ap-text-primary)',
  });
</script>
