<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue"

const offsetBottom = ref(24)

const lockScroll = () => {
  document.body.style.height = "100vh"
  document.body.style.overflow = "hidden"
}

const unlockScroll = () => {
  document.body.style.height = ""
  document.body.style.overflow = ""
}

const updatePosition = () => {
  const viewport = window.visualViewport
  if (!viewport) return

  const diff = window.innerHeight - viewport.height

  if (diff > 150) {
    // کیبورد بازه
    offsetBottom.value = diff + 10
    lockScroll()
  } else {
    // کیبورد بسته
    offsetBottom.value = 24
    unlockScroll()
  }
}

onMounted(() => {
  window.visualViewport?.addEventListener("resize", updatePosition)
})

onUnmounted(() => {
  window.visualViewport?.removeEventListener("resize", updatePosition)
  unlockScroll()
})

const buttonStyle = computed(() => ({
  bottom: `calc(${offsetBottom.value}px + env(safe-area-inset-bottom))`,
  position: "fixed",
  left: "20px",
  right: "20px",
  width: "calc(100% - 40px)",
}))
</script>

<template>
  <v-btn
    :style="buttonStyle"
    class="fab-btn ap-radius-12"
    height="48"
  >
    {{ "تأیید" }}
  </v-btn>
</template>
