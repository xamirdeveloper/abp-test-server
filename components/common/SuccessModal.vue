<template>
  <base-modal
    v-model="model"
    :closable="closable"
    :actionText="actionText"
    @action="emit('action')"
  >
    <template #default>
      <div class="d-flex flex-column justify-center align-center mt-11">
        <div class="position-relative mb-6">
          <icon-circles width="220" height="129" stroke="var(--ap-success-300)" />
          <div class="icon-wrapper d-flex justify-center align-center">
            <icon-smile width="46" height="40" stroke="var(--ap-text-btn)" />
          </div>
        </div>
        <P class="ap-text-primary ap-txt-title-3 mb-2">{{ title }}</P>
        <span v-if="description" class="ap-txt-body-1 ap-text-secondary text-center px-5">
          {{ description }}
        </span>
      </div>
    </template>
  </base-modal>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: boolean;
    title?: string;
    description?: string;
    closable?: boolean;
    actionText?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'اطلاعات شما با موفقیت ثبت شد.',
    description: '',
    closable: false,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'action'): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
</script>

<style scoped>
  .icon-wrapper {
    width: 120px;
    height: 120px;
    background-color: var(--ap-success-300);
    position: absolute;
    top: 0;
    right: 50px;
    left: 50px;
    border-radius: 50%;
  }
</style>
