import type { TapuFeeResult } from "@/types";

const OFFICIAL_BUYER_RATE = 0.02;
const OFFICIAL_SELLER_RATE = 0.02;

export function calculateTapuFees(salePriceInTRY: number): TapuFeeResult {
  return {
    salePrice: salePriceInTRY,
    buyerFee: salePriceInTRY * OFFICIAL_BUYER_RATE,
    sellerFee: salePriceInTRY * OFFICIAL_SELLER_RATE,
    totalFee: salePriceInTRY * (OFFICIAL_BUYER_RATE + OFFICIAL_SELLER_RATE),
    buyerRate: OFFICIAL_BUYER_RATE,
    sellerRate: OFFICIAL_SELLER_RATE,
  };
}
