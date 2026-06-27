"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowRight, Calculator, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { navLinks } from "@/lib/constants";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollSpy, isNavLinkActive } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition(8);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const activeSection = useScrollSpy(pathname === "/");

  const isActive = (href: string) =>
    isNavLinkActive(href, pathname, activeSection);

  const closeMobile = () => setMobileOpen(false);

  const headerClass = cn(
    "fixed top-0 z-50 w-full border-b-2 border-accent/80 bg-primary transition-shadow duration-300",
    scrolled ? "shadow-xl shadow-black/25" : "shadow-md shadow-primary/30"
  );

  const content = (
    <HeaderContent
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      isActive={isActive}
      closeMobile={closeMobile}
      reducedMotion={reducedMotion}
    />
  );

  if (reducedMotion) {
    return <header className={headerClass}>{content}</header>;
  }

  return (
    <motion.header
      className={headerClass}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {content}
    </motion.header>
  );
}

function HeaderContent({
  mobileOpen,
  setMobileOpen,
  isActive,
  closeMobile,
  reducedMotion,
}: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  isActive: (href: string) => boolean;
  closeMobile: () => void;
  reducedMotion: boolean;
}) {
  return (
    <>
      <div className="page-container relative py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            onClick={closeMobile}
            className="relative z-10 shrink-0 transition-opacity hover:opacity-90"
            aria-label="Ana sayfa"
          >
            <Logo variant="light" mobile={false} className="hidden sm:flex" />
            <Logo variant="light" mobile className="sm:hidden" />
          </Link>

          <LayoutGroup id="main-nav">
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/15 bg-[#0f2744] px-1.5 py-1 shadow-inner lg:flex"
              aria-label="Ana menü"
            >
              {navLinks.map((link) => (
                <NavLinkItem
                  key={link.href}
                  link={link}
                  active={isActive(link.href)}
                  reducedMotion={reducedMotion}
                />
              ))}
            </nav>
          </LayoutGroup>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher />
            <Link
              href="/#calculator"
              className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-btn to-btn-hover px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-btn/35 transition-all hover:shadow-xl hover:shadow-btn/45 sm:inline-flex"
            >
              <Calculator size={16} aria-hidden />
              <span className="whitespace-nowrap">Hesapla</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <button
              type="button"
              className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/15 bg-primary lg:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-4 py-5"
              aria-label="Mobil menü"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-center text-sm font-medium transition-all",
                    isActive(link.href)
                      ? "bg-btn text-white shadow-md"
                      : "text-white/90 hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#calculator"
                onClick={closeMobile}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-btn to-btn-hover py-3.5 text-sm font-semibold text-white shadow-lg"
              >
                <Calculator size={16} aria-hidden />
                Hesapla
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLinkItem({
  link,
  active,
  reducedMotion,
}: {
  link: { label: string; href: string };
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={cn(
        "relative z-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
        active
          ? "text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      )}
    >
      {link.label}
      {active && !reducedMotion && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 -z-10 rounded-full bg-btn shadow-md shadow-btn/40"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      {active && reducedMotion && (
        <span className="absolute inset-0 -z-10 rounded-full bg-btn" />
      )}
    </Link>
  );
}
