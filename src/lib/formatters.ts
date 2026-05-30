export function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatTRYForPdf(amount: number): string {
  const n = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `TRY ${n}`;
}

export function parseFormattedNumber(value: string): number {
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

export function formatInputThousands(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getAmountSizeClass(amount: number, highlight = false): string {
  const len = formatTRY(amount).length;
  if (len > 20) {
    return highlight
      ? "text-sm font-bold text-accent sm:text-base"
      : "text-xs font-bold text-primary sm:text-sm";
  }
  if (len > 16) {
    return highlight
      ? "text-base font-bold text-accent sm:text-lg"
      : "text-sm font-bold text-primary sm:text-base";
  }
  if (len > 12) {
    return highlight
      ? "text-lg font-bold text-accent sm:text-xl"
      : "text-base font-bold text-primary sm:text-lg";
  }
  return highlight
    ? "text-xl font-bold text-accent sm:text-2xl"
    : "text-lg font-bold text-primary sm:text-xl";
}
