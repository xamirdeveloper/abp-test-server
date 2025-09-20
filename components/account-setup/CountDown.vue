<template>
  <div v-if="!loading" class="ap-countdown">
    <span v-if="isCounting" class="ap-countdown__text ap-txt-link ap-text-secondary">
      {{ formattedTime }} تا ارسال مجدد
    </span>
    <v-btn
      v-else
      class="ap-countdown__resend"
      variant="text"
      density="compact"
      :disabled="resending"
      @click="handleResend"
    >
      <span class="ap-txt-link btn-text">
        {{ resending ? '...' : 'ارسال مجدد' }}
      </span>
    </v-btn>
  </div>
  <v-progress-circular
    v-else
    indeterminate
    size="20"
    color="var(--ap-btn-primary)"
    class="d-block mx-auto"
  />
</template>

<script setup lang="ts">
  import { useOtpStore } from '@/stores/otp';

  const props = defineProps<{ loading: boolean }>();
  const emit = defineEmits(['resend', 'expired']);

  const store = useOtpStore();
  const remaining = ref(0);
  const isCounting = ref(false);
  const resending = ref(false);

  let timer: ReturnType<typeof setInterval> | null = null;

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const startCountdown = () => {
    clearTimer();

    if (!store.expireTime) {
      isCounting.value = false;
      return;
    }

    const now = Date.now();
    remaining.value = Math.floor((store.expireTime - now) / 1000);

    if (remaining.value <= 0) {
      isCounting.value = false;
      emit('expired');
      return;
    }

    isCounting.value = true;

    timer = setInterval(() => {
      remaining.value--;
      if (remaining.value <= 0) {
        clearTimer();
        isCounting.value = false;
        emit('expired');
      }
    }, 1000);
  };

  const handleResend = async () => {
    if (resending.value) return;
    resending.value = true;
    try {
      await emit('resend');
      startCountdown();
    } finally {
      resending.value = false;
    }
  };

  onMounted(() => {
    startCountdown();
  });

  watch(
    () => store.expireTime,
    (newVal) => {
      if (newVal) startCountdown();
      else {
        clearTimer();
        isCounting.value = false;
      }
    }
  );

  onUnmounted(() => {
    clearTimer();
  });

  const toPersianDigits = (val: string | number) =>
    val.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

  const formattedTime = computed(() => {
    const min = Math.floor(remaining.value / 60);
    const sec = remaining.value % 60;
    return `${toPersianDigits(min)}:${toPersianDigits(sec.toString().padStart(2, '0'))}`;
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
