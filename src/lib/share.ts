import { formatTRY } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import type { TapuFeeResult } from "@/types";

export function buildResultSummary(
  result: TapuFeeResult,
  salePriceLabel: string
): string {
  return [
    "TapuCalc — Title Deed Fee Estimate",
    "",
    `Property Sale Price: ${salePriceLabel}`,
    `Buyer Fee (2%): ${formatTRY(result.buyerFee)}`,
    `Seller Fee (2%): ${formatTRY(result.sellerFee)}`,
    `Total Fee (4%): ${formatTRY(result.totalFee)}`,
    "",
    "Official 4% rate (2% buyer + 2% seller). Confirm with your land registry office before paying.",
    SITE_URL,
  ].join("\n");
}

export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getEmailShareUrl(subject: string, body: string): string {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
