import { useTheme } from 'vuetify';
import { useThemeStore } from '@/stores/theme';

export const useApplyTheme = () => {
  const themeStore = useThemeStore();
  const theme = useTheme();

  onMounted(() => {
    if (themeStore.source === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newTheme = prefersDark ? 'dark' : 'light';
      themeStore.setTheme(newTheme, 'system');
    }
  });

  watch(
    () => themeStore.theme,
    (newTheme) => {
      applyTheme(newTheme);
    },
    { immediate: true }
  );

  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  const applySystemTheme = (e: MediaQueryListEvent) => {
    if (themeStore.source === 'system') {
      const newTheme = e.matches ? 'dark' : 'light';
      themeStore.setTheme(newTheme, 'system');
    }
  };

  try {
    mq.addEventListener('change', applySystemTheme);
  } catch (err) {
    mq.addListener(applySystemTheme);
  }

  function applyTheme(themeName: 'light' | 'dark') {
    theme.change(themeName);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${themeName}`);
  }
};
