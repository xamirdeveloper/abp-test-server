// stores/otpStore.ts
import { defineStore } from 'pinia';

interface OtpState {
  requestId: string | null;
  expireTime: number | null; // timestamp
  verified: boolean;
}

export const useOtpStore = defineStore('otp', {
  state: (): OtpState => ({
    requestId: null,
    expireTime: null,
    verified: false,
  }),

  actions: {
    setRequestId(id: string) {
      this.requestId = id;
    },
    setExpireTime(secondsFromNow: number) {
      const now = Date.now();
      this.expireTime = now + secondsFromNow * 1000;
      localStorage.setItem('otp_expire', this.expireTime.toString());
    },
    loadExpireTime() {
      const expire = localStorage.getItem('otp_expire');
      if (expire) this.expireTime = parseInt(expire);
    },
    clear() {
      this.requestId = null;
      this.expireTime = null;
      this.verified = false;
      localStorage.removeItem('otp_expire');
    },
    markVerified() {
      this.verified = true;
    },
  },
});
