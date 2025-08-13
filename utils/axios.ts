import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status === 'success') {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const res = error.response.data;

      if (status === 500 && res?.status === 'error') {
        return Promise.reject(res);
      }

      const map: Record<number, string> = {
        400: 'درخواست نامعتبر بود.',
        401: 'نیاز به ورود دوباره دارید.',
        403: 'شما دسترسی ندارید.',
        404: 'مورد یافت نشد.',
      };

      return Promise.reject(new Error(map[status] || `خطای ناشناخته با کد ${status}`));
    }

    if (error.request) {
      return Promise.reject(new Error('ارتباط با سرور برقرار نشد.'));
    }

    return Promise.reject(new Error('خطای نامشخص.'));
  }
);
