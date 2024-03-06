export const capitalizeWord = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);
export const commaSeperatedNumberFormat = (value: number) =>
  new Intl.NumberFormat().format(value);
export const actualAmountValue = (value: number) =>
  commaSeperatedNumberFormat(+Number(value / 100).toFixed(2)) + ".00";
export const getShortCount = (count: number) => {
  const intlFormat = (num: number) => {
    return new Intl.NumberFormat().format(Math.floor(num * 10) / 10);
  };

  if (count >= 1000000) return intlFormat(count / 1000000) + "M";
  if (count >= 1000) return intlFormat(count / 1000) + "k";
  return intlFormat(count);
};
