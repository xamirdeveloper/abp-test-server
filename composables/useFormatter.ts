export function useMoneyFormatter() {
  const formatMoney = (value: string): string => {
    const number = parseInt(value.replace(/,/g, '')) || 0;
    return number.toLocaleString('fa-IR');
  };

  const unformatMoney = (formatted: string): string => {
    return formatted.replace(/,/g, '').replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
  };

  return { formatMoney, unformatMoney };
}
