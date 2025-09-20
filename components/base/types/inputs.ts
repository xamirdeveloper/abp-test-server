export interface BaseInputProps {
  modelValue: string | number | undefined;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'text' | 'number' | 'password';
  id?: string;
  maxlength?: number;
  readonly?: boolean;
  autocomplete?: string;
  name?: string;
}
