<template>
  <div class="ap-select">
    <base-input
      :model-value="selectedLabel"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      readonly
      @click="showSheet = true"
    >
      <template #append-icon>
        <icon-chevron-down stroke="#666D80" width="12" height="8" />
      </template>
    </base-input>

    <v-bottom-sheet v-model="showSheet">
      <v-list class="ap-radius-top-24 pt-5 px-3">
        <v-list-item v-for="item in items" :key="item.value" @click="selectItem(item)">
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script setup lang="ts">
  interface SelectItems {
    value: string | number;
    label: string;
  }

  interface SelectProps {
    modelValue: string | number;
    items: SelectItems[];
    label?: string;
    placeholder?: string;
    error?: string;
  }

  const props = withDefaults(defineProps<SelectProps>(), {
    label: '',
    placeholder: '',
    error: '',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const showSheet = ref<boolean>(false);

  const selectedLabel = computed(() => {
    return props.items.find((i) => i.value === props.modelValue)?.label || '';
  });

  const selectItem = (item: SelectItems) => {
    emit('update:modelValue', item.value);
    showSheet.value = false;
  };
</script>

<style scoped lang="scss">
  .ap-select {
    width: 100%;
  }
</style>
