import { defineStore } from 'pinia';

interface OtpState {
  requestId: string | null;
  expireTime: number | null;
  verified: boolean;
}

export const useOtpStore = defineStore('otp', {
  state: (): OtpState => ({
    requestId: null,
    expireTime: null,
    verified: false,
  }),

  actions: {
    setRequestId(id: string | null) {
      this.requestId = id;
    },
    clearRequestId() {
      this.requestId = null;
    },
    setExpireTimeAbsolute(timestamp: number) {
      this.expireTime = timestamp;
      localStorage.setItem('otp_expire', this.expireTime.toString());
    },
    loadExpireTime(): boolean {
      const expire = localStorage.getItem('otp_expire');
      const now = Date.now();
      if (expire && parseInt(expire) > now) {
        this.expireTime = parseInt(expire);
        return true;
      } else {
        this.expireTime = null;
        localStorage.removeItem('otp_expire');
        return false;
      }
    },
    clearExpireTime() {
      this.expireTime = null;
      localStorage.removeItem('otp_expire');
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
