<template>
  <page-header
    class="pt-3"
    title="انتقال وجه"
    subtitle="لطفا مقصد را انتخاب کنید"
    :show-back="true"
  />
  <base-input v-model="destination" placeholder="شماره کارت یا شبا بدون IR" class="mb-6 px-5" />
  <div class="ap-page-wrapper">
    <destination-list :items="fakeData" @select="onSelect" @delete="onDelete" @edit="onEdit" />
  </div>
  <base-select
    v-model="selectedTransferMethod"
    v-model:sheetVisible="isTransferMethodSheetOpen"
    :items="transferMethods"
    :hide-input="true"
    title="لطفا شیوه انتقال را انتخاب کنید."
  />
</template>

<script lang="ts" setup>
  import { type RecipientItem } from '~/components/transfer/DestinationItem.vue';

  const isTransferMethodSheetOpen = ref<boolean>(false);
  const selectedTransferMethod = ref<string | null>(null);
  const destination = ref('');
  const searching = ref<boolean>(false);

  const fakeData = ref<RecipientItem[]>([
    {
      id: 1,
      name: 'مینا علی‌خانی',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      cardNumber: '6219 8610 4477 8776',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'علیرضا مرادی',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 820540102680020817909002',
      isFavorite: true,
    },
    {
      id: 3,
      name: 'نگار نصیری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      cardNumber: '5022 2910 4457 1122',
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'امیر سالاری',
      avatarUrl: '/images/male-avatar.webp',
      bankLogo: '/images/Saman.svg',
      iban: 'IR 450170000000302256482007',
      isFavorite: false,
    },
  ]);

  const transferMethods = ref([
    { value: 'internal', label: 'داخلی', caption: 'بدون کارمزد', subtitle: 'انتقال در لحظه' },
    {
      value: 'card_to_card',
      label: 'کارت به کارت',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
    },
    {
      value: 'paya_instant',
      label: 'بین بانکی آنی (پل)',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
    },
    {
      value: 'paya',
      label: 'بین بانکی (پایا)',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
    },
    {
      value: 'satna',
      label: 'بین بانکی (ساتنا)',
      caption: 'کارمزد ۱۰,۰۰۰ ریال',
      subtitle: 'انتقال در امروز ۱۳:۱۵ بعد از ظهر',
    },
  ]);

  const onSelect = (id: string | number) => {
    console.log('Selected item:', id);
  };

  const onDelete = (id: string | number) => {
    fakeData.value = fakeData.value.filter((r) => r.id !== id);
  };

  const onEdit = (id: string | number) => {
    console.log('Edit item:', id);
  };
</script>
