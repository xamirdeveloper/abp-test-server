import { defineStore } from 'pinia';
import type { UserDetails } from '~/api/account-setup/types';

export const useUserDetailsStore = defineStore('userDetails', {
  state: (): UserDetails => ({
    request_id: '',
    national_id: '',
    first_name: '',
    last_name: '',
    gender: '',
    father_name: '',
    birth_certificate_number: '',
    national_card_serial: '',
    birth_location: '',
    issuance_location: '',
    province: '',
    city: '',
    address: '',
    postal_code: '',
    sub_economic: '',
    occupation: '',
  }),

  actions: {
    updateFields(fields: Partial<UserDetails>) {
      Object.assign(this.$state, fields);
    },

    getPayload(): UserDetails {
      return { ...this.$state };
    },

    reset() {
      this.$reset();
    },
  },
});
