<template>
  <div class="ap-upload-card" @click="triggerFile">
    <div class="ap-upload-card__border">
      <div v-if="imageUrl" class="ap-upload-card__preview">
        <img :src="imageUrl" alt="uploaded image" />
      </div>
      <div v-else class="ap-upload-card__placeholder">
        <icon-plus stroke="var(--ap-text-primary)" />
      </div>
      <div v-if="imageUrl && removable" class="ap-upload-card__overlay" @click.stop>
        <v-btn
          width="40"
          height="40"
          variant="plain"
          class="opacity-100"
          icon
          @click.stop="removeImage"
        >
          <icon-trash width="32" height="32" />
        </v-btn>
      </div>
    </div>
    <img src="@/assets/images/corner.png" width="260" height="167" class="corner top-left" />
    <img src="@/assets/images/corner.png" width="260" height="167" class="corner top-right" />
    <img src="@/assets/images/corner.png" width="260" height="167" class="corner bottom-left" />
    <img src="@/assets/images/corner.png" width="260" height="167" class="corner bottom-right" />

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    removable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    removable: false,
  });

  const emit = defineEmits<{
    (e: 'update:file', value: File | null): void;
  }>();

  const imageUrl = ref<string | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);

  const triggerFile = () => {
    fileInput.value?.click();
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      imageUrl.value = URL.createObjectURL(file);
      emit('update:file', file);
    }
  };

  const removeImage = () => {
    imageUrl.value = null;
    emit('update:file', null);
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };
</script>

<style scoped lang="scss">
  @use '/assets/design-system/upload-file.scss' as *;
</style>
