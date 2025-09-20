<template>
  <page-header class="pt-3" title="تراکنش های اخیر" :show-back="true">
    <template #prepend-back>
      <v-btn
        icon
        class="ap-border-1 ap-border-accent-primary opacity-100 ap-me-10"
        width="40"
        height="40"
        variant="text"
        @click="router.push('transaction-filter')"
      >
        <icon-filter width="18" height="18" />
      </v-btn>
    </template>
  </page-header>
  <div class="d-flex justify-start align-center ga-2 mb-5 pb-2 chips-wrapper">
    <v-chip v-for="i in 9" variant="text" class="ap-bg-surface py-2 ps-4 pe-2 chip-item">
      <span class="ap-txt-12 ap-fw-semibold ap-text-error ap-me-10">دریافتی</span>
      <v-btn variant="text" icon width="16" height="16">
        <icon-close width="14" height="14" stroke="#FF4F4F" />
      </v-btn>
    </v-chip>
  </div>
  <div class="ap-page-wrapper">
    <div>
      <TransactionItem
        v-for="(item, index) in transactions"
        :key="index"
        :title="item.title"
        :subtitle="item.subtitle"
        :amount="item.amount"
        :type="item.type"
        @click="router.push('transaction-details')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const transactions = ref([
    {
      title: 'مینا نوروزی',
      subtitle: 'نیم ساعت پیش | ۱۲:۲۴',
      amount: 2000000000,
      type: 'deposit',
    },
    {
      title: 'دریافت از پایا',
      subtitle: '۲ ساعت پیش | ۱۲:۲۴',
      amount: 2338990000,
      type: 'deposit',
    },
    {
      title: 'کارمزد',
      subtitle: '۱۲ اردیبهشت ۱۴۰۲ | ۱۲:۹۰',
      amount: 209207000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
    {
      title: 'انتقال به کارت',
      subtitle: '۱۴۰۱/۰۱/۰۲ | ۱۵:۵۵',
      amount: 2000000000,
      type: 'withdraw',
    },
  ]);
</script>

<style scoped>
  .ap-me-10 {
    margin-inline-end: 10px;
  }

  .ap-text-error {
    color: #ff4f4f;
  }

  .chips-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scrollbar-width: none;
    padding-inline: 20px;
  }

  .chips-wrapper::-webkit-scrollbar {
    display: none;
  }

  .chip-item {
    flex: 0 0 auto;
    box-shadow:
      0 0 1px 0 rgba(20, 20, 20, 0.04),
      0 0 8px 0 rgba(20, 20, 20, 0.08);
  }
</style>
