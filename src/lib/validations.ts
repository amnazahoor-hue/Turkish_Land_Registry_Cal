export function validateSalePrice(value: string): {
  valid: boolean;
  numericValue: number;
  error?: string;
} {
  return validateAmount(value);
}

export function validateAmount(value: string): {
  valid: boolean;
  numericValue: number;
  error?: string;
} {
  const trimmed = value.trim();
  if (!trimmed) {
    return {
      valid: false,
      numericValue: 0,
      error: "Lütfen geçerli bir tutar girin",
    };
  }

  const numericValue = parseFloat(trimmed.replace(/\./g, "").replace(",", "."));
  if (isNaN(numericValue) || numericValue <= 0) {
    return {
      valid: false,
      numericValue: 0,
      error: "Lütfen geçerli bir tutar girin",
    };
  }

  return { valid: true, numericValue };
}
