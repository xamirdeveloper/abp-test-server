export interface CreateRequestParams {
  national_id: string;
  mobile: string;
  birthday: string;
}

export interface CreateRequestResponse {
  request_id: string;
}

export interface SendOtpResponse {
  timestamp: string;
  expiretime: string;
}

export interface ConfirmOtpParams {
  request_id: string;
  code: string;
}

export interface ContractResponse {
  contract_text: string;
}

export interface EstelamSabtResponse {
  birth_certificate_no: string;
  birth_certificate_series: string;
  birth_certificate_serial: string;
  father_name: string;
  full_name: string;
  gender: GenderCode;
}

export enum GenderCode {
  Male = '008',
  Female = '009',
}

export const GENDER_LABELS: Record<GenderCode, string> = {
  [GenderCode.Male]: 'مرد',
  [GenderCode.Female]: 'زن',
};

export interface Province {
  code: string;
  name: string;
}

export interface UserDetails {
  request_id: string;
  national_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  father_name: string;
  birth_certificate_number: string;
  national_card_serial: string;
  birth_location: string;
  issuance_location: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  sub_economic: string;
  occupation: string;
}

export interface SetPostalCodeParams {
  request_id: string;
  postal_code: string;
}

export interface SetPostalCodeResponse {
  province: string;
  city: string;
  address: string;
}

export interface GetUserAllDataResponse {
  address: string;
  birthCertificateLocation: string;
  birthCertificateNo: string;
  birthCertificateSerial: string;
  birthCertificateSeries: string;
  birthLocation: string;
  birthday: string;
  citizenShip: string;
  city: string;
  contractConfirmation: string;
  fatherName: string;
  firstName: string;
  gender: GenderCode;
  lastName: string;
  mobile: string;
  nationalCardExpireDate: string;
  nationalCardSerialNo: string;
  nationalId: string;
  occupation: string;
  postalCode: string;
  province: string;
  subEconomicSector: string;
}

export interface MobileNationalId {
  mobile: string;
  national_id: string;
}
