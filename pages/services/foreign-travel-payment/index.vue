<template>
  <Page-header
    title="سفر های خارجی"
    class="pt-3"
    :has-support="true"
    :show-back="true"
    :shopping-cart="true"
  />
  <div class="ap-page-wrapper">
    <base-input v-model="searchValue" placeholder="جستجو امکانات, سرویس" class="mb-8">
      <template #prepend-icon>
        <icon-search width="18" height="18" stroke="var(--ap-text-secondary)" />
      </template>
    </base-input>
    <div v-for="category in categories" :key="category.id" class="category-section">
      <p class="ap-txt-title-4 ap-text-primary mb-4">{{ category.title }}</p>
      <div
        :class="[
          'd-flex ga-4 flex-wrap align-start',
          category.items.length > 2 ? 'justify-space-between' : 'justify-start',
        ]"
      >
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
      id: 'travel',
      title: 'پرداخت سفر خارجی',
      color: '#CFF0FB',
      items: [
        { id: 3, label: 'رزرو هتل', icon: IconChange, status: ServiceStatus.Active },
        { id: 2, label: 'بلیت قطار', icon: IconPayment, status: ServiceStatus.Active },
        { id: 2, label: 'بلیط نمایشگاه ', icon: IconPayment, status: ServiceStatus.Active },
        // { id: 1, label: 'ویزا و سفارت', icon: IconGift, status: ServiceStatus.Active },
        // { id: 4, label: 'بلیت اتوبوس', icon: IconGift, status: ServiceStatus.Active },
        // { id: 5, label: 'بلیت کشتی', icon: IconPayment, status: ServiceStatus.Active },
        // { id: 6, label: 'بلیت هواپیما', icon: IconChange, status: ServiceStatus.Active },
        // { id: 7, label: 'مسابقات ورزشی', icon: IconGift, status: ServiceStatus.Active },
        // { id: 8, label: 'بلیت فوتبال', icon: IconPayment, status: ServiceStatus.Active },
        // { id: 9, label: 'رزرو از airB&B', icon: IconChange, status: ServiceStatus.Active },
      ],
    },
  ]);
</script>
