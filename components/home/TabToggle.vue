<template>
  <div class="ap-tab-toggle">
    <div class="toggle-indicator" :style="indicatorStyle" />
    <v-btn-toggle
      :model-value="modelValue"
      @update:modelValue="(val) => emit('update:modelValue', val)"
      mandatory
      class="toggle-btns"
    >
      <v-btn
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :ripple="false"
        variant="text"
      >
        <span class="ap-txt-tab">{{ item.label }}</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: String,
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const selectedIndex = computed(() =>
    props.items.findIndex((item) => item.value === props.modelValue)
  );

  const indicatorStyle = computed(() => {
    const width = 100 / props.items.length;
    const rtlOffset = (props.items.length - 1 - selectedIndex.value) * 100;
    return {
      width: `calc(${width}% - 1.3px)`,
      transform: `translateX(${rtlOffset}%)`,
    };
  });
</script>

<style scoped>
  .ap-tab-toggle {
    position: relative;
    background-color: var(--ap-tab-not-active);
    border-radius: 8px;
    height: 40px;
    padding: 2px;
    width: 100%;
    overflow: hidden;
  }

  .toggle-btns {
    display: flex;
    position: relative;
    z-index: 2;
    height: 100%;
  }

  .toggle-btns .v-btn {
    flex: 1;
    background-color: transparent !important;
    color: var(--ap-text-secondary);
    height: 100%;
    border-radius: 6px !important;
    z-index: 3;
    transition: color 0.3s ease;
  }

  .toggle-btns .v-btn--active {
    color: var(--ap-text-primary) !important;
  }

  .toggle-indicator {
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(100% - 4px);
    background-color: var(--ap-tab-active);
    border-radius: 6px;
    transition: transform 0.3s ease;
    z-index: 1;
    box-shadow:
      0 0 1px 0 rgba(20, 20, 20, 0.04),
      0 0 8px 0 rgba(20, 20, 20, 0.08);
  }
</style>
<style>
  .ap-tab-toggle .v-btn .v-btn__overlay {
    opacity: 0 !important;
  }
</style>

<!-- <div class="d-flex justify-center mb-7">
      <v-btn-toggle v-model="selectedType" mandatory class="custom-toggle">
        <div class="toggle-indicator" :style="indicatorStyle"></div>
        <v-btn value="all">
          <span class="ap-txt-tab">همه</span>
        </v-btn>
        <v-btn value="received">
          <span class="ap-txt-tab btn-text">دریافتی‌ها</span>
        </v-btn>
        <v-btn value="paid">
          <span class="ap-txt-tab btn-text">پرداختی‌ها</span>
        </v-btn>
      </v-btn-toggle>
    </div>

<style scoped>
  .custom-toggle {
    background-color: var(--ap-tab-not-active);
    border: none;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    height: 40px;
    padding: 2px;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .custom-toggle .v-btn {
    background-color: var(--ap-tab-not-active) !important;
    min-width: 110px;
    height: 100% !important;
    border-radius: 6px !important;
  }

  .custom-toggle .v-btn--active {
    background-color: var(--ap-tab-active) !important;
    box-shadow:
      0 0 1px 0 rgba(20, 20, 20, 0.04),
      0 0 8px 0 rgba(20, 20, 20, 0.08);
  }

  .custom-toggle .btn-text {
    color: var(--ap-text-secondary);
    text-align: center;
  }

  .custom-toggle .v-btn--active .btn-text {
    color: var(--ap-text-primary);
  }
</style>
<style>
  .custom-toggle .v-btn .v-btn__overlay {
    opacity: 0 !important;
  }
</style> -->
