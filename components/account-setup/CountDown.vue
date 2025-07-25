<template>
  <div class="ap-countdown">
    <span v-if="isCounting" class="ap-countdown__text ap-txt-link ap-text-secondary">
      {{ formattedTime }} تا ارسال مجدد
    </span>
    <v-btn
      v-else
      class="ap-countdown__resend opacity-100"
      variant="text"
      density="compact"
      :disabled="loading"
      @click="handleResend"
    >
      <span class="ap-txt-link btn-text">
        {{ loading ? '...' : 'ارسال مجدد' }}
      </span>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  import { useOtpStore } from '@/stores/otp';

  const emit = defineEmits(['resend', 'expired']);
  const store = useOtpStore();
  const loading = ref(false);
  const isCounting = ref(false);
  const remaining = ref(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  const startCountdown = () => {
    if (!store.expireTime) return;
    const now = Date.now();
    remaining.value = Math.floor((store.expireTime - now) / 1000);
    if (remaining.value <= 0) return emit('expired');

    isCounting.value = true;

    timer = setInterval(() => {
      remaining.value--;
      if (remaining.value <= 0) {
        clearInterval(timer!);
        isCounting.value = false;
        emit('expired');
      }
    }, 1000);
  };

  const handleResend = async () => {
    loading.value = true;
    await emit('resend');
    loading.value = false;
  };

  const toPersianDigits = (val: string | number) =>
    val.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

  const formattedTime = computed(() => {
    const min = Math.floor(remaining.value / 60);
    const sec = remaining.value % 60;
    return `${toPersianDigits(min)}:${toPersianDigits(sec.toString().padStart(2, '0'))}`;
  });

  onMounted(() => {
    startCountdown();
  });
</script>

<style scoped lang="scss">
.ap-countdown {
  font-size: 14px;
  color: var(--ap-text-tertiary);
  &__resend:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.btn-text {
  color: #00aae7;
}
</style>
