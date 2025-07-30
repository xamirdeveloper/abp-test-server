// stores/language.ts
import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    lang: localStorage.getItem('lang') || 'fa',
  }),
  actions: {
    setLang(lang: string) {
      this.lang = lang;
      localStorage.setItem('lang', lang);
    },
  },
});
