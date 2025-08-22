<template>
  <div>
    <destination-item
      v-for="item in fakeData"
      :key="item.id"
      :item="item"
      :isSelected="selectedId === item.id"
      :open="openId === item.id"
      @update:open="val => updateOpenId(item.id, val)"
      @select="onSelect"
      @delete="onDelete"
      @pin="onPin"
      class="mb-3"
    />
  </div>
</template>

<script setup lang="ts">
import type { RecipientItem } from '~/components/transfer/DestinationItem.vue'

const selectedId = ref<string | number | null>(null)
const openId = ref<string | number | null>(null)

const fakeData = ref<RecipientItem[]>([
  { id: 1, name: 'مینا علی‌خانی', avatarUrl: '/images/male-avatar.webp', bankLogo: '/images/saman.svg', cardNumber: '6219 8610 4477 8776', isFavorite: true },
  { id: 2, name: 'علیرضا مرادی', avatarUrl: '/images/male-avatar.webp', bankLogo: '/images/saman.svg', iban: 'IR 820540102680020817909002', isFavorite: true },
  { id: 3, name: 'نگار نصیری', avatarUrl: '/images/male-avatar.webp', bankLogo: '/images/saman.svg', cardNumber: '5022 2910 4457 1122' },
  { id: 4, name: 'امیر سالاری', avatarUrl: '/images/male-avatar.webp', bankLogo: '/images/saman.svg', iban: 'IR 450170000000302256482007', isFavorite: false },
])

// فقط یک آیتم باز باشد
function updateOpenId(id: string | number, value: boolean) {
  openId.value = value ? id : null
}

const onSelect = (id: string | number) => selectedId.value = id
const onDelete = (id: string | number) => {
  fakeData.value = fakeData.value.filter(i => i.id !== id)
  if (openId.value === id) openId.value = null
}
const onPin = (id: string | number) => console.log('pin', id)
</script>
