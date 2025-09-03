<template>
  <v-card variant="text" :class="[statusClass, 'item-card']" @click="handleClick">
    <v-btn
      variant="text"
      width="66"
      height="66"
      class="ap-radius-24"
      :style="{ backgroundColor: bgColor }"
      :disabled="status === 'disabled'"
    >
      <component :is="icon" width="24" height="24" />
    </v-btn>
    <p class="item-caption">{{ label }}</p>
    <span v-if="status === 'soon'" class="soon-badge">به زودی</span>
  </v-card>
</template>

<script setup lang="ts">
  interface Props {
    label: string;
    icon: any;
    status: 'active' | 'soon' | 'disabled';
    bgColor: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'click'): void;
  }>();

  const statusClass = computed(() => {
    switch (props.status) {
      case 'soon':
        return 'soon';
      case 'disabled':
        return 'disabled';
      default:
        return '';
    }
  });

  const handleClick = () => {
    if (props.status === 'active') {
      emit('click');
    }
  };
</script>

<style scoped>
  .item-card {
    display: flex;
    min-width: 90px;
    width: 90px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: visible;
  }

  .item-caption {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
  }

  .soon-badge {
    border-radius: 16px;
    position: absolute;
    padding: 2px 10px;
    top: 0;
    right: -14px;
    font-size: 10px;
    background: #ccddff;
    color: #348dff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.14px;
  }

  .soon {
    pointer-events: none;
  }

  .disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
