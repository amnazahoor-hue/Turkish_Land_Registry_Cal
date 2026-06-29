"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { springSoft } from "@/lib/motion";

export default function CTABanner() {
  const reducedMotion = useReducedMotion();

  const scrollToCalculator = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-pad relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e4a72] to-secondary"
        animate={
          reducedMotion
            ? {}
            : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(244,166,35,0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(232,93,38,0.3) 0%, transparent 50%)`,
        }}
        aria-hidden
      />

      <div className="page-container relative text-center">
        <ScrollReveal>
          <motion.h2
            className="heading-h2-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springSoft}
          >
            Mülk Devirinizi Planlamaya Hazır mısınız?
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-xl text-lg text-white/85"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, ...springSoft }}
          >
            Tapu harcınızı şimdi hesaplayın ve bütçenizi önceden belirleyin.
          </motion.p>
          <div className="mt-10 flex justify-center">
            <MagneticButton
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-2 rounded-2xl bg-btn px-10 py-4 text-lg font-semibold text-white shadow-2xl shadow-black/25 hover:bg-btn-hover"
            >
              Ücretsiz Hesapla
              <ArrowRight size={20} aria-hidden />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
