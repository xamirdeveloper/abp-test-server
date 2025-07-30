import { defineStore } from 'pinia';

export const useSplashStore = defineStore('splash', {
  state: () => ({
    splashShown: false,
  }),
  actions: {
    setSplashShown(value: boolean) {
      this.splashShown = value;
    },
  },
});
