<template>
  <Page-header title="امکانات" class="pt-3" :has-support="true" :shopping-cart="true" />
  <div class="ap-page-wrapper">
    <base-input v-model="searchValue" placeholder="جستجو امکانات, سرویس" class="mb-8">
      <template #prepend-icon>
        <icon-search width="18" height="18" stroke="var(--ap-text-secondary)" />
      </template>
    </base-input>
    <div v-for="category in categories" :key="category.id" class="category-section mb-8">
      <p class="ap-txt-title-4 ap-text-primary mb-4">{{ category.title }}</p>
      <div class="items-row">
        <service-item
          v-for="item in category.items"
          :key="item.id"
          :label="item.label"
          :icon="item.icon"
          :status="item.status"
          :bg-color="category.color"
          @click="item.action && item.action()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: 'main' });

  import { useRouter } from 'vue-router';
  import IconChange from '~/components/icons/IconChange.vue';
  import IconGift from '~/components/icons/IconGift.vue';
  import IconPayment from '~/components/icons/IconPayment.vue';

  const router = useRouter();

  enum ServiceStatus {
    Active = 'active',
    Soon = 'soon',
    Disabled = 'disabled',
  }

  export interface ServiceItem {
    id: number;
    label: string;
    icon: Component;
    status: ServiceStatus;
    action?: () => void;
  }

  export interface ServiceCategory {
    id: string;
    title: string;
    color: string;
    items: ServiceItem[];
  }

  const searchValue = ref('');
  const categories = ref<ServiceCategory[]>([
    {
      id: 'payment',
      title: 'خدمات پرداخت بین المللی',
      color: '#CFF0FB',
      items: [
        { id: 3, label: 'پرداخت سایت خارجی', icon: IconChange, status: ServiceStatus.Active },
        {
          id: 2,
          label: 'پرداخت سفر خارجی',
          icon: IconPayment,
          status: ServiceStatus.Active,
          action: () => router.push('/services/foreign-travel-payment'),
        },
      ],
    },
    {
      id: 'shopping',
      title: 'خدمات خرید بین المللی',
      color: '#D4F7D0',
      items: [
        { id: 4, label: 'خرید از سایت ها', icon: IconPayment, status: ServiceStatus.Active },
        { id: 6, label: 'تعرفه های گمرکی', icon: IconPayment, status: ServiceStatus.Soon },
      ],
    },
  ]);
</script>

<style scoped>
  .items-row {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    overflow: hidden;
  }
</style>
