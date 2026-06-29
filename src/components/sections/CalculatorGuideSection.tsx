"use client";

import { useState } from "react";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Adım 1: Mülk Değerini Girin",
    description:
      "Beyan edilen satış fiyatını girin. Henüz anlaşmaya varmadıysanız, mevcut belediye emlak vergisi değerini yazın.",
    ring: "border-secondary",
    bg: "bg-secondary",
    text: "text-secondary",
    labelActive: "text-secondary",
    topBar: "border-t-secondary",
    cardActive:
      "border-secondary bg-secondary/[0.06] shadow-[0_10px_32px_rgba(45,106,159,0.22)] ring-2 ring-secondary/25 -translate-y-1",
    armColor: "#2d6a9f",
  },
  {
    title: "Adım 2: İşlem Ayrıntılarını Seçin",
    description:
      "İşlem türünü (örneğin satış veya devir) seçin, ardından mülkün bulunduğu il veya ilçeyi belirtin. Kredi işlemi olup olmadığını ve alıcının Türk vatandaşı mı yoksa yabancı uyruklu mu olduğunu da ekleyin.",
    ring: "border-primary",
    bg: "bg-primary",
    text: "text-primary",
    labelActive: "text-primary",
    topBar: "border-t-primary",
    cardActive:
      "border-primary bg-primary/[0.05] shadow-[0_10px_32px_rgba(26,60,94,0.22)] ring-2 ring-primary/20 -translate-y-1",
    armColor: "#1a3c5e",
  },
  {
    title: "Adım 3: Uygulanabilir Ücretleri Gözden Geçirin",
    description: "Hesap makinesi güncel oranı ve gayrimenkul değerini kullanır.",
    ring: "border-btn",
    bg: "bg-btn",
    text: "text-btn",
    labelActive: "text-btn",
    topBar: "border-t-btn",
    cardActive:
      "border-btn bg-btn/[0.06] shadow-[0_10px_32px_rgba(232,93,38,0.22)] ring-2 ring-btn/25 -translate-y-1",
    armColor: "#e85d26",
  },
  {
    title: "Adım 4: Alıcı Ve Satıcı Maliyetlerini Kontrol Edin",
    description:
      "Son olarak, hesap makinesi toplam tutarı alıcı ve satıcı arasında paylaştırır. Farklı bir düzenleme üzerinde anlaştıysanız, paylaştırmayı manuel olarak ayarlayabilirsiniz.",
    ring: "border-accent",
    bg: "bg-accent",
    text: "text-accent",
    labelActive: "text-accent",
    topBar: "border-t-accent",
    cardActive:
      "border-accent bg-accent/[0.08] shadow-[0_10px_32px_rgba(244,166,35,0.28)] ring-2 ring-accent/30 -translate-y-1",
    armColor: "#f4a623",
  },
];

function stepLabel(title: string) {
  return title.replace(/^Adım \d+: /, "");
}

/** Diagram coords aligned to 4-column card grid (12.5%, 37.5%, 62.5%, 87.5%) */
const DIAGRAM = {
  w: 960,
  h: 450,
  hub: { cx: 480, cy: 318, r: 86 },
  nodeR: 28,
  labelH: 46,
  labelGap: 12,
  nodes: [
    { x: 120, y: 224 },
    { x: 360, y: 124 },
    { x: 600, y: 124 },
    { x: 840, y: 224 },
  ] as const,
};

function connectorPath(
  hubX: number,
  hubY: number,
  hubR: number,
  nodeX: number,
  nodeY: number
) {
  const dx = nodeX - hubX;
  const dy = nodeY - hubY;
  const len = Math.hypot(dx, dy);
  const sx = hubX + (dx / len) * hubR;
  const sy = hubY + (dy / len) * hubR;
  const ex = nodeX - (dx / len) * DIAGRAM.nodeR;
  const ey = nodeY - (dy / len) * DIAGRAM.nodeR;
  const cpx = (sx + ex) / 2;
  const cpy = Math.min(sy, ey) - 22;
  return `M ${sx} ${sy} Q ${cpx} ${cpy} ${ex} ${ey}`;
}

