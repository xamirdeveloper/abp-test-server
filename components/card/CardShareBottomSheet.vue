<template>
  <base-bottom-sheet v-model="proxyModel" :has-padding="false">
    <div class="px-5">
      <div
        v-for="item in items"
        :key="item.id"
        class="d-flex align-center justify-space-between mb-6"
      >
        <div class="d-flex align-center ga-2">
          <div class="half-card-icon">
            <icon-half-card />
          </div>
          <div class="d-flex flex-column">
            <p class="ap-txt-body-2 ap-text-secondary">{{ item.label }}</p>
            <p dir="ltr" class="ap-txt-16 ap-fw-medium ap-text-primary">
              {{ toPersianDigits(item.value) }}
            </p>
          </div>
        </div>
        <div class="d-flex align-center ga-3">
          <v-btn icon width="28" height="28" variant="text" @click="copyToClipboard(item.value)">
            <icon-copy2 width="24" height="24" stroke="var(--ap-btn-primary)" />
          </v-btn>
          <v-btn icon width="28" height="28" variant="text" @click="shareItem(item)">
            <icon-share width="24" height="24" stroke="var(--ap-btn-primary)" />
          </v-btn>
        </div>
      </div>
    </div>
  </base-bottom-sheet>
</template>

<script lang="ts" setup>
  import { useToast } from 'vue-toastification';
  import { toPersianDigits } from '@/utils/convertor';

  interface InfoItem {
    id: string;
    label: string;
    value: string;
  }

  const props = defineProps<{ modelValue: boolean }>();

  const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

  const toast = useToast();

  const userName = ref<string>('امیرعلی سالاری');
  const items = ref<InfoItem[]>([
    { id: 'card', label: 'شماره کارت', value: '5894 6311 8252 4850' },
    { id: 'sheba', label: 'شماره شبا', value: 'IR 980130100000000346898407' },
    { id: 'deposit', label: 'شماره سپرده', value: '384-61298412-4' },
  ]);

  const proxyModel = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val),
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info('کپی شد');
    } catch (e) {
      toast.error('خطا در کپی');
    }
  };

  const shareItem = async (item: InfoItem) => {
    const textToShare = `${userName.value}\n${item.label}: ${item.value}\n\nعلی بابا پیز`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.label,
          text: textToShare,
        });
      } catch (e) {
        toast.error('عملیات لغو شد');
      }
    } else {
      toast.error('مرورگر شما از Share API پشتیبانی نمی‌کند');
    }
  };
</script>

<style scoped>
  .half-card-icon {
    display: flex;
    width: 50px;
    height: 50px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    border: 1px solid var(--ap-border-default);
  }
</style>
