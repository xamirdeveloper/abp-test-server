<template>
  <div class="card-container">
    <div :class="['card', { 'is-flipped': isFlipped }]">
      <div class="card-face card-front">
        <img src="@/assets/images/card-front.png" alt="card-front" width="276" height="441" />
      </div>

      <div class="card-face card-back">
        <img src="@/assets/images/card-back.png" alt="card-back" width="276" height="441" />
      </div>
    </div>
    <div class="card-info d-flex align-center justify-space-between">
      <div>
        <v-btn
          icon
          class="card-info__btn ap-me-10"
          width="40"
          height="40"
          variant="text"
          @click="isFlipped = !isFlipped"
        >
          <icon-rotate-left width="20" height="20" stroke="var(--ap-text-btn)" />
        </v-btn>
        <v-btn icon class="card-info__btn" width="40" height="40" variant="text">
          <icon-share width="20" height="20" stroke="var(--ap-text-btn)" />
        </v-btn>
      </div>
      <div class="text-left">
        <p class="ap-txt-title-4 ap-text-btn mb-1">{{ toPersianDigits(fullCardNumber) }}</p>
        <p class="ap-txt-12 ap-fw-medium iban-text">{{ toPersianDigits(iban) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { toPersianDigits } from '@/utils/convertor';

  const isFlipped = ref(false);
  const fullCardNumber = '6219 1861 3213 1233';
  const iban = 'IR 18705375388913849319';
</script>

<style scoped lang="scss">
  .card-container {
    perspective: 1000px;
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
    transition: transform 0.6s;
    transform-style: preserve-3d;
    z-index: 1;
  }

  .card.is-flipped {
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

  .card-info {
    border-radius: 0 0 20px 20px;
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(12px);
    height: 100px;
    position: absolute;
    padding: 24px 22px;
    bottom: 0;
    right: 50%;
    transform: translate(50%);
    width: 95%;
    z-index: 2;

    &__btn {
      border: 1px solid var(--ap-text-btn, #fff);
      box-shadow: 0 1px 2px 0 rgba(13, 13, 18, 0.06);
    }
  }

  .ap-me-10 {
    margin-inline-end: 10px;
  }

  .iban-text {
    color: var(--ap-border-default);
  }
</style>
