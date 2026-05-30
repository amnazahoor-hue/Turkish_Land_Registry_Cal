"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { springSoft } from "@/lib/motion";

export default function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto h-[300px] w-full max-w-[min(100%,22rem)] sm:h-[380px] sm:max-w-xl md:h-[400px] lg:h-[420px]"
      aria-hidden
    >
      <Orb
        className="left-[5%] top-[8%] h-32 w-32 bg-secondary/25"
        delay={0}
        reducedMotion={reducedMotion}
      />
      <Orb
        className="bottom-[10%] right-[0%] h-40 w-40 bg-accent/30"
        delay={1.5}
        reducedMotion={reducedMotion}
      />
      <Orb
        className="right-[20%] top-[2%] h-24 w-24 bg-btn/20"
        delay={0.8}
        reducedMotion={reducedMotion}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d6a9f" />
            <stop offset="100%" stopColor="#1a3c5e" />
          </linearGradient>
          <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.15" />
          </filter>
        </defs>

        <circle cx="240" cy="210" r="140" stroke="#1a3c5e" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="240" cy="210" r="100" stroke="#e85d26" strokeOpacity="0.08" strokeWidth="1" />

        <g filter="url(#softShadow)" transform="translate(88 95)">
          <path d="M60 120 L120 50 L180 120 Z" fill="url(#houseGrad)" />
          <rect x="95" y="95" width="50" height="55" rx="4" fill="#0f2744" />
          <rect x="108" y="72" width="24" height="28" rx="2" fill="#e85d26" opacity="0.9" />
          <rect x="72" y="108" width="18" height="18" rx="2" fill="#f4a623" opacity="0.85" />
          <rect x="150" y="108" width="18" height="18" rx="2" fill="#f4a623" opacity="0.85" />
          <circle cx="121" cy="58" r="10" fill="none" stroke="#f4a623" strokeWidth="2" />
          <circle cx="125" cy="58" r="5" fill="#f4a623" />
        </g>

        <g filter="url(#softShadow)" transform="translate(248 72) rotate(8)">
          <rect x="0" y="0" width="130" height="165" rx="10" fill="url(#docGrad)" stroke="#f4a623" strokeWidth="2" />
          <rect x="16" y="20" width="70" height="8" rx="2" fill="#1a3c5e" opacity="0.15" />
          <rect x="16" y="36" width="98" height="6" rx="2" fill="#e2e8f0" />
          <rect x="16" y="50" width="90" height="6" rx="2" fill="#e2e8f0" />
          <text x="24" y="78" fill="#1a3c5e" fontSize="11" fontWeight="700" fontFamily="Georgia, serif">
            TAPU
          </text>
          <rect x="16" y="88" width="98" height="28" rx="6" fill="#fff7ed" stroke="#e85d26" strokeWidth="1" />
          <text x="24" y="106" fill="#e85d26" fontSize="10" fontWeight="600">
            Transfer Fee
          </text>
          <rect x="16" y="124" width="45" height="22" rx="4" fill="#1a3c5e" opacity="0.08" />
          <rect x="68" y="124" width="45" height="22" rx="4" fill="#e85d26" opacity="0.12" />
        </g>

        <path d="M218 175 Q 248 155 278 130" stroke="#2d6a9f" strokeWidth="2" strokeDasharray="5 4" opacity="0.4" />
        <path d="M195 200 Q 230 190 265 175" stroke="#e85d26" strokeWidth="2" strokeDasharray="5 4" opacity="0.35" />
      </svg>

      <FloatingPill
        className="left-1 top-[16%] scale-90 bg-gradient-to-r from-btn to-btn-hover text-white sm:left-0 sm:top-[18%] sm:scale-100"
        label="2% Buyer"
        sub="Alıcı payı"
        delay={0}
        reducedMotion={reducedMotion}
      />
      <FloatingPill
        className="bottom-[20%] right-1 scale-90 bg-gradient-to-r from-primary to-secondary text-white sm:bottom-[22%] sm:right-0 sm:scale-100"
        label="2% Seller"
        sub="Satıcı payı"
        delay={0.6}
        reducedMotion={reducedMotion}
      />

      <motion.div
        className="absolute left-[8%] top-[42%] rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, ...springSoft }}
        whileHover={reducedMotion ? {} : { y: -4, scale: 1.02 }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
          Total Rate
        </p>
        <p className="font-mono text-2xl font-bold text-btn">4%</p>
      </motion.div>

      <motion.div
        className="absolute bottom-[8%] left-[12%] right-[12%] rounded-2xl border border-border/60 bg-white/90 p-4 shadow-lg backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, ...springSoft }}
      >
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-text-secondary">
          <span>Fee split</span>
          <span className="text-primary">Official</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-surface">
          <motion.div
            className="h-full bg-btn"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="h-full bg-secondary"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-medium">
          <span className="text-btn">Buyer 2%</span>
          <span className="text-secondary">Seller 2%</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[6%] top-[8%] flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-lg"
        animate={reducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="text-lg font-bold text-primary">₺</span>
      </motion.div>
    </div>
  );
}

function Orb({
  className,
  delay,
  reducedMotion,
}: {
  className: string;
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className={`hero-blob absolute rounded-full ${className}`}
      animate={reducedMotion ? {} : { y: [0, -14, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function FloatingPill({
  className,
  label,
  sub,
  delay,
  reducedMotion,
}: {
  className: string;
  label: string;
  sub: string;
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className={`absolute z-10 rounded-2xl px-4 py-2.5 shadow-xl ${className}`}
      animate={reducedMotion ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <p className="text-sm font-bold leading-none">{label}</p>
      <p className="mt-0.5 text-[10px] opacity-80">{sub}</p>
    </motion.div>
  );
}
