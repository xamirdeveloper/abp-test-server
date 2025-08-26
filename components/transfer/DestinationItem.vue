<template>
  <div class="destination-swipe-wrapper">
    <!-- اکشن‌ها -->
    <div class="destination-actions">
      <button class="action-btn pin" @click.stop="emit('pin', item.id)">📌</button>
      <button class="action-btn delete" @click.stop="emit('delete', item.id)">🗑</button>
    </div>

    <!-- کارت اصلی -->
    <div
      ref="cardRef"
      class="d-block ap-bg-surface ap-radius-12 pa-3 w-100 destination-item"
      :class="{ 'destination-item__selected-item': isSelected }"
      @click="emit('select', item.id)"
    >
      <div class="d-flex justify-start align-center w-100 destination-item__content">
        <div class="me-2 d-flex align-center position-relative ap-radius-full">
          <img
            :src="item.avatarUrl || defaultAvatar"
            alt="avatar"
            width="50"
            height="50"
            class="ap-radius-full"
          />
          <div class="destination-item__bank-logo d-flex justify-center align-center">
            <img :src="item.bankLogo || defaultBankLogo" alt="bank logo" width="19" height="19" />
          </div>
        </div>
        <div class="text-start flex-grow-1">
          <p class="ap-txt-body-1 ap-text-primary mb-1">{{ item.name }}</p>
          <span class="ap-txt-body-2 ap-text-secondary">
            <template v-if="item.cardNumber">شماره کارت: {{ item.cardNumber }}</template>
            <template v-else-if="item.iban">شبا: {{ item.iban }}</template>
          </span>
        </div>
        <icon-pin v-if="item.isFavorite" width="20" height="20" stroke="var(--ap-text-secondary)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { useDrag } from '@vueuse/gesture';

  export interface RecipientItem {
    id: string | number;
    name: string;
    avatarUrl?: string;
    bankLogo?: string;
    cardNumber?: string;
    iban?: string;
    isFavorite?: boolean;
  }

  const props = defineProps<{ item: RecipientItem; isSelected?: boolean }>();
  const emit = defineEmits<{
    (e: 'select', id: string | number): void;
    (e: 'delete', id: string | number): void;
    (e: 'pin', id: string | number): void;
  }>();

  // Defaults
  const defaultAvatar = '/images/male-avatar.webp';
  const defaultBankLogo = '/images/saman.svg';

  // Refs for motion
  const cardRef = ref<HTMLElement | null>(null);
  const x = ref(0);
  const targetX = ref(0);
  const isOpen = ref(false);
  const actionWidth = 140;

  // Smooth animation loop
  watchEffect(() => {
    requestAnimationFrame(() => {
      if (cardRef.value) {
        // simple easing motion
        x.value += (targetX.value - x.value) * 0.2;
        cardRef.value.style.transform = `translateX(${x.value}px)`;
      }
    });
  });

  // Drag gesture
  useDrag(
    ({ movement: [mx], last }) => {
      if (!last) {
        x.value = isOpen.value ? -actionWidth + mx : mx;
        if (x.value > 0) x.value = 0;
      } else {
        if (x.value < -actionWidth / 2) {
          targetX.value = -actionWidth;
          isOpen.value = true;
        } else {
          targetX.value = 0;
          isOpen.value = false;
        }
      }
    },
    {
      target: cardRef,
      axis: 'x',
      filterTaps: true,
    }
  );
</script>

<style scoped lang="scss">
  .destination-swipe-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  .destination-actions {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
  }

  .action-btn {
    width: 70px;
    height: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
  .action-btn.pin {
    background: #3f51b5;
  }
  .action-btn.delete {
    background: #f44336;
  }

  .destination-item {
    height: fit-content;
    border: 1px solid transparent;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    border-radius: 12px;
    transition: box-shadow 0.2s ease;

    &__selected-item {
      border: 1px solid var(--ap-btn-primary);
    }

    &__content {
      height: 52px;
    }

    &__bank-logo {
      background-color: var(--ap-bg-surface);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: -5px;
      left: 0;

      img {
        object-fit: cover;
      }
    }
  }
</style>
