export const toPersianDigits = (val: string | number): string => {
  return val.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

export const toEnglishDigits = (val: string = ''): string => {
  return (
    val
      // اعداد فارسی
      .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      // اعداد عربی
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
  );
};

export const toEnglishChars = (val: string = ''): string => {
  return val.replace(/[^A-Za-z0-9!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|`~]/g, '');
};
