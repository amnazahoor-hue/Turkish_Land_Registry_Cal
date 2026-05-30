"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Sigma } from "lucide-react";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ResultShareBar from "@/components/calculator/ResultShareBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCalculator } from "@/hooks/useCalculator";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatTRY } from "@/lib/formatters";
import { springBouncy, springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

export default function ToolSection() {
  const {
    inputValue,
    error,
    result,
    isLoading,
    showResults,
    handleInputChange,
    calculate,
  } = useCalculator();
  const reducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  return (
    <section
      id="calculator"
      className="section-pad relative scroll-mt-24 overflow-hidden bg-surface sm:scroll-mt-28"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />

      <div className="page-container-narrow relative">
        <ScrollReveal>
          <div className="section-heading mb-6 sm:mb-8">
            <motion.span
              className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary"
              whileInView={{ scale: [0.9, 1] }}
              viewport={{ once: true }}
            >
              Calculator
            </motion.span>
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
              Title Deed Fee Calculator
            </h2>
            <p className="mt-3 text-text-secondary">
              Calculate buyer and seller fees at the official 4% total rate
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 saas-card-glow sm:rounded-3xl sm:p-8 md:p-10 lg:p-12"
            whileInView={reducedMotion ? {} : { y: [20, 0] }}
            viewport={{ once: true }}
            transition={springSoft}
          >
            <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-3xl">
              <div className="h-full w-full animate-shimmer-border opacity-80" />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
              <div>
                <label
                  htmlFor="sale-price"
                  className="mb-2 block text-center text-sm font-semibold text-text-primary sm:text-left"
                >
                  Property Sale Price (TRY)
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
                    placeholder="e.g. 5.000.000"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border-2 bg-surface px-4 py-3.5 text-center font-mono text-xl text-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/15 sm:py-4 sm:text-left sm:text-2xl",
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
                    className="mt-2 text-center text-sm text-error sm:text-left"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.div whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Calculate
                </Button>
              </motion.div>
            </form>

            <AnimatePresence mode="wait">
              {showResults && result && (
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, height: 0, filter: "blur(8px)" }
                  }
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-10 space-y-6 overflow-hidden"
                >
                  <motion.div
                    className="space-y-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.12 },
                      },
                    }}
                  >
                    <ResultCard
                      icon={<User className="text-btn" size={24} />}
                      label="Buyer Fee (2%)"
                      value={result.buyerFee}
                    />
                    <ResultCard
                      icon={<Users className="text-secondary" size={24} />}
                      label="Seller Fee (2%)"
                      value={result.sellerFee}
                    />
                    <ResultCard
                      icon={<Sigma className="text-accent" size={24} />}
                      label="Total Fee (4%)"
                      value={result.totalFee}
                      highlighted
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, ...springSoft }}
                  >
                    <ResultShareBar
                      result={result}
                      salePriceLabel={formatTRY(result.salePrice)}
                    />
                  </motion.div>

                  <p className="text-center text-xs leading-relaxed text-text-secondary">
                    * This estimate uses the official 4% title deed fee rate.
                    Confirm current rates with your local land registry office
                    before paying.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ResultCard({
  icon,
  label,
  value,
  highlighted,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -24, scale: 0.96 },
        visible: { opacity: 1, x: 0, scale: 1 },
      }}
      transition={springBouncy}
      whileHover={{ scale: 1.01, x: 4 }}
      className={cn(
        "flex min-w-0 flex-col items-center gap-3 rounded-2xl border p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5 sm:text-left",
        highlighted
          ? "border-2 border-accent bg-orange-50/50 shadow-md"
          : "border-border bg-surface/50"
      )}
    >
      <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <motion.div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={springBouncy}
        >
          {icon}
        </motion.div>
        <p className="text-sm font-semibold text-text-primary sm:text-base">
          {label}
        </p>
      </div>
      <div className="min-w-0 w-full sm:max-w-[55%] sm:text-right">
        <AnimatedCounter
          value={value}
          highlight={highlighted}
          className="text-center sm:text-right"
        />
      </div>
    </motion.div>
  );
}
