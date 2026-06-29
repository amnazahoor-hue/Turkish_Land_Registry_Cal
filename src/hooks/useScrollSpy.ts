"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const HOME_SECTION_ORDER = [
  "home",
  "calculator",
  "how-it-works",
  "info",
  "faq",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_ORDER)[number];

export function useScrollSpy(enabled: boolean) {
  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled || pathname !== "/") {
      setActiveSection("home");
      return;
    }

    const visible = new Set<HomeSectionId>();

    const pickActive = () => {
      for (let i = HOME_SECTION_ORDER.length - 1; i >= 0; i--) {
        const id = HOME_SECTION_ORDER[i];
        if (visible.has(id)) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("home");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!(HOME_SECTION_ORDER as readonly string[]).includes(id)) return;
          const sectionId = id as HomeSectionId;
          if (entry.isIntersecting) {
            visible.add(sectionId);
          } else {
            visible.delete(sectionId);
          }
        });
        pickActive();
      },
      {
        rootMargin: "-72px 0px -45% 0px",
        threshold: [0, 0.08, 0.15, 0.3],
      }
    );

    HOME_SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, pathname]);

  return activeSection;
}

export function isNavLinkActive(
  href: string,
  pathname: string,
  activeSection: HomeSectionId
): boolean {
  if (pathname !== "/") {
    return href === "/" ? pathname === "/" : pathname === href;
  }

  if (href === "/") {
    return (
      activeSection === "home" ||
      activeSection === "calculator" ||
      activeSection === "info"
    );
  }
  if (href === "/#how-it-works") return activeSection === "how-it-works";
  if (href === "/#faq") return activeSection === "faq";

  return false;
}
