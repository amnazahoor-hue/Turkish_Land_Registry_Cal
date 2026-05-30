"use client";

import { useCallback, useState } from "react";
import { calculateTapuFees } from "@/lib/calculator";
import { formatInputThousands } from "@/lib/formatters";
import { validateSalePrice } from "@/lib/validations";
import type { TapuFeeResult } from "@/types";

export function useCalculator() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TapuFeeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = useCallback((value: string) => {
    const formatted = formatInputThousands(value);
    setInputValue(formatted);
    setError(null);
  }, []);

  const calculate = useCallback(async () => {
    const validation = validateSalePrice(inputValue);
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

    const fees = calculateTapuFees(validation.numericValue);
    setResult(fees);
    setIsLoading(false);
    setShowResults(true);
  }, [inputValue]);

  const reset = useCallback(() => {
    setInputValue("");
    setError(null);
    setResult(null);
    setShowResults(false);
  }, []);

  return {
    inputValue,
    error,
    result,
    isLoading,
    showResults,
    handleInputChange,
    calculate,
    reset,
  };
}
