<template>
  <div class="ap-upload-card">
    <div class="ap-upload-card__border">
      <div v-if="src" class="ap-upload-card__preview">
        <img :src="src" alt="uploaded image" />
      </div>
      <div v-else class="ap-upload-card__placeholder">
        <icon-plus stroke="var(--ap-text-primary)" />
      </div>
      <div v-if="src && removable" class="ap-upload-card__overlay" @click.stop>
        <v-btn
          width="40"
          height="40"
          variant="plain"
          class="opacity-100"
          icon
          @click.stop="removeImage"
        >
          <icon-trash width="32" height="32" stroke="var(--ap-text-btn)" />
        </v-btn>
      </div>
    </div>
    <img src="@/assets/images/corner.svg" class="corner top-left" />
    <img src="@/assets/images/corner.svg" class="corner top-right" />
    <img src="@/assets/images/corner.svg" class="corner bottom-left" />
    <img src="@/assets/images/corner.svg" class="corner bottom-right" />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    src?: string | null;
    removable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    src: null,
    removable: false,
  });

  const emit = defineEmits<{
    (e: 'remove'): void;
  }>();

  const removeImage = () => {
    emit('remove');
  };
</script>

<style scoped lang="scss">
  @use '/assets/design-system/upload-file.scss' as *;
</style>
