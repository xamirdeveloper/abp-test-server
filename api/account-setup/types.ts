export interface CreateRequestParams {
  national_id: string;
  mobile: string;
  birthday: string;
}

export interface CreateRequestResponse {
  request_id: string;
}

export interface ConfirmOtpParams {
  request_id: string;
  code: string;
}

export interface ContractResponse {
  contract_text: string;
}
