export function validateSalePrice(value: string): {
  valid: boolean;
  numericValue: number;
  error?: string;
} {
  const trimmed = value.trim();
  if (!trimmed) {
    return { valid: false, numericValue: 0, error: "Please enter a valid amount" };
  }

  const numericValue = parseFloat(trimmed.replace(/\./g, "").replace(",", "."));
  if (isNaN(numericValue) || numericValue <= 0) {
    return { valid: false, numericValue: 0, error: "Please enter a valid amount" };
  }

  return { valid: true, numericValue };
}
