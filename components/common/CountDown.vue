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
  interface Counter {
    duration?: number;
    autoStart?: boolean;
  }

  const props = withDefaults(defineProps<Counter>(), {
    duration: 30,
    autoStart: true,
  });

  const emit = defineEmits<{
    (e: 'resend'): void;
    (e: 'expired'): void;
  }>();

  const remaining = ref(props.duration);
  const isCounting = ref<boolean>(false);
  const loading = ref<boolean>(false);
  let timer: ReturnType<typeof setInterval> | null = null;

  const toPersianDigits = (value: string | number): string =>
    value.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

  const formattedTime = computed(() => {
    const min = Math.floor(remaining.value / 60);
    const sec = remaining.value % 60;
    return `${toPersianDigits(min)}:${toPersianDigits(sec.toString().padStart(2, '0'))}`;
  });

  const startCountdown = () => {
    isCounting.value = true;
    remaining.value = props.duration;
    timer = setInterval(() => {
      if (remaining.value > 0) {
        remaining.value--;
      } else {
        stopCountdown();
        emit('expired');
      }
    }, 1000);
  };

  const stopCountdown = () => {
    isCounting.value = false;
    if (timer) clearInterval(timer);
    timer = null;
  };

  const handleResend = async () => {
    loading.value = true;
    try {
      emit('resend');
      startCountdown();
    } catch (err) {
      console.error('Failed to resend code:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    if (props.autoStart) {
      startCountdown();
    }
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
