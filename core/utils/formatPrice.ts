/**
 * Formats a number or numeric string into a price-friendly string.
 *
 * Handles large numbers with comma separators and small fractional values with dynamic precision.
 * For values:
 * - `>= 1`: it adds comma separators and shows 2 decimal places (removes trailing `.00`).
 * - `< 1`: it counts leading zeros after the decimal point and shows the next 2 meaningful digits (up to a cap of 12 decimals).
 * - `0` or `NaN` or invalid inputs: returns a dash (`"-"`) as a placeholder.
 *
 * @param input - The value to format (string or number).
 * @returns A formatted price string (e.g. "1,234.56", "0.0000123", "-").
 */
export const formatPrice = (input: string | number): string => {
  const value = Number(input);

  // Return "-" for invalid or zero values
  if (isNaN(value)) return "-";
  if (value === 0) return "-";

  const absValue = Math.abs(value);

  // For values >= 1, format with comma separators and 2 decimals
  if (absValue >= 1) {
    return value
      .toFixed(2) // Fix to 2 decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Add comma separators
      .replace(/\.00$/, ""); // Remove .00 if the number is whole
  }

  // For values < 1, generate a decimal string with high precision
  const decimalString = absValue.toFixed(20); // Ensures small numbers are not in scientific notation
  const [, fractionPart = ""] = decimalString.split("."); // Extract fraction digits after the decimal

  // Count leading zeros in the decimal part
  const leadingZeros = fractionPart.match(/^0+/)?.[0].length || 0;

  // Dynamically set decimal precision: leading zeros + 2 meaningful digits, max 12 decimals
  const dynamicDecimals = Math.min(leadingZeros + 2, 12);

  // Format the number with dynamic decimal places and remove trailing zeros
  return value.toFixed(dynamicDecimals).replace(/\.?0+$/, ""); // Remove trailing zeros and optional dot
};
