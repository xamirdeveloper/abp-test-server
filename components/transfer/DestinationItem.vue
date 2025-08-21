<template>
  <div
    class="destination-item-wrapper"
    v-touch:swipe.left="onSwipeLeft"
    v-touch:swipe.right="onSwipeRight"
  >
    <!-- محتوای آیتم -->
    <div
      :class="[
        'destination-item',
        isSelected ? 'destination-item__selected-item' : '',
        isOpen ? 'destination-item__open' : '',
      ]"
    >
      <v-btn
        variant="text"
        class="d-block ap-bg-surface ap-radius-12 pa-3 w-100 destination-item__btn"
        @click="emit('select', item.id)"
      >
        <div class="d-flex justify-start align-center w-100 destination-item__content">
          <div class="me-2 d-flex align-center position-relative ap-radius-full">
            <img
              :src="item.avatarUrl"
              alt="avatar"
              width="50"
              height="50"
              class="ap-radius-full"
            />
            <div class="destination-item__bank-logo d-flex justify-center align-center">
              <img :src="item.bankLogo" alt="bank logo" width="19" height="19" />
            </div>
          </div>

          <div class="text-start flex-grow-1">
            <p class="ap-txt-body-1 ap-text-primary mb-1">{{ item.name }}</p>
            <span class="ap-txt-body-2 ap-text-secondary">
              <template v-if="item.cardNumber">شماره کارت: {{ item.cardNumber }}</template>
              <template v-else-if="item.iban">شبا: {{ item.iban }}</template>
            </span>
          </div>

          <icon-pin
            v-if="item.isFavorite"
            width="20"
            height="20"
            stroke="var(--ap-text-secondary)"
          />
        </div>
      </v-btn>
    </div>

    <!-- اکشن‌ها -->
    <div class="destination-item__actions">
      <v-btn variant="text" color="error" @click="emit('delete', item.id)">حذف</v-btn>
      <v-btn variant="text" color="primary" @click="emit('edit', item.id)">ویرایش</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface RecipientItem {
  id: string | number
  name: string
  avatarUrl?: string
  bankLogo?: string
  cardNumber?: string
  iban?: string
  isFavorite?: boolean
}

const props = defineProps<{
  item: RecipientItem
  isSelected?: boolean
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: string | number): void
  (e: 'open', id: string | number): void
  (e: 'close', id: string | number): void
  (e: 'delete', id: string | number): void
  (e: 'edit', id: string | number): void
}>()

const onSwipeLeft = () => emit('open', props.item.id)
const onSwipeRight = () => emit('close', props.item.id)
</script>

<style scoped lang="scss">
.destination-item-wrapper {
  position: relative;
  overflow: hidden;
}

/* کل آیتم */
.destination-item {
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;

  &__selected-item {
    border: 1px solid var(--ap-btn-primary);
    border-radius: 12px;
  }

  &__btn {
    height: fit-content;
    border: 1px solid transparent;
    border-radius: 12px;
  }

  &__content {
    height: 52px;
  }

  &__bank-logo {
    background-color: var(--ap-bg-surface);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  &__open {
    transform: translateX(-100px); // اسلاید به چپ
  }
}

/* اکشن‌ها */
.destination-item__actions {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: var(--ap-bg-surface);
  z-index: 1;
}
</style>
