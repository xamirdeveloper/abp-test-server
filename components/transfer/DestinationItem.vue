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
  import Hammer from 'hammerjs';

  export interface RecipientItem {
    id: string | number;
    name: string;
    avatarUrl?: string;
    bankLogo?: string;
    cardNumber?: string;
    iban?: string;
    isFavorite?: boolean;
  }

  const props = defineProps<{ item: RecipientItem; isSelected?: boolean; isOpen?: boolean }>();
  const emit = defineEmits<{
    (e: 'select', id: string | number): void;
    (e: 'delete', id: string | number): void;
    (e: 'pin', id: string | number): void;
    (e: 'opened', id: string | number): void;
    (e: 'closed', id: string | number): void;
  }>();

  const defaultAvatar = '/images/male-avatar.webp';
  const defaultBankLogo = '/images/saman.svg';

  const cardRef = ref<HTMLElement | null>(null);
  const x = ref(0);
  const actionWidth = 140;
  let hammer: HammerManager | null = null;

  // انیمیشن نرم به مقصد
  const animateTo = (to: number) => {
    if (!cardRef.value) return;
    cardRef.value.style.transition = 'transform 0.2s ease';
    x.value = to;
    cardRef.value.style.transform = `translateX(${x.value}px)`;
    setTimeout(() => {
      if (cardRef.value) cardRef.value.style.transition = '';
    }, 200);
  };

  // watch روی prop isOpen
  watch(
    () => props.isOpen,
    (val) => {
      animateTo(val ? -actionWidth : 0);
    },
    { immediate: true }
  );

  // مدیریت کلیک بیرون کارت
  const onClickOutside = (e: MouseEvent) => {
    if (!cardRef.value?.contains(e.target as Node) && props.isOpen) emit('closed', props.item.id);
  };

  onMounted(() => {
    if (!cardRef.value) return;

    hammer = new Hammer(cardRef.value);
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('pan', (ev) => {
      const currentOpen = props.isOpen ? -actionWidth : 0;
      let newX = currentOpen + ev.deltaX;
      if (newX > 0) newX = 0;
      if (newX < -actionWidth) newX = -actionWidth;
      x.value = newX;
      cardRef.value!.style.transform = `translateX(${x.value}px)`;
    });

    hammer.on('panend', () => {
      // کارت همیشه کامل باز یا کامل بسته شود
      if (x.value < -actionWidth / 2) emit('opened', props.item.id);
      else emit('closed', props.item.id);
    });

    document.addEventListener('click', onClickOutside);
  });

  onBeforeUnmount(() => {
    hammer?.destroy();
    document.removeEventListener('click', onClickOutside);
  });
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
  }
  .destination-item__selected-item {
    border: 1px solid var(--ap-btn-primary);
  }
  .destination-item__content {
    height: 52px;
  }
  .destination-item__bank-logo {
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
  }
</style>
