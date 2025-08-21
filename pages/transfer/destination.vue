<template>
  <page-header
    class="pt-3"
    title="انتقال وجه"
    subtitle="لطفا مقصد را انتخاب کنید"
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <base-input placeholder="شماره کارت یا شبا بدون IR" class="mb-6" />
    <div>
      <destination-item
        v-for="item in fakeData"
        :key="item.id"
        :item="item"
        :isSelected="selectedId === item.id"
        :is-open="openId === item.id"
        @select="onSelect"
        @open="onOpen"
        @close="onClose"
        @delete="onDelete"
        @edit="onEdit"
        class="mb-3"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { type RecipientItem } from '~/components/transfer/DestinationItem.vue';

  const selectedId = ref<string | number | null>(null);
  const openId = ref<string | number | null>(null);
  const fakeData = ref<RecipientItem[]>([
    {
      id: 1,
      name: 'مینا علی‌خانی',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/saman.svg',
      cardNumber: '6219 8610 4477 8776',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'علیرضا مرادی',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/saman.svg',
      iban: 'IR 820540102680020817909002',
      isFavorite: true,
    },
    {
      id: 3,
      name: 'نگار نصیری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/saman.svg',
      cardNumber: '5022 2910 4457 1122',
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
  ]);

  const onSelect = (id: string | number) => {
    selectedId.value = id;
  };

  const onOpen = (id: string | number) => {
    openId.value = id;
  };

  const onClose = (id: string | number) => {
    if (openId.value === id) openId.value = null;
  };

  const onDelete = (id: string | number) => {
    fakeData.value = fakeData.value.filter((r) => r.id !== id);
  };

  const onEdit = (id: string | number) => {
    console.log('edit item', id);
  };
</script>

<style scoped></style>
