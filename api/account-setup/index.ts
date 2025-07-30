import { api } from '@/utils/axios';
import type { ApiResponse } from '@/types/api';
import type {
  ConfirmOtpParams,
  ContractResponse,
  CreateRequestParams,
  CreateRequestResponse,
} from './types';

export const createRequest = (
  payload: CreateRequestParams
): Promise<ApiResponse<CreateRequestResponse>> => {
  return api.post('create-request/', payload);
};

export const sendOtp = (request_id: string): Promise<ApiResponse> => {
  return api.post('sms/send-otp/', { request_id: request_id });
};

export const confirmOtp = (payload: ConfirmOtpParams): Promise<ApiResponse> => {
  return api.post('sms/confirm-otp/', payload);
};

export const contract = (): Promise<ApiResponse<ContractResponse>> => {
  return api.get('contract/');
};

export const contractConfirm = (request_id: string): Promise<ApiResponse> => {
  return api.post('contract/confirm/', { request_id: request_id });
};

export const estelamSabt = (request_id: string): Promise<ApiResponse> => {
  return api.post('estelam-sabt/', { request_id: request_id });
};
