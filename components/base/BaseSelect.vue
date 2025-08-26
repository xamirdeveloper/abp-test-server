<template>
  <div class="ap-select w-100">
    <base-input
      v-if="!hideInput"
      :model-value="selectedLabel"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :readonly="true"
      :disabled="disabled"
      :loading="loading"
      @click="toggleSheet(true)"
    >
      <template #append-icon>
        <icon-chevron-down
          stroke="#666D80"
          width="12"
          height="8"
          :class="sheetVisibleValue ? 'rotate-icon' : ''"
        />
      </template>
    </base-input>
    <v-bottom-sheet v-model="sheetVisibleValue">
      <v-card class="ap-select__list-wrapper">
        <p class="ap-txt-label ap-text-primary ap-select__title mb-2 mt-8">{{ title }}</p>
        <v-list class="ap-select__list">
          <v-list-item
            v-for="item in items"
            :key="item.value"
            :class="['ap-select__item', item.value === modelValue ? 'ap-select__active-item' : '']"
            @click="selectItem(item)"
          >
            <div class="d-flex justify-space-between align-center">
              <div>
                <div :class="['d-flex align-center', item.subtitle ? 'mb-3' : '']">
                  <span
                    :class="[
                      'ap-txt-title-5',
                      item.value === modelValue ? 'ap-text-primary' : 'ap-text-secondary',
                      item.caption ? 'me-3' : '',
                    ]"
                  >
                    {{ item.label }}
                  </span>
                  <span
                    v-if="item.caption"
                    :class="[
                      'ap-txt-caption',
                      item.value === modelValue ? 'ap-text-primary' : 'ap-text-secondary',
                    ]"
                  >
                    {{ item.caption }}
                  </span>
                </div>
                <span v-if="item.subtitle" class="ap-txt-caption ap-text-tertiary">
                  {{ item.subtitle }}
                </span>
              </div>
              <div v-show="item.value === modelValue" class="ap-select__check-icon">
                <icon-check stroke="var(--ap-bg-surface)" width="16" height="16" />
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup lang="ts">
  export interface SelectItems {
    value: string | number;
    label: string;
    caption?: string;
    subtitle?: string;
  }

  interface SelectProps {
    modelValue: string | number;
    items: SelectItems[];
    label?: string;
    placeholder?: string;
    error?: string;
    title?: string;
    sheetVisible?: boolean;
    hideInput?: boolean;
    disabled?: boolean;
    loading?: boolean;
    clearable?: boolean;
  }

  const props = withDefaults(defineProps<SelectProps>(), {
    label: '',
    placeholder: '',
    error: '',
    title: 'انتخاب کنید',
    sheetVisible: undefined,
    hideInput: false,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
    (e: 'update:sheetVisible', value: boolean): void;
  }>();

  const internalSheet = ref(false);

  const sheetVisibleValue = computed<boolean>({
    get: () => (props.sheetVisible !== undefined ? props.sheetVisible : internalSheet.value),
    set: (val: boolean) => {
      if (props.sheetVisible !== undefined) {
        emit('update:sheetVisible', val);
      } else {
        internalSheet.value = val;
      }
    },
  });

  const toggleSheet = (val: boolean) => {
    sheetVisibleValue.value = val;
  };

  const selectedLabel = computed(() => {
    return props.items.find((i) => i.value === props.modelValue)?.label || '';
  });

  const selectItem = (item: SelectItems) => {
    emit('update:modelValue', item.value);
    toggleSheet(false);
  };
</script>
<style scoped lang="scss">
  @use '@/assets/design-system/select.scss' as *;
</style>