function wrapLabel(text: string, maxChars: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function shouldClearGuideHover(relatedTarget: EventTarget | null) {
  if (!(relatedTarget instanceof Element)) return true;
  if (relatedTarget.closest("[data-guide-node]")) return false;
  if (relatedTarget.closest("[id^='guide-step-']")) return false;
  return true;
}

function GuideDiagram({
  hoveredStep,
  onStepEnter,
  onStepLeave,
}: {
  hoveredStep: number | null;
  onStepEnter: (index: number) => void;
  onStepLeave: (relatedTarget: EventTarget | null) => void;
}) {
  const { hub, nodes } = DIAGRAM;

  const scrollToStep = (index: number) => {
    document
      .getElementById(`guide-step-${index + 1}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div
      className="relative mx-auto w-full"
      style={{ aspectRatio: `${DIAGRAM.w} / ${DIAGRAM.h}` }}
    >
      <svg
        viewBox={`0 0 ${DIAGRAM.w} ${DIAGRAM.h}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <filter id="guide-hub-shadow" x="-25%" y="-25%" width="150%" height="175%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1a3c5e" floodOpacity="0.12" />
          </filter>
        </defs>

        {nodes.map((node, i) => (
          <g key={`line-${steps[i].title}`}>
            <path
              d={connectorPath(hub.cx, hub.cy, hub.r, node.x, node.y)}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d={connectorPath(hub.cx, hub.cy, hub.r, node.x, node.y)}
              fill="none"
              stroke={steps[i].armColor}
              strokeWidth={hoveredStep === i ? 2.5 : 1.75}
              strokeLinecap="round"
              strokeDasharray="6 5"
              data-step={i + 1}
              opacity={hoveredStep === null || hoveredStep === i ? 1 : 0.35}
            />
          </g>
        ))}

        <circle
          cx={hub.cx}
          cy={hub.cy}
          r={hub.r}
          fill="#ffffff"
          stroke="rgba(26,60,94,0.2)"
          strokeWidth="5"
          filter="url(#guide-hub-shadow)"
        />

        <foreignObject
          x={hub.cx - hub.r + 18}
          y={hub.cy - 34}
          width={hub.r * 2 - 36}
          height={68}
        >
          <div
            className="flex h-full items-center justify-center text-center heading-card text-primary xl:text-[0.9375rem]"
            aria-hidden
          >
            Tapu Sicil Ücreti Hesaplayıcısı Nasıl Kullanılır?
          </div>
        </foreignObject>
      </svg>

        {nodes.map((node, i) => {
        const labelLines = wrapLabel(stepLabel(steps[i].title).toUpperCase(), 16);
        const left = (node.x / DIAGRAM.w) * 100;
        const top = (node.y / DIAGRAM.h) * 100;
        const isActive = hoveredStep === i;

        return (
          <button
            key={`node-${steps[i].title}`}
            type="button"
            data-guide-node={i}
            onClick={() => scrollToStep(i)}
            onMouseEnter={() => onStepEnter(i)}
            onMouseLeave={(e) => onStepLeave(e.relatedTarget)}
            className="guide-step-node absolute z-20 -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
            style={{ left: `${left}%`, top: `${top}%`, willChange: "transform" }}
            aria-label={`${steps[i].title} adımına git`}
          >
            <span
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 mb-3 block w-[7.5rem] -translate-x-1/2 text-center text-[9.5px] font-bold uppercase leading-[1.25] tracking-wide transition-colors duration-300 sm:w-[8.25rem]",
                isActive ? steps[i].labelActive : "text-primary"
              )}
              aria-hidden
            >
              {labelLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>

            <span
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-full border-[4px] font-mono text-lg font-bold transition-[transform,background-color,color,box-shadow] duration-200 ease-out",
                steps[i].ring,
                isActive
                  ? cn(
                      steps[i].bg,
                      "scale-105 -translate-y-0.5 text-white shadow-[0_10px_28px_rgba(26,60,94,0.18)]"
                    )
                  : cn("bg-white text-text-primary", steps[i].text, "shadow-[0_4px_14px_rgba(26,60,94,0.12)]")
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0"
                )}
                style={{
                  boxShadow: `0 0 0 6px ${steps[i].armColor}22`,
                }}
                aria-hidden
              />
              <span className="relative z-10">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GuideDesktopPanel() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleStepLeave = (relatedTarget: EventTarget | null) => {
    if (shouldClearGuideHover(relatedTarget)) {
      setHoveredStep(null);
    }
  };

  return (
    <div className="relative overflow-visible px-2 pb-2 xl:px-4">
      <GuideDiagram
        hoveredStep={hoveredStep}
        onStepEnter={setHoveredStep}
        onStepLeave={handleStepLeave}
      />

      <div className="mt-7 grid grid-cols-4 gap-4 xl:mt-8 xl:gap-5">
        {steps.map((step, index) => {
          const isActive = hoveredStep === index;

          return (
            <article
              key={step.title}
              id={`guide-step-${index + 1}`}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={(e) => handleStepLeave(e.relatedTarget)}
              className={cn(
                "relative z-20 flex min-h-[12.5rem] flex-col rounded-2xl border bg-white p-5 transition-[transform,box-shadow,border-color,background-color] duration-200 xl:min-h-[13rem] xl:p-5",
                  "border-t-[3px]",
                  step.topBar,
                  isActive
                    ? step.cardActive
                    : "border-border/60 shadow-[0_4px_20px_rgba(26,60,94,0.06)]"
                )}
              >
                <h3
                  className={cn(
                    "min-h-[2.75rem] heading-card xl:text-[0.9375rem] transition-colors duration-300",
                    isActive ? step.text : "text-primary"
                  )}
                >
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-text-secondary xl:text-sm">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
    </div>
  );
}

export default function CalculatorGuideSection() {
  return (
    <section
      id="calculator-guide"
      className="info-section-bg section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 hero-mesh"
        aria-hidden
      />

      <div className="page-container relative">
        <ScrollReveal>
          <div className="section-heading mb-10 md:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              <ListOrdered size={14} className="text-btn" aria-hidden />
              Kullanım rehberi
            </span>
            <h2 className="mt-5 heading-h2">
              Tapu Sicil Ücreti Hesaplayıcısı Nasıl Kullanılır?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              Bu{" "}
              <Link
                href={ROUTES.about}
                className="text-secondary underline-offset-2 hover:underline"
              >
                hesap makinesi
              </Link>
              , mülkünüzün değerini otomatik olarak hesaplar ve toplam tutarı
              gösterir. Tapu kayıt ücretinizin doğru bir tahminini almak için
              şu basit adımları izleyin.
            </p>
            <div
              className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />
          </div>
        </ScrollReveal>

        {/* Mobile */}
        <ScrollReveal delay={0.05}>
          <ol className="mx-auto max-w-3xl space-y-8 lg:hidden">
            {steps.map((step, index) => (
              <li key={step.title} className="list-none">
                <div className="flex gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] bg-white font-mono text-sm font-bold shadow-md transition-all duration-300",
                      step.ring,
                      step.text
                    )}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-2">
                    <h3 className="heading-h3">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        {/* Desktop — diagram + cards share one aligned grid width */}
        <ScrollReveal delay={0.1}>
          <div className="hidden w-full lg:block">
            <GuideDesktopPanel />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
