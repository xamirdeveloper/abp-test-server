<template>
  <base-input
    v-bind="props"
    :type="isVisible ? 'text' : 'password'"
    @update:modelValue="(val) => emit('update:modelValue', String(val))"
  >
    <template #append-icon v-if="hasIcon">
      <v-btn
        variant="text"
        icon
        density="compact"
        @click="toggleVisibility"
        class="d-flex align-center"
      >
        <icon-close-eye v-if="!isVisible" width="20" height="20" />
        <icon-open-eye1 v-else width="20" height="20" />
      </v-btn>
    </template>
  </base-input>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: string;
    label?: string;
    placeholder?: string;
    error?: string;
    id?: string;
    maxlength?: number;
    hasIcon?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    hasIcon: true,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const isVisible = ref(false);
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
  };
</script>
