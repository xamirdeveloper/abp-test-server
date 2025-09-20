<template>
  <div v-if="!searching">
    <destination-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-selected="selectedId === item.id"
      :is-open="openId === item.id"
      @select="onSelect"
      @opened="onOpen"
      @closed="onClose"
      @delete="onDelete"
      @pin="onEdit"
      class="mb-3"
    />
  </div>
  <destination-item-skltn v-else />
</template>

<script lang="ts" setup>
  import { type RecipientItem } from '~/components/transfer/DestinationItem.vue';

  interface Props {
    items: RecipientItem[];
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'select', id: string | number): void;
    (e: 'delete', id: string | number): void;
    (e: 'edit', id: string | number): void;
  }>();

  const selectedId = ref<string | number | null>(null);
  const openId = ref<string | number | null>(null);
  const searching = ref<boolean>(false);

  const onSelect = (id: string | number) => {
    if (selectedId.value !== id) {
      selectedId.value = id;
      emit('select', id);
    }
  };

  const onOpen = (id: string | number) => {
    if (openId.value && openId.value !== id) openId.value = null;
    nextTick(() => {
      openId.value = id;
    });
  };

  const onClose = (id: string | number) => {
    if (openId.value === id) openId.value = null;
  };

  const onDelete = (id: string | number) => {
    emit('delete', id);
    if (openId.value === id) openId.value = null;
  };

  const onEdit = (id: string | number) => {
    emit('edit', id);
  };
</script>
