<template>
  <div class="d-flex flex-column justify-center align-center">
    <div :class="['avatar', title ? 'mb-3' : '']">
      <v-avatar size="100" :image="imageUrl" />
      <img v-if="!imageUrl" src="@/assets/images/male-avatar.webp" class="avatar__sample-img" />
      <v-btn
        icon
        width="32"
        height="32"
        class="ap-btn-primary avatar__file-btn"
        @click="isProfileAvatarModalOpen = true"
      >
        <icon-gallery width="16" height="16" stroke="var(--ap-bg-surface)" />
      </v-btn>
    </div>
    <p v-if="title" class="ap-txt-title-2 ap-text-primary mb-1">{{ title }}</p>
    <span v-if="subTitle" dir="ltr" class="ap-txt-subtitle ap-text-secondary dire">
      {{ subTitle }}
    </span>
  </div>
  <base-bottom-sheet v-model="isProfileAvatarModalOpen">
    <div class="ap-btn-gray ap-radius-8 avatar__cam-box">
      <icon-camera width="32px" height="32px" stroke="var(--ap-text-btn)" />
    </div>
    <v-btn
      variant="text"
      class="d-flex justify-start pa-3 mb-4"
      color="var(--ap-btn-primary)"
      @click="triggerFile"
    >
      <icon-gallery width="24" height="24" stroke="var(--ap-btn-primary)" class="me-3" />
      <span class="ap-txt-title-5">انتخاب از گالری</span>
    </v-btn>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handleFileChange"
    />
  </base-bottom-sheet>
</template>

<script setup lang="ts">
  interface Props {
    title?: string;
    subTitle?: string;
  }

  const props = defineProps<Props>();

  const isProfileAvatarModalOpen = ref<boolean>(false);
  const imageUrl = ref<string | undefined>();
  const fileInput = ref<HTMLInputElement | null>(null);

  const triggerFile = () => {
    fileInput.value?.click();
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      isProfileAvatarModalOpen.value = false;
      imageUrl.value = URL.createObjectURL(file);
    }
  };
</script>

<style scoped lang="scss">
  .avatar {
    width: fit-content;
    height: fit-content;
    position: relative;

    &__sample-img {
      position: absolute;
      width: 100px;
      height: 100px;
      top: 0;
      right: 0;
      left: 0;
    }

    &__file-btn {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    &__cam-box {
      height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }
  }
</style>
