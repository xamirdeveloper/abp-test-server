import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { type ApiResponse } from '~/types/api';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();

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
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
  async (error: any) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await api.post('/auth/refresh');
        const newToken = refreshRes.data.accessToken;
        authStore.setAccessToken(newToken);

        processQueue(null, newToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        const currentPath = router.currentRoute.value.fullPath;
        localStorage.setItem('redirectAfterLogin', currentPath);
        authStore.logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      const status = error.response.status;
      const res = error.response.data;

      const map: Record<number, string> = {
        400: 'درخواست نامعتبر بود.',
        403: 'شما دسترسی ندارید.',
        404: 'مورد یافت نشد.',
        500: 'خطای داخلی سرور.',
      };

      toast.error(res?.message || map[status] || `خطای ناشناخته با کد ${status}`);

      return Promise.reject({
        status: 'error',
        message: res?.message || map[status] || `خطای ناشناخته با کد ${status}`,
        code: res?.code ?? status,
        data: res?.data,
        httpStatus: status,
      } as ApiError);
    }

    if (error.request) {
      toast.error('ارتباط با سرور برقرار نشد.');
      return Promise.reject({
        status: 'error',
        message: 'ارتباط با سرور برقرار نشد.',
        code: 'NETWORK_ERROR',
      } as ApiError);
    }

    toast.error('خطای نامشخص.');
    return Promise.reject({
      status: 'error',
      message: 'خطای نامشخص.',
      code: 'UNKNOWN',
    } as ApiError);
  }
);
