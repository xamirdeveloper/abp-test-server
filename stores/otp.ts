import { defineStore } from 'pinia';

type OtpFlowType = 'bank' | 'backend' | null;

interface OtpState {
  flowType: OtpFlowType;
  requestId: string | null;
  expireTime: number | null;
  verified: boolean;
  meta: {
    mobile?: string;
  };
}

export const useOtpStore = defineStore('otp', {
  state: (): OtpState => ({
    flowType: null,
    requestId: null,
    expireTime: null,
    verified: false,
    meta: {},
  }),

  actions: {
    setRequestId(id: string | null) {
      this.flowType = 'bank';
      this.requestId = id;
    },
    clearRequestId() {
      this.requestId = null;
    },
    setMobile(mobile: string) {
      this.flowType = 'backend';
      this.meta.mobile = mobile;
    },
    clearMobile() {
      this.meta.mobile = undefined;
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
      this.flowType = null;
      this.requestId = null;
      this.expireTime = null;
      this.verified = false;
      this.meta = {};
      localStorage.removeItem('otp_expire');
    },
    markVerified() {
      this.verified = true;
    },
  },
});
