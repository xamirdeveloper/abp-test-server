import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { type ApiResponse } from '~/types/api';
import { useToast } from 'vue-toastification';

const toast = useToast();

export interface ApiError {
  status: 'error';
  message: string;
  code: string | number;
  data?: any;
  httpStatus?: number;
}

export const api: AxiosInstance = axios.create({
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
  (response: AxiosResponse<any>): any => {
    const res: ApiResponse = response.data;

    if (res.status === 'error') {
      toast.error(res.message);

      const backendError: ApiError = {
        status: 'error',
        message: res.message,
        code: res.code,
        data: res.data,
        httpStatus: response.status,
      };
      return Promise.reject(backendError);
    }

    return res;
  },
  (error: any) => {
    if (error.response) {
      const status = error.response.status;
      const res = error.response.data;

      if (res?.status === 'error') {
        toast.error(res.message || 'خطای ناشناخته سمت سرور.');

        const apiErr: ApiError = {
          status: 'error',
          message: res.message || 'خطای ناشناخته سمت سرور.',
          code: res.code ?? status,
          data: res.data,
          httpStatus: status,
        };
        return Promise.reject(apiErr);
      }

      const map: Record<number, string> = {
        400: 'درخواست نامعتبر بود.',
        401: 'نیاز به ورود دوباره دارید.',
        403: 'شما دسترسی ندارید.',
        404: 'مورد یافت نشد.',
        500: 'خطای داخلی سرور.',
      };

      toast.error(map[status] || `خطای ناشناخته با کد ${status}`);

      const genericError: ApiError = {
        status: 'error',
        message: map[status] || `خطای ناشناخته با کد ${status}`,
        code: status,
        httpStatus: status,
      };

      if (status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
      }

      return Promise.reject(genericError);
    }

    if (error.request) {
      toast.error('ارتباط با سرور برقرار نشد.');

      const networkError: ApiError = {
        status: 'error',
        message: 'ارتباط با سرور برقرار نشد.',
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(networkError);
    }

    toast.error('خطای نامشخص.');

    const unknownError: ApiError = {
      status: 'error',
      message: 'خطای نامشخص.',
      code: 'UNKNOWN',
    };
    return Promise.reject(unknownError);
  }
);
