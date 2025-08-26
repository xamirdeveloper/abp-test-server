<template>
  <v-btn
    variant="text"
    :class="[
      'd-block ap-bg-surface ap-radius-12 pa-3 w-100 destination-item',
      isSelected ? 'destination-item__selected-item' : '',
    ]"
    @click="emit('select', item.id)"
  >
    <div class="d-flex justify-start align-center w-100 destination-item__content">
      <div class="me-2 d-flex align-center position-relative ap-radius-full">
        <img
          src="@/assets/images/male-avatar.webp"
          alt="avatar"
          width="50"
          height="50"
          class="ap-radius-full"
        />
        <div class="destination-item__bank-logo d-flex justify-center align-center">
          <img src="@/assets/images/saman.svg" alt="bank logo" width="19" height="19" />
        </div>
      </div>
      <div class="text-start flex-grow-1">
        <p class="ap-txt-body-1 ap-text-primary mb-1">{{ item.name }}</p>
        <span class="ap-txt-body-2 ap-text-secondary">
          <template v-if="item.cardNumber">شماره کارت: {{ item.cardNumber }}</template>
          <template v-else-if="item.iban">شبا: {{ item.iban }}</template>
        </span>
      </div>
      <icon-pin
        v-if="item.isFavorite"
        width="20"
        height="20"
        stroke="var(--ap-text-secondary)"
      ></icon-pin>
    </div>
  </v-btn>
</template>

<script setup lang="ts">
  export interface RecipientItem {
    id: string | number;
    name: string;
    avatarUrl?: string;
    bankLogo?: string;
    cardNumber?: string;
    iban?: string;
    isFavorite?: boolean;
  }

  const props = defineProps<{ item: RecipientItem; isSelected?: boolean }>();

  const emit = defineEmits<{
    (e: 'select', id: string | number): void;
  }>();
</script>
<style scoped lang="scss">
  .destination-item {
    height: fit-content;
    border: 1px solid transparent;
    box-sizing: border-box;

    &__selected-item {
      border: 1px solid var(--ap-btn-primary);
    }

    &__content {
      height: 52px;
    }

    &__bank-logo {
      background-color: var(--ap-bg-surface);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: -5px;
      left: 0;

      img {
        object-fit: cover;
      }
    }
  }
</style>
