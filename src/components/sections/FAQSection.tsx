"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, HelpCircle, Receipt, Users, Calculator, Scale, Files, Globe2, ArrowRight, type LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { faqs } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import type { FAQIcon, FAQItem } from "@/types";
import { cn } from "@/lib/cn";

const iconMap: Record<FAQIcon, LucideIcon> = {
  receipt: Receipt,
  users: Users,
  calculator: Calculator,
  scale: Scale,
  files: Files,
  globe: Globe2,
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="faq-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <div className="section-heading mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              <HelpCircle size={14} className="text-btn" aria-hidden />
              SSS
            </span>
            <h2 className="mt-5 heading-h2">
              Sıkça Sorulan{" "}
              <Link
                href={ROUTES.contact}
                className="text-gradient-hero underline-offset-4 hover:underline"
              >
                Sorular
              </Link>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
              Tapu kayıt ücretleri, ödemeler ve devir süreci hakkında net
              yanıtlar.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-stretch gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <ScrollReveal className="mx-auto w-full max-w-lg lg:col-span-5 lg:mx-0 lg:max-w-none">
            <aside className="flex h-full flex-col text-center lg:text-left">
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg saas-card-glow">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
                  <Image
                    src="/images/faq-sidebar.webp"
                    alt="Tapu sicil ve tapu harcı ile ilgili resmi belgeler"
                    title="Tapu sicil ve tapu harcı ile ilgili resmi belgeler"
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
                </div>
                <div className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 p-5">
                  <p className="text-sm font-semibold text-primary">
                    Resmi %4 devir ücreti
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    %2 alıcı + %2 satıcı — kanunla sabitlenmiş, Tapu randevusundan
                    önce ödenir.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                    <span className="rounded-lg bg-btn/10 px-2.5 py-1 text-xs font-bold text-btn">
                      Alıcı %2
                    </span>
                    <span className="rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-bold text-secondary">
                      Satıcı %2
                    </span>
                  </div>
                </div>
              </div>

              <MagneticButton
                type="button"
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-btn to-btn-hover px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-btn/25"
              >
                Hesaplayıcıyı deneyin
                <ArrowRight size={18} aria-hidden />
              </MagneticButton>
            </aside>
          </ScrollReveal>

          <div
            className="space-y-3 lg:col-span-7"
            aria-label="Sıkça sorulan sorular listesi"
          >
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={faq.q}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[faq.iconName];

  return (
    <ScrollReveal delay={index * 0.05}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border bg-white shadow-sm transition-[border-color,box-shadow] duration-300",
          isOpen
            ? "border-accent/40 shadow-md ring-1 ring-accent/20"
            : "border-border hover:border-primary/15 hover:shadow-md"
        )}
      >
        <h3 className="heading-card m-0 md:text-lg">
          <button
            type="button"
            onClick={onToggle}
            className="grid w-full grid-cols-[2.75rem_1fr_2.75rem] items-center gap-x-3 px-4 py-4 text-left sm:gap-x-4 sm:py-5 sm:pl-5 sm:pr-5"
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center justify-self-center rounded-xl transition-colors",
                isOpen ? "bg-accent/15 text-[#b8860b]" : "bg-surface text-secondary"
              )}
            >
              <Icon size={22} strokeWidth={1.75} aria-hidden />
            </span>

            <span className="min-w-0 self-center text-sm leading-snug text-text-primary sm:text-base">
              {faq.q}
            </span>

            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center justify-self-center rounded-full transition-colors",
                isOpen ? "bg-btn text-white" : "bg-surface text-btn"
              )}
            >
              <ChevronDown
                size={20}
                className={cn("transition-transform duration-300", isOpen && "rotate-180")}
              />
            </span>
          </button>
        </h3>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border/60 bg-gradient-to-b from-orange-50/40 to-white px-4 pb-5 pt-4 sm:px-5">
              <p className="text-center text-[15px] leading-relaxed text-text-secondary lg:text-left">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
