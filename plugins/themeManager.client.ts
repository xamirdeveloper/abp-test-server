import { useThemeStore } from '@/stores/theme'

export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  themeStore.initTheme()

  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', (e) => {
    if (themeStore.source === 'system') {
      const newTheme = e.matches ? 'dark' : 'light'
      themeStore.setTheme(newTheme, 'system')
    }
  })
})
