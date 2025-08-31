export const toPersianDigits = (val: string | number): string =>
  val.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

export const toEnglishDigits = (val: string): string =>
  val.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
