<template>
  <div class="card-container">
    <div
      v-if="isCardEnabled"
      class="card"
      :class="{ flipped: isFlipped, animating: isAnimating }"
      @transitionend="onAnimEnd"
      @click="triggerFlip"
    >
      <div class="card-face card-front">
        <img src="@/assets/images/card-front.png" alt="card-front" width="276" height="441" />
      </div>
      <div class="card-face card-back">
        <img src="@/assets/images/card-back.png" alt="card-back" width="276" height="441" />
      </div>
    </div>
    <div v-else class="card-face">
      <div class="empty-card d-flex flex-column align-center">
        <alibaba-pays-logo width="223" height="37" class="mt-12 mb-15" />
        <v-btn variant="text" class="add-icon">
          <icon-plus width="24" height="24" stroke="#2D31FA" />
        </v-btn>
      </div>
    </div>
    <div :class="['card-info d-flex align-center', isCardBlocked ? 'card-info__block' : '']">
      <div v-if="isCardEnabled" class="d-flex align-center justify-space-between w-100">
        <div>
          <v-btn
            icon
            class="card-info__btn ap-me-10"
            width="40"
            height="40"
            variant="text"
            @click.stop="triggerFlip"
          >
            <icon-rotate-left width="20" height="20" stroke="var(--ap-text-btn)" />
          </v-btn>
          <v-btn
            icon
            class="card-info__btn"
            width="40"
            height="40"
            variant="text"
            @click="isShareSheetOpen = true"
          >
            <icon-share width="20" height="20" stroke="var(--ap-text-btn)" />
          </v-btn>
        </div>
        <div class="text-left">
          <p class="ap-txt-title-4 ap-text-btn mb-1">{{ toPersianDigits(fullCardNumber) }}</p>
          <p class="ap-txt-12 ap-fw-medium iban-text">{{ toPersianDigits(iban) }}</p>
        </div>
      </div>
      <div v-else class="d-flex align-center justify-center w-100">
        <p class="ap-txt-caption ap-text-primary text-center">
          شما هنوز کارت خود را ثبت نکرده اید.
        </p>
      </div>
    </div>
    <card-share-bottom-sheet v-model="isShareSheetOpen" />
  </div>
</template>

<script setup lang="ts">
  import { toPersianDigits } from '@/utils/convertor';

  interface Props {
    isCardEnabled: boolean;
    isCardBlocked?: boolean;
  }

  const props = defineProps<Props>();

  const isFlipped = ref(false);
  const isAnimating = ref(false);
  const isShareSheetOpen = ref<boolean>(false);
  const fullCardNumber = ref<string>('6219 1861 3213 1233');
  const iban = ref<string>('IR 18705375388913849319');

  const triggerFlip = () => {
    if (!props.isCardEnabled || isAnimating.value) return;
    isAnimating.value = true;
    isFlipped.value = !isFlipped.value;
  };

  const onAnimEnd = () => {
    isAnimating.value = false;
  };
</script>

<style scoped lang="scss">
  .card-container {
    perspective: 1200px;
    width: 100%;
    height: 470px;
    position: relative;
    overflow: hidden;
    padding-top: 23px;
  }

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition:
      transform 0.65s cubic-bezier(0.2, 0.6, 0.2, 1),
      scale 0.25s ease-in-out;
    cursor: pointer;
  }

  .card.animating {
    scale: 0.97;
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-back {
    transform: rotateY(180deg);
  }

  .empty-card {
    width: 276px;
    height: 95%;
    border-radius: 25px;
    border: 2px solid var(--ap-btn-primary);
    background: var(--ap-bg-default);
    box-shadow: 0 4px 60px 0 rgba(0, 0, 0, 0.08);
  }

  .add-icon {
    display: flex;
    width: 74px;
    height: 74px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 50%;
    border: 3px solid #2d31fa;
    box-shadow: 0 1px 2px 0 rgba(13, 13, 18, 0.06);
  }

  .card-info {
    border-radius: 0 0 20px 20px;
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(12px);
    height: 100px;
    position: absolute;
    padding: 24px 26px;
    bottom: 0;
    right: 50%;
    transform: translate(50%);
    width: 95%;
    z-index: 2;

    &__block {
      background: rgba(0, 0, 0, 0.4);
    }

    &__btn {
      border: 1px solid var(--ap-text-btn, #fff);
      box-shadow: 0 1px 2px 0 rgba(13, 13, 18, 0.06);
    }
  }

  .theme-dark .card-info {
    border: 2px solid #000;
    background: rgba(0, 0, 0, 0.4);
  }

  .ap-me-10 {
    margin-inline-end: 10px;
  }

  .iban-text {
    color: var(--ap-border-default);
  }

  .theme-dark .iban-text {
    color: var(--ap-text-primary);
  }
</style>
