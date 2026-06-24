"use client";

import { motion } from "framer-motion";
import CalculatorCard from "@/components/calculator/CalculatorCard";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUpBlur, staggerContainer, springSoft } from "@/lib/motion";

const trustBadges = ["Official 4% Rate", "Free to Use", "Instant Results"];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="hero-bg hero-mesh relative overflow-hidden border-b border-border/80 scroll-mt-24 pt-16 max-sm:pt-20 md:pt-20"
    >
      <FloatingOrbs />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent"
        aria-hidden
      />

      <div className="page-container relative pb-12 pt-2 max-sm:pt-5 sm:pt-3 md:pb-16 md:pt-4 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            className="mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUpBlur}
              transition={springSoft}
              className="font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-[3rem]"
            >
              Tapu Harcı Hesaplama{" "}
              <span className="text-gradient-hero">
                Tam Olarak Ne Kadar Ödeyeceğinizi Görün
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg"
            >
              Tapu kayıt ücretinizi hesaplayın ve mülk devrinden önce alıcı ve
              satıcının tam olarak ne kadar ödemesi gerektiğini öğrenin. Aracımız
              doğru bir hesaplama sağlar. Tapu harcı hesaplama beyan ettiğiniz
              mülk değerine göre hesaplanır. Devir gününde sürpriz fatura yok;
              hemen deneyin!
            </motion.p>

            <motion.div
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start"
            >
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, ...springSoft }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="inline-flex cursor-default items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-2 text-sm font-medium text-text-primary shadow-sm backdrop-blur-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-btn/10 text-xs font-bold text-btn">
                    ✓
                  </span>
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-none lg:self-start lg:pl-4">
            <CalculatorCard compact />
          </div>
        </div>
      </div>

      <MarqueeStrip />
    </section>
  );
}
