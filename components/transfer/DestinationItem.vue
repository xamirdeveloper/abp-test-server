<template>
  <div class="swipe-item-wrapper" ref="wrapper">
    <!-- دکمه‌ها -->
    <div class="swipe-actions">
      <v-btn color="warning" size="small" class="action-btn" @click.stop="onPin">
        پین
      </v-btn>
      <v-btn color="error" size="small" class="action-btn" @click.stop="onDelete">
        حذف
      </v-btn>
    </div>

    <div
      class="swipe-item"
      :style="{ transform: `translateX(${translateX}px)` }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="onItemClick"
    >
      <v-btn
        variant="text"
        :class="[
          'd-block ap-bg-surface ap-radius-12 pa-3 w-100 destination-item',
          isSelected ? 'destination-item__selected-item' : '',
        ]"
        @click.stop="emit('select', item.id)"
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
  open?: boolean
  isSelected?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'select', id: string | number): void
  (e: 'pin', id: string | number): void
  (e: 'delete', id: string | number): void
}>()

// swipe logic
const translateX = ref(0)
let startX = 0
const actionWidth = 140
const threshold = 60
let dragging = false

watch(() => props.open, val => {
  translateX.value = val ? -actionWidth : 0
})

function onTouchStart(e: TouchEvent) {
  startX = e.touches[0].clientX
  dragging = true
}

function onTouchMove(e: TouchEvent) {
  if (!dragging) return
  const deltaX = e.touches[0].clientX - startX
  if (deltaX < 0) translateX.value = Math.max(deltaX, -actionWidth)
  else translateX.value = 0
}

function onTouchEnd() {
  dragging = false
  translateX.value < -threshold
    ? emit('update:open', true)
    : emit('update:open', false)
}

// Actions
function onPin() {
  emit('pin', props.item.id)
  emit('update:open', false)
}
function onDelete() {
  emit('delete', props.item.id)
  emit('update:open', false)
}

// Click close
function onItemClick() {
  emit('update:open', false)
}

// Click outside
const wrapper = ref<HTMLElement | null>(null)
function onClickOutside(e: MouseEvent) {
  if (!wrapper.value?.contains(e.target as Node)) emit('update:open', false)
}

onMounted(() => window.addEventListener('click', onClickOutside))
onBeforeUnmount(() => window.removeEventListener('click', onClickOutside))
</script>

<style scoped lang="scss">
.swipe-item-wrapper {
  position: relative;
  overflow: hidden;
}

.swipe-actions {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
  z-index: 0;
}

.swipe-item {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  position: relative;
  z-index: 1;
}

.action-btn {
  min-width: 50px;
  height: 100%;
}
</style>
