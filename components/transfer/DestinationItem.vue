<template>
  <div class="destination-swipe-wrapper">
    <div class="destination-actions" :style="{ width: actionWidth + 'px' }">
      <button class="action-btn pin" @click.stop="emit('pin', item.id)">📌</button>
      <button class="action-btn delete" @click.stop="emit('delete', item.id)">🗑</button>
    </div>
    <div
      ref="cardRef"
      :style="{ transform: `translateX(${x}px)` }"
      :class="[
        'd-block ap-bg-surface ap-radius-12 px-2 py-3 w-100 destination-item',
        isSelected ? 'destination-item__selected-item' : '',
      ]"
      @click="emit('select', item.id)"
    >
      <div class="d-flex justify-start align-center w-100 destination-item__content">
        <div class="me-2 d-flex align-center position-relative ap-radius-full">
          <img
            src="@/assets/images/male-avatar.webp"
            alt="avatar"
            width="50"
            height="50"
            class="ap-radius-full"
          />
          <div class="destination-item__bank-logo d-flex justify-center align-center">
            <img src="@/assets/images/saman.svg" alt="bank logo" width="19" height="19" />
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
  import { ref } from 'vue';
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

  const cardRef = ref<HTMLElement | null>(null);
  const x = ref(0);
  const isOpen = ref(false);
  const actionWidth = 140;

  useDrag(
    ({ movement: [mx], last }) => {
      if (!last) {
        x.value = isOpen.value ? -actionWidth + mx : mx;
        if (x.value > 0) x.value = 0;
      } else {
        if (Math.abs(x.value) > actionWidth / 2) {
          x.value = -actionWidth;
          isOpen.value = true;
        } else {
          x.value = 0;
          isOpen.value = false;
        }
      }
    },
    { target: cardRef, axis: 'x', filterTaps: true }
  );
</script>

<style scoped lang="scss"></style>

<style scoped lang="scss">
  .destination-item {
    height: fit-content;
    border: 1px solid transparent;
    box-sizing: border-box;
    position: relative;
    border-radius: 12px;
    z-index: 2;
    transition: transform 0.2s ease-out;
    touch-action: pan-y;

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

  .destination-swipe-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
  }

  .destination-actions {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #f5f5f5;
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
</style>
