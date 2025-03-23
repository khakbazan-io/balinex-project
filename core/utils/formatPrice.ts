export const formatPrice = (input: string | number): string => {
  const value = Number(input);
  if (isNaN(value)) {
    return "-";
  }
  if (value === 0) {
    return "-";
  }

  const absValue = Math.abs(value);

  if (absValue >= 1) {
    return value
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .replace(/\.00$/, "");
  }

  const decimalString = absValue.toFixed(20);
  const [, fractionPart = ""] = decimalString.split(".");
  const leadingZeros = fractionPart.match(/^0+/)?.[0].length || 0;

  const dynamicDecimals = Math.min(leadingZeros + 2, 12);

  return value.toFixed(dynamicDecimals).replace(/\.?0+$/, "");
};
