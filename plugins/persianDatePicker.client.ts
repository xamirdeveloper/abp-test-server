import PersianDatePicker from 'vue3-persian-datetime-picker';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('PersianDatePicker', PersianDatePicker);
});
