import { formatTRY } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import type { TapuFeeResult } from "@/types";

export function buildResultSummary(
  result: TapuFeeResult,
  salePriceLabel: string
): string {
  return [
    "TapuCalc — Tapu Harcı Tahmini",
    "",
    `Mülk Satış Fiyatı: ${salePriceLabel}`,
    `Alıcı Harcı (%2): ${formatTRY(result.buyerFee)}`,
    `Satıcı Harcı (%2): ${formatTRY(result.sellerFee)}`,
    `Toplam Harç (%4): ${formatTRY(result.totalFee)}`,
    "",
    "Resmi %4 oran (%2 alıcı + %2 satıcı). Ödemeden önce tapu müdürlüğünüzle teyit edin.",
    SITE_URL,
  ].join("\n");
}

export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getEmailShareUrl(subject: string, body: string): string {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
