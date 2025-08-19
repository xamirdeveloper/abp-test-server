import { api } from '@/utils/axios';
import type { ApiResponse } from '@/types/api';
import type {
  ConfirmOtpParams,
  ContractResponse,
  CreateRequestParams,
  CreateRequestResponse,
  EstelamSabtResponse,
  GetUserAllDataResponse,
  MobileNationalId,
  Province,
  SetPostalCodeParams,
  SetPostalCodeResponse,
  UserDetails,
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

export const estelamSabt = (request_id: string): Promise<ApiResponse<EstelamSabtResponse>> => {
  return api.post('estelam-sabt/', { request_id: request_id });
};

export const getProvinces = (): Promise<ApiResponse<Province[]>> => {
  return api.get('provinces/');
};

export const getCities = (pId: string): Promise<ApiResponse<Province[]>> => {
  return api.get('cities/', { params: { pId } });
};

export const getBirthIssuanceCities = (pId: string): Promise<ApiResponse<Province[]>> => {
  return api.get('cities/birth/', { params: { pId } });
};

export const setUserDetails = (payload: Partial<UserDetails>): Promise<ApiResponse> => {
  return api.post('set-user-details/', payload);
};

export const setPostalCode = (
  payload: SetPostalCodeParams
): Promise<ApiResponse<SetPostalCodeResponse>> => {
  return api.post('set-postalcode/', payload);
};

export const getVideoCaption = (
  request_id: string
): Promise<ApiResponse<{ video_caption: string }>> => {
  return api.post('video/caption/', { request_id: request_id });
};

export const getUserAllData = (
  request_id: string
): Promise<ApiResponse<GetUserAllDataResponse>> => {
  return api.post('get-data/', { request_id: request_id });
};

export const setFinalize = (request_id: string): Promise<ApiResponse> => {
  return api.post('set-finalize/', { request_id: request_id });
};

export const setUsernamePasswordStepOne = (payload: MobileNationalId): Promise<ApiResponse> => {
  return api.post('set-username-password-step1/', payload);
};
