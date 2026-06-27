"use client";

import Image from "next/image";
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
      className="hero-bg hero-mesh relative overflow-hidden border-b border-border/80 scroll-mt-24 pt-20 max-sm:pt-24 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-[0.22] sm:object-right sm:opacity-[0.2] lg:opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/78 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
      </div>
      <FloatingOrbs />

      <div className="page-container relative pb-16 pt-8 max-sm:pb-16 max-sm:pt-10 sm:pt-10 md:pb-20 md:pt-12 lg:pb-24 lg:pt-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            className="mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUpBlur}
              transition={springSoft}
              className="font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-primary sm:text-5xl md:text-[3.25rem] lg:text-6xl xl:text-[3.75rem]"
            >
              Tapu Harcı Hesaplama{" "}
              <span className="text-gradient-hero">
                Tam Olarak Ne Kadar Ödeyeceğinizi Görün
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              transition={springSoft}
              className="mt-5 text-lg leading-relaxed text-text-secondary md:text-xl lg:text-[1.35rem]"
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
                  className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-border bg-white/90 px-4 py-2.5 text-base font-medium text-text-primary shadow-sm backdrop-blur-sm"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-btn/10 text-sm font-bold text-btn">
                    ✓
                  </span>
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-none lg:pl-4">
            <CalculatorCard hero />
          </div>
        </div>
      </div>

      <MarqueeStrip />
    </section>
  );
}
