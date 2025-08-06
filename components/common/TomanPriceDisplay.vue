<template>
  <span>{{ formatted }}</span>
</template>

<script setup lang="ts">
  const props = defineProps<{
    amount: string | number;
  }>();

  const toPersianDigits = (num: string) => num.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const separate = (value: string): string => {
    const number = parseInt(value, 10);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('fa-IR').format(number);
  };

  const numberToWords = (num: number): string => {
    const farsiNumbers = ['', 'هزار', 'میلیون', 'میلیارد', 'بیلیون', 'بیلیارد', 'تریلیون'];

    const parts = [];
    let remaining = num;
    let i = 0;

    while (remaining > 0 && i < farsiNumbers.length) {
      const part = remaining % 1000;
      if (part > 0) {
        parts.unshift(`${separate(part.toString())} ${farsiNumbers[i]}`.trim());
      }
      remaining = Math.floor(remaining / 1000);
      i++;
    }

    return parts.join(' و ');
  };

  const formatted = computed(() => {
    const rial = Number(props.amount);
    if (isNaN(rial) || rial < 10) return '';

    const toman = Math.floor(rial / 10);
    const words = numberToWords(toman);
    return `${toPersianDigits(words)} تومان`;
  });
</script>
