import { defineStore } from 'pinia';
import { login, refresh } from '@/api/account-setup';
import type { LoginParams, LoginResponse } from '@/api/account-setup/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    clearAccessToken() {
      this.accessToken = null;
      localStorage.removeItem('accessToken');
    },
    async loginAction(credentials: LoginParams) {
      const res = await login(credentials);
      const token = res.data?.access;

      if (token) {
        this.setAccessToken(token);
      } else {
        throw new Error('Access token دریافت نشد');
      }

      return res;
    },
    async refreshAction() {
      const res = await refresh();
      const token = res.data?.access;

      if (token) {
        this.setAccessToken(token);
      } else {
        this.logout();
        throw new Error('تازه‌سازی توکن موفق نبود');
      }

      return res;
    },
    logout() {
      this.clearAccessToken();
      window.location.href = '/login';
    },
  },
});
