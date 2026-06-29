"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calculator, RotateCcw, Users, Percent, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import ResultShareBar from "@/components/calculator/ResultShareBar";
import { useCalculator } from "@/hooks/useCalculator";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatTRY, formatTRYSuffix } from "@/lib/formatters";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { CalculationMode, TapuFeeResult } from "@/types";

type CalculatorCardProps = {
  className?: string;
  compact?: boolean;
  /** Hero layout: larger card + preview panel before calculation */
  hero?: boolean;
  /** Set false when anchor id is on a parent wrapper */
  withAnchor?: boolean;
};

export default function CalculatorCard({
  className,
  compact = false,
  hero = false,
  withAnchor = true,
}: CalculatorCardProps) {
  const {
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
  } = useCalculator();
  const reducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  const canReset = showResults || inputValue.length > 0;

  const resultsPanel =
    showResults && result ? (
      <CalculatorResultsPanel
        result={result}
        calculationMode={calculationMode}
        compact={compact || hero}
      />
    ) : null;

  const previewPanel = hero && !showResults && !isLoading ? (
    <div className="hero-preview-panel max-sm:hidden">
      <HeroCalculatorPreview />
    </div>
  ) : null;

  return (
    <motion.div
      id={withAnchor ? "calculator" : undefined}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white saas-card-glow sm:rounded-3xl",
        withAnchor && "scroll-mt-24",
        hero
          ? "max-sm:max-h-none max-sm:overflow-visible max-h-[min(40rem,calc(100dvh-6.5rem))] overflow-y-auto px-4 py-2 shadow-xl shadow-primary/10 max-sm:px-3.5 sm:px-5 sm:py-2.5 lg:max-h-full lg:px-6 lg:py-3"
          : compact
            ? "max-h-[min(32rem,calc(100dvh-6.5rem))] p-4 sm:p-5"
            : "p-5 md:p-8",
        className
      )}
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...springSoft, delay: 0.2 }}
    >
      <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-3xl">
        <div className="h-full w-full animate-shimmer-border opacity-80" />
      </div>

      {hero && (
        <div className="hero-calculator-header mb-2 flex items-start gap-2.5 border-b border-border/70 pb-2 max-sm:mb-1.5 max-sm:gap-2 max-sm:pb-1.5 lg:mb-2 lg:pb-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-md max-sm:h-9 max-sm:w-9 lg:h-10 lg:w-10">
            <Calculator className="max-sm:scale-90" size={20} strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0 text-left">
            <p className="heading-page-h2 text-base max-sm:text-[0.9375rem] sm:text-lg">
              Tapu Harcı Hesaplayıcı
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-text-secondary max-sm:hidden sm:text-sm">
              Resmi %4 oranına göre alıcı ve satıcı paylarını anında görün.
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn(
          "hero-calculator-form shrink-0",
          compact || hero ? "space-y-4 max-sm:space-y-2.5" : "space-y-5"
        )}
      >
        <div>
          <label
            htmlFor="calculation-mode"
            className="mb-1.5 block text-center text-sm font-semibold text-text-primary sm:text-left"
          >
            Hesaplama Türü
          </label>
          <select
            id="calculation-mode"
            value={calculationMode}
            onChange={(e) =>
              setCalculationMode(e.target.value as CalculationMode)
            }
            className={cn(
              "w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm font-medium text-primary transition-all duration-300 focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 sm:text-base",
              compact && "py-2.5 text-sm",
              hero && "max-sm:py-2 max-sm:text-xs"
            )}
          >
            <option value="from-sale-price">
              Satış bedeline göre harç tutarını hesaplama
            </option>
            <option value="from-total-fee">
              Harç tutarı ve satış bedelini hesaplama
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="calculation-amount"
            className="mb-1.5 block text-center text-sm font-semibold text-text-primary sm:text-left"
          >
            {activeMode.inputLabel}
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
              id="calculation-amount"
              type="text"
              inputMode="numeric"
              placeholder={activeMode.inputPlaceholder}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className={cn(
                "w-full rounded-xl border-2 bg-surface px-4 text-center font-mono text-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/15 sm:text-left",
                hero
                  ? "py-3.5 text-xl max-sm:py-2.5 max-sm:text-lg sm:text-2xl"
                  : compact
                    ? "py-3 text-lg sm:text-xl"
                    : "py-3.5 text-xl sm:text-2xl",
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
              className={cn("w-full", (compact || hero) && "px-4 py-3.5 text-sm max-sm:py-2.5 max-sm:text-sm sm:text-base")}
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
        {resultsPanel ? (
          <motion.div
            key="results"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "min-h-0 overflow-y-auto",
              compact || hero ? "mt-4 pr-0.5" : "mt-8"
            )}
          >
            {resultsPanel}
          </motion.div>
        ) : previewPanel ? (
          <motion.div
            key="preview"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={cn("flex-1 min-h-0", hero ? "mt-2" : "mt-4")}
          >
            {previewPanel}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function HeroCalculatorPreview() {
  const rows = [
    { label: "Alıcı harcı", rate: "%2", color: "text-secondary" },
    { label: "Satıcı harcı", rate: "%2", color: "text-primary" },
    { label: "Toplam harç", rate: "%4", color: "text-btn", highlight: true },
  ];

  const features = [
    { icon: Percent, label: "Resmi %4 oran" },
    { icon: Users, label: "Alıcı + satıcı payı" },
    { icon: ShieldCheck, label: "Ücretsiz tahmin" },
  ];

  return (
    <div className="space-y-3 lg:space-y-2.5">
      <div className="rounded-2xl border border-dashed border-border/90 bg-gradient-to-b from-surface/80 to-white p-3 sm:p-4">
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-text-secondary sm:mb-3 sm:text-xs">
          Hesaplama özeti
        </p>
        <dl className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl px-3 py-2",
                row.highlight
                  ? "border border-accent/30 bg-orange-50/50"
                  : "bg-white/80"
              )}
            >
              <dt className={cn("text-xs font-medium sm:text-sm", row.color)}>
                {row.label}{" "}
                <span className="text-text-secondary">({row.rate})</span>
              </dt>
              <dd className="font-mono text-xs text-text-secondary/50 sm:text-sm">—</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-center text-[10px] leading-relaxed text-text-secondary sm:mt-3 sm:text-[11px]">
          Tutarı girip Hesapla&apos;ya basın — sonuçlar burada görünür.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 hero-preview-features">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-xl border border-border/70 bg-white px-1.5 py-2 text-center sm:gap-1.5 sm:px-2 sm:py-3"
          >
            <Icon size={15} className="text-btn" aria-hidden />
            <span className="text-[9px] font-semibold leading-tight text-text-primary sm:text-[11px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalculatorResultsPanel({
  result,
  calculationMode,
  compact,
}: {
  result: TapuFeeResult;
  calculationMode: CalculationMode;
  compact: boolean;
}) {
  return (
    <div
      className={cn(
        "border-t border-border/70",
        compact ? "mt-4 space-y-3 pt-4" : "mt-6 space-y-5 pt-6"
      )}
    >
      <ConclusionResults
        result={result}
        calculationMode={calculationMode}
        compact={compact}
      />

      <ResultShareBar
        result={result}
        salePriceLabel={formatTRY(result.salePrice)}
        compact={compact}
      />

      <p className="text-center text-[11px] leading-relaxed text-text-secondary">
        * Resmi %4 tapu harcı oranına dayalı tahmindir. Ödeme öncesi yerel tapu
        müdürlüğünden teyit edin.
      </p>
    </div>
  );
}

function ConclusionResults({
  result,
  calculationMode,
  compact,
}: {
  result: TapuFeeResult;
  calculationMode: CalculationMode;
  compact: boolean;
}) {
  const rows =
    calculationMode === "from-sale-price"
      ? [
          {
            label: "Alıcının ödeyeceği tapu harcı",
            value: formatTRYSuffix(result.buyerFee),
          },
          {
            label: "Satıcının ödeyeceği tapu harcı",
            value: formatTRYSuffix(result.sellerFee),
          },
          {
            label: "Toplam tapu harcı",
            value: formatTRYSuffix(result.totalFee),
          },
        ]
      : [
          {
            label: "Satış bedeli",
            value: formatTRYSuffix(result.salePrice),
          },
          {
            label: "Alıcının ödeyeceği tapu harcı",
            value: formatTRYSuffix(result.buyerFee),
          },
          {
            label: "Satıcının ödeyeceği tapu harcı",
            value: formatTRYSuffix(result.sellerFee),
          },
          {
            label: "Toplam tapu harcı",
            value: formatTRYSuffix(result.totalFee),
          },
        ];

  return (
    <div className={cn(compact ? "space-y-4" : "space-y-5")}>
      <h3
        className={cn(
          "heading-h3 text-center",
          compact && "text-xl sm:text-2xl md:text-2xl"
        )}
      >
        Sonuç
      </h3>

      <div
        className={cn(
          "space-y-2.5 text-primary",
          compact ? "text-sm sm:text-base" : "text-base sm:text-[1.0625rem]"
        )}
      >
        {rows.map((row) => (
          <p key={row.label} className="leading-relaxed">
            <span className="font-medium">{row.label}:</span>{" "}
            <span className="font-semibold tabular-nums">{row.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
