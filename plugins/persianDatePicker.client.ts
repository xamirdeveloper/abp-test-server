import PersianDatePicker from 'vue3-persian-datetime-picker';
// @ts-ignore
import moment from 'moment-jalaali';

export default defineNuxtPlugin((nuxtApp) => {
  moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  nuxtApp.vueApp.component('PersianDatePicker', PersianDatePicker);
});
