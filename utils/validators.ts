export function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

export function isValidIranianNationalId(nationalId: string | number): boolean {
  const id = nationalId.toString().padStart(10, '0');

  if (!/^\d{10}$/.test(id)) return false;

  if (/^(\d)\1{9}$/.test(id)) return false;

  const checkDigit = parseInt(id[9], 10);
  const sum = id
    .split('')
    .slice(0, 9)
    .reduce((acc, digit, index) => acc + parseInt(digit, 10) * (10 - index), 0);

  const remainder = sum % 11;

  return (
    (remainder < 2 && checkDigit === remainder) || (remainder >= 2 && checkDigit === 11 - remainder)
  );
}

export function isValidIranianMobile(mobile: string | number): boolean {
  const phone = mobile.toString();

  const regex = /^(?:\+98|0)?9\d{9}$/;
  return regex.test(phone);
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
}

export function isPersianText(text: string): boolean {
  const regex = /^[\u0600-\u06FF\s]+$/;
  return regex.test(text);
}
