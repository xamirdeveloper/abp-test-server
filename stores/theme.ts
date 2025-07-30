import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  }),

  actions: {
    setTheme(mode: 'light' | 'dark') {
      this.theme = mode
      localStorage.setItem('theme', mode)
    },

    toggleTheme() {
      const next = this.theme === 'dark' ? 'light' : 'dark'
      this.setTheme(next)
    },

    initTheme() {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      this.setTheme(saved || system)
    },
  },
})
