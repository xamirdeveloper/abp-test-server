<template>
  <v-app>
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { useTheme } from 'vuetify'

const themeStore = useThemeStore()
const vuetifyTheme = useTheme()

onMounted(() => {
  themeStore.initTheme()
  vuetifyTheme.global.name.value = themeStore.theme
})

watch(
  () => themeStore.theme,
  (val) => {
    vuetifyTheme.global.name.value = val
  }
)

window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    const newTheme = event.newValue as 'light' | 'dark'
    if (newTheme && newTheme !== themeStore.theme) {
      themeStore.setTheme(newTheme)
    }
  }
})

</script>
