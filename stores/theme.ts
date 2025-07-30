import { defineStore } from 'pinia';

type Theme = 'light' | 'dark';
type ThemeSource = 'system' | 'user';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light' as Theme,
    source: 'system' as ThemeSource,
  }),

  actions: {
    setTheme(theme: Theme, source: ThemeSource = 'user') {
      this.theme = theme;
      this.source = source;
      localStorage.setItem('theme', theme);
      localStorage.setItem('theme-source', source);
    },

    initTheme() {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const savedSource = localStorage.getItem('theme-source') as ThemeSource | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      const source = savedSource || 'system';

      this.setTheme(theme, source);
    },
  },
});
