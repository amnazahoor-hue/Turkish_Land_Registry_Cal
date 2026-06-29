"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CalculatorCard from "@/components/calculator/CalculatorCard";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/lib/routes";
import { fadeUpBlur, staggerContainer, springSoft } from "@/lib/motion";

const trustBadges = ["Resmi %4 Oran", "Ücretsiz Kullanım", "Anında Sonuç"];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="hero-bg hero-mesh hero-landscape-tight relative overflow-x-hidden border-b border-border/80 scroll-mt-24 pt-20 max-sm:pt-[4.25rem] md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-background.webp"
          alt="Tapu harcı hesaplama — mülk devir işlemi arka plan görseli"
          title="Tapu harcı hesaplama — mülk devir işlemi arka plan görseli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-[0.22] sm:object-right sm:opacity-[0.2] lg:opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/78 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
      </div>
      <FloatingOrbs />

      <div className="hero-landscape-tight__inner page-container relative pb-12 pt-8 max-sm:pb-2 max-sm:pt-2 sm:pt-10 md:pb-20 md:pt-12 lg:pb-24 lg:pt-14">
        <div className="hero-landscape-tight__grid grid grid-cols-1 items-center gap-6 max-sm:gap-2.5 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-12">
          <motion.div
            className="hero-nest-hub__content mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUpBlur}
              transition={springSoft}
              className="heading-h1 hero-nest-hub__title"
            >
              Tapu Harcı Hesaplama{" "}
              <span className="text-gradient-hero">
                Tam Olarak Ne Kadar Ödeyeceğinizi Görün
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              transition={springSoft}
              className="hero-nest-hub__text mt-5 text-base leading-relaxed text-text-secondary md:text-lg lg:text-xl"
            >
              Tapu kayıt ücretinizi hesaplayın ve mülk devrinden önce alıcı ve
              satıcının tam olarak ne kadar ödemesi gerektiğini öğrenin.{" "}
              <Link
                href={ROUTES.about}
                className="text-secondary underline-offset-2 hover:underline"
              >
                Aracımız
              </Link>{" "}
              doğru bir hesaplama sağlar. Tapu harcı hesaplama beyan ettiğiniz
              mülk değerine göre hesaplanır. Devir gününde sürpriz fatura yok;
              hemen deneyin!
            </motion.p>

            <motion.div
              id="calculator"
              variants={fadeUpBlur}
              transition={springSoft}
              className="hero-nest-hub__mobile-calc mt-6 w-full max-w-md scroll-mt-24 max-sm:mt-2 sm:max-w-lg lg:hidden"
            >
              <CalculatorCard hero withAnchor={false} />
            </motion.div>

            <motion.div
              variants={fadeUpBlur}
              transition={springSoft}
              className="hero-nest-hub__badges mt-4 flex flex-nowrap justify-center gap-1.5 sm:mt-5 sm:gap-2 lg:mt-7 lg:flex-wrap lg:justify-start lg:gap-2.5"
            >
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, ...springSoft }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="inline-flex shrink-0 cursor-default items-center gap-1.5 rounded-full border border-border bg-white/90 px-2.5 py-1.5 text-[11px] font-medium text-text-primary shadow-sm backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2 sm:text-xs lg:gap-2.5 lg:px-4 lg:py-2.5 lg:text-base"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-btn/10 text-[10px] font-bold text-btn sm:h-6 sm:w-6 sm:text-sm">
                    ✓
                  </span>
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="hero-landscape-tight__calculator relative mx-auto hidden min-w-0 w-full max-w-md sm:max-w-lg lg:mx-0 lg:flex lg:max-w-none lg:pl-2">
            <CalculatorCard hero className="hero-landscape-tight__card w-full" />
          </div>
        </div>
      </div>

      <div className="hero-landscape-tight__marquee">
        <MarqueeStrip className="hero-marquee-strip" />
      </div>
    </section>
  );
}
