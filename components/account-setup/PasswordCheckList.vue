<template>
  <ul class="pw-rules">
    <li v-for="rule in rules" :key="rule.key" :class="{ ok: rule.state, nok: !rule.state }">
      <transition v-if="rule.state" name="fade">
        <icon-check width="22" height="22" stroke="#1a7f2e" />
      </transition>
      <transition v-else name="fade">
        <icon-circle width="22" height="22" stroke="var(--ap-text-secondary)" />
      </transition>
      <span class="rule-text ap-txt-body-2">{{ rule.label }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  interface Props {
    password: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'valid', value: boolean): void;
  }>();

  const minLengthOk = computed(() => props.password.length >= 8);
  const upperOk = computed(() => /[A-Z]/.test(props.password));
  const lowerOk = computed(() => /[a-z]/.test(props.password));
  const numberOk = computed(() => /\d/.test(props.password));
  const specialOk = computed(() => /[!@#$%^&*(),.?":{}|<>_\-\\\/\[\];'`~+=]/.test(props.password));

  const isValid = computed(
    () => minLengthOk.value && upperOk.value && lowerOk.value && numberOk.value && specialOk.value
  );

  watch(isValid, (val) => {
    emit('valid', val);
  });

  const rules = computed(() => [
    { key: 'len', label: 'حداقل 8 کرکتر', state: minLengthOk.value },
    { key: 'upper', label: 'حداقل یک حرف بزرگ (A-Z)', state: upperOk.value },
    { key: 'lower', label: 'حداقل یک حرف کوچک (a-z)', state: lowerOk.value },
    { key: 'num', label: 'حداقل یک عدد (0-9)', state: numberOk.value },
    { key: 'special', label: 'حداقل یک کاراکتر خاص (@, #, ...)', state: specialOk.value },
  ]);
</script>

<style scoped>
  .pw-rules {
    list-style: none;
    padding: 0;
    margin: 8px 0 0;
  }

  .pw-rules li {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 4px 0;
    font-size: 14px;
    color: #666;
  }

  .pw-rules li.ok {
    color: #1a7f2e;
  }

  .rule-icon {
    width: 20px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.6);
  }
</style>
