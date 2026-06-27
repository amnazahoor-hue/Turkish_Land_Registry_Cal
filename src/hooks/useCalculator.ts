"use client";

import { useCallback, useState } from "react";
import {
  calculateTapuFees,
  calculateTapuFeesFromTotalFee,
} from "@/lib/calculator";
import { formatInputThousands } from "@/lib/formatters";
import { validateAmount } from "@/lib/validations";
import type { CalculationMode, TapuFeeResult } from "@/types";

export const CALCULATION_MODE_OPTIONS: {
  value: CalculationMode;
  label: string;
  inputLabel: string;
  inputPlaceholder: string;
}[] = [
  {
    value: "from-sale-price",
    label: "Satış bedeline göre harç tutarını hesaplama",
    inputLabel: "Gayrimenkul Satış Bedeli (TRY)",
    inputPlaceholder: "örn. 5.000.000",
  },
  {
    value: "from-total-fee",
    label: "Harç tutarı ve satış bedelini hesaplama",
    inputLabel: "Toplam Tapu Harcı (TRY)",
    inputPlaceholder: "örn. 200.000",
  },
];

export function useCalculator() {
  const [inputValue, setInputValue] = useState("");
  const [calculationMode, setCalculationModeState] =
    useState<CalculationMode>("from-sale-price");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TapuFeeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const activeMode =
    CALCULATION_MODE_OPTIONS.find((m) => m.value === calculationMode) ??
    CALCULATION_MODE_OPTIONS[0];

  const handleInputChange = useCallback((value: string) => {
    const formatted = formatInputThousands(value);
    setInputValue(formatted);
    setError(null);
  }, []);

  const setCalculationMode = useCallback((mode: CalculationMode) => {
    setCalculationModeState(mode);
    setError(null);
    setResult(null);
    setShowResults(false);
  }, []);

  const calculate = useCallback(async () => {
    const validation = validateAmount(inputValue);
    if (!validation.valid) {
      setError(validation.error ?? "Lütfen geçerli bir tutar girin");
      setShowResults(false);
      setResult(null);
      return;
    }

    setIsLoading(true);
    setShowResults(false);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const fees =
      calculationMode === "from-sale-price"
        ? calculateTapuFees(validation.numericValue)
        : calculateTapuFeesFromTotalFee(validation.numericValue);

    setResult(fees);
    setIsLoading(false);
    setShowResults(true);
  }, [inputValue, calculationMode]);

  const reset = useCallback(() => {
    setInputValue("");
    setError(null);
    setResult(null);
    setShowResults(false);
  }, []);

  return {
    inputValue,
    calculationMode,
    activeMode,
    error,
    result,
    isLoading,
    showResults,
    handleInputChange,
    setCalculationMode,
    calculate,
    reset,
  };
}
