"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import ResultShareBar from "@/components/calculator/ResultShareBar";
import { useCalculator } from "@/hooks/useCalculator";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatTRY } from "@/lib/formatters";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

type CalculatorCardProps = {
  className?: string;
  compact?: boolean;
};

export default function CalculatorCard({
  className,
  compact = false,
}: CalculatorCardProps) {
  const {
    inputValue,
    error,
    result,
    isLoading,
    showResults,
    handleInputChange,
    calculate,
    reset,
  } = useCalculator();
  const reducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  const canReset = showResults || inputValue.length > 0;

  return (
    <motion.div
      id="calculator"
      className={cn(
        "relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border bg-white saas-card-glow sm:rounded-3xl",
        compact ? "max-h-[min(32rem,calc(100dvh-6.5rem))] p-4 sm:p-5" : "p-5 md:p-8",
        className
      )}
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...springSoft, delay: 0.2 }}
    >
      <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-3xl">
        <div className="h-full w-full animate-shimmer-border opacity-80" />
      </div>

      <form onSubmit={handleSubmit} className={cn("shrink-0", compact ? "space-y-3" : "space-y-5")}>
        <div>
          <label
            htmlFor="sale-price"
            className="mb-1.5 block text-center text-sm font-semibold text-text-primary sm:text-left"
          >
            Gayrimenkul Satış Bedeli (TRY)
          </label>
          <motion.div
            animate={
              error
                ? { x: [0, -6, 6, -4, 4, 0] }
                : isLoading
                  ? { scale: [1, 1.01, 1] }
                  : {}
            }
            transition={{ duration: 0.4 }}
          >
            <input
              id="sale-price"
              type="text"
              inputMode="numeric"
              placeholder="örn. 5.000.000"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className={cn(
                "w-full rounded-xl border-2 bg-surface px-4 text-center font-mono text-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/15 sm:text-left",
                compact ? "py-3 text-lg sm:text-xl" : "py-3.5 text-xl sm:text-2xl",
                error
                  ? "border-error"
                  : "border-border focus:border-secondary"
              )}
              aria-invalid={!!error}
              aria-describedby={error ? "price-error" : undefined}
            />
          </motion.div>
          {error && (
            <motion.p
              id="price-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-center text-sm text-error sm:text-left"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3">
          <motion.div whileTap={{ scale: 0.99 }} className="min-w-0 flex-1">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className={cn("w-full", compact && "px-4 py-3 text-sm")}
            >
              Hesapla
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.99 }} className="shrink-0">
            <Button
              type="button"
              variant="ghost"
              onClick={reset}
              disabled={!canReset || isLoading}
              className={cn(
                "h-full gap-1.5 whitespace-nowrap",
                compact ? "px-3 py-3 text-sm" : "px-5 py-3"
              )}
              aria-label="Hesaplayıcıyı sıfırla"
            >
              <RotateCcw size={compact ? 16 : 18} aria-hidden />
              Sıfırla
            </Button>
          </motion.div>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {showResults && result && (
          <motion.div
            initial={
              reducedMotion ? false : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "min-h-0 overflow-y-auto",
              compact ? "mt-3 space-y-3 pr-0.5" : "mt-8 space-y-5"
            )}
          >
            <div
              className={cn(
                "rounded-xl border bg-surface/60",
                compact ? "p-3" : "space-y-3 p-4"
              )}
            >
              {compact ? (
                <CompactResults result={result} />
              ) : (
                <ExpandedResults result={result} />
              )}
            </div>

            <ResultShareBar
              result={result}
              salePriceLabel={formatTRY(result.salePrice)}
              compact={compact}
            />

            <p className="text-center text-[11px] leading-relaxed text-text-secondary">
              * Resmi %4 tapu harcı oranına dayalı tahmindir. Ödeme öncesi yerel
              tapu müdürlüğünden teyit edin.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CompactResults({ result }: { result: { buyerFee: number; sellerFee: number; totalFee: number } }) {
  return (
    <dl className="space-y-1.5 text-sm">
      <div className="flex items-center justify-between gap-3">
        <dt className="text-text-secondary">Alıcı harcı (%2)</dt>
        <dd className="font-mono font-semibold text-text-primary">
          {formatTRY(result.buyerFee)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-3">
        <dt className="text-text-secondary">Satıcı harcı (%2)</dt>
        <dd className="font-mono font-semibold text-text-primary">
          {formatTRY(result.sellerFee)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/80 pt-2">
        <dt className="font-semibold text-primary">Toplam harç (%4)</dt>
        <dd className="font-mono text-base font-bold text-accent">
          {formatTRY(result.totalFee)}
        </dd>
      </div>
    </dl>
  );
}

function ExpandedResults({
  result,
}: {
  result: { buyerFee: number; sellerFee: number; totalFee: number };
}) {
  return (
    <dl className="space-y-3">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-4">
        <dt className="font-semibold text-text-primary">Alıcı harcı (%2)</dt>
        <dd className="font-mono text-lg font-semibold text-text-primary">
          {formatTRY(result.buyerFee)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-4">
        <dt className="font-semibold text-text-primary">Satıcı harcı (%2)</dt>
        <dd className="font-mono text-lg font-semibold text-text-primary">
          {formatTRY(result.sellerFee)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-accent bg-orange-50/50 p-4 shadow-sm">
        <dt className="font-semibold text-primary">Toplam harç (%4)</dt>
        <dd className="font-mono text-xl font-bold text-accent">
          {formatTRY(result.totalFee)}
        </dd>
      </div>
    </dl>
  );
}
