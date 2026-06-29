"use client";

import {
  Check,
  Clock,
  Calculator,
  FileWarning,
  Scale,
  ShieldCheck,
  Smartphone,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

const onlineBenefits = [
  "Hesap makinemiz hızlı ve anında sonuç verir.",
  "Doğru ve güncel fiyatları otomatik olarak uygular.",
  "Ücretsizdir ve mobil cihazlarla uyumludur.",
  "İnsan hatasını azaltın ve tüm ücretleri tek bir hesaplamaya dahil edin.",
];

const manualDrawbacks = [
  "Hata olasılığını artırır.",
  "Kurallar ve yüzdeler hakkında bilgi gerektirir.",
  "Yanlış emlak değeri veya vergi oranı kullanma riski.",
  "Çok zaman alıyor.",
];

const onlineIcons: LucideIcon[] = [Zap, ShieldCheck, Smartphone, Calculator];
const manualIcons: LucideIcon[] = [FileWarning, Scale, FileWarning, Clock];

function VsCenterGraphic() {
  return (
    <div className="relative flex shrink-0 items-center justify-center px-4 py-8 lg:px-6 lg:py-0">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
        <svg viewBox="0 0 144 144" className="h-full w-full" aria-hidden>
          <circle cx="72" cy="72" r="68" fill="#2d6a9f" fillOpacity="0.15" />
          <circle cx="72" cy="72" r="68" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <path d="M72 4 A68 68 0 0 1 72 140 Z" fill="#2d6a9f" fillOpacity="0.35" />
          <path d="M72 4 A68 68 0 0 0 72 140 Z" fill="#e85d26" fillOpacity="0.2" />
          <line x1="72" y1="8" x2="72" y2="136" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <rect x="38" y="52" width="24" height="30" rx="4" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
          <rect x="44" y="58" width="5" height="5" rx="1" fill="#f4a623" />
          <rect x="52" y="58" width="5" height="5" rx="1" fill="#f4a623" />
          <rect x="44" y="66" width="5" height="5" rx="1" fill="#f4a623" />
          <rect x="52" y="66" width="5" height="5" rx="1" fill="#f4a623" />
          <path d="M82 54 L108 54 L108 82 L82 82 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
          <path d="M86 62 L104 62 M86 68 L100 68 M86 74 L104 74" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
          VS
        </span>
      </div>
    </div>
  );
}

function ComparisonColumn({
  title,
  items,
  icons,
  variant,
}: {
  title: string;
  items: string[];
  icons: LucideIcon[];
  variant: "online" | "manual";
}) {
  const isOnline = variant === "online";

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-5 sm:p-6 lg:p-7",
        isOnline
          ? "border-secondary/40 bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(45,106,159,0.15)]"
          : "border-white/15 bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      )}
    >
      <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            isOnline
              ? "border-secondary/50 bg-secondary/20 text-accent"
              : "border-white/20 bg-white/5 text-white/70"
          )}
        >
          {isOnline ? (
            <Calculator size={20} strokeWidth={1.75} aria-hidden />
          ) : (
            <FileWarning size={20} strokeWidth={1.75} aria-hidden />
          )}
        </span>
        <h3 className="heading-card text-white sm:text-xl">
          {title}
        </h3>
      </div>

      <ul className="space-y-4">
        {items.map((item, index) => {
          const ItemIcon = icons[index] ?? (isOnline ? Check : X);
          return (
            <li key={item} className="flex gap-3.5">
              <span
                className={cn(
                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                  isOnline
                    ? "border-secondary/40 bg-secondary/15 text-accent"
                    : "border-btn/30 bg-btn/10 text-btn"
                )}
                aria-hidden
              >
                {isOnline ? (
                  <ItemIcon size={16} strokeWidth={2} />
                ) : (
                  <X size={16} strokeWidth={2.5} />
                )}
              </span>
              <p className="text-sm leading-relaxed text-blue-100/85 sm:text-[0.9375rem]">
                {item}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function CalculatorComparisonSection() {
  return (
    <section
      id="calculator-comparison"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <article className="mx-auto w-full">
            <div className="section-heading mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <Scale size={14} className="text-btn" aria-hidden />
                Karşılaştırma
              </span>
              <h2 className="mt-5 heading-h2">
                Tapu Sicil Ücreti Hesaplayıcısı vs. Manuel Hesaplama
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-primary/20 bg-primary shadow-[0_24px_64px_rgba(26,60,94,0.28)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-accent to-btn" aria-hidden />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
                <div className="p-5 sm:p-6 lg:p-8 lg:pr-4">
                  <ComparisonColumn
                    title="Bizim çevrimiçi hesap makinesi"
                    items={onlineBenefits}
                    icons={onlineIcons}
                    variant="online"
                  />
                </div>

                <VsCenterGraphic />

                <div className="border-t border-white/10 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8 lg:pl-4">
                  <ComparisonColumn
                    title="Manuel hesaplama"
                    items={manualDrawbacks}
                    icons={manualIcons}
                    variant="manual"
                  />
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
