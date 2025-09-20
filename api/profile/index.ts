import { api } from '@/utils/axios';
import type { ApiResponse } from '@/types/api';
import type { ChangePasswordParams } from './types';

export const changeUsername = (newUsername: string): Promise<ApiResponse> => {
  return api.post('profile/change-username/', { newUsername: newUsername });
};

export const changePassword = (payload: ChangePasswordParams): Promise<ApiResponse> => {
  return api.post('profile/change-password/', payload);
};
