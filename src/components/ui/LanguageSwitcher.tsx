"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "tapucalc-lang";
type Lang = "tr" | "en";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
            },
            elementId: string
          ): void;
        };
      };
    };
  }
}

function clearGoogTransCookies() {
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  document.cookie = `googtrans=; path=/; expires=${expires}`;
  document.cookie = `googtrans=; path=/; domain=${host}; expires=${expires}`;
  if (host.includes(".")) {
    document.cookie = `googtrans=; path=/; domain=.${host}; expires=${expires}`;
  }
}

function setGoogTransCookie(lang: Lang) {
  clearGoogTransCookies();
  if (lang === "en") {
    const value = "/tr/en";
    const host = window.location.hostname;
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=${host}`;
    if (host.includes(".")) {
      document.cookie = `googtrans=${value}; path=/; domain=.${host}`;
    }
  }
}

function hideGoogleTranslateBanner() {
  document.body.style.top = "0";
  document.body.style.position = "static";

  document
    .querySelectorAll<HTMLElement>(
      ".goog-te-banner-frame, iframe.skiptranslate, .skiptranslate, #goog-gt-tt, .goog-te-balloon-frame"
    )
    .forEach((el) => {
      el.style.display = "none";
    });
}

function loadHiddenGoogleTranslate() {
  const init = () => {
    const element = document.getElementById("google_translate_element");
    if (!element || !window.google?.translate) return;

    element.innerHTML = "";

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "tr",
        includedLanguages: "en,tr",
        autoDisplay: false,
      },
      "google_translate_element"
    );

    hideGoogleTranslateBanner();
  };

  window.googleTranslateElementInit = init;

  if (window.google?.translate) {
    init();
    return;
  }

  if (document.getElementById("google-translate-script")) return;

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>("tr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "tr";
    setLang(saved);

    if (saved === "en") {
      setGoogTransCookie("en");
      loadHiddenGoogleTranslate();
    } else {
      clearGoogTransCookies();
    }

    hideGoogleTranslateBanner();

    const observer = new MutationObserver(hideGoogleTranslateBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    setReady(true);

    return () => observer.disconnect();
  }, []);

  const switchLang = (next: Lang) => {
    if (next === lang) return;

    localStorage.setItem(STORAGE_KEY, next);
    setGoogTransCookie(next);
    window.location.reload();
  };

  return (
    <>
      <div
        id="google_translate_element"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />
      <div
        className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-0.5"
        role="group"
        aria-label="Dil seçimi"
      >
        {(["tr", "en"] as const).map((code) => (
          <button
            key={code}
            type="button"
            disabled={!ready}
            onClick={() => switchLang(code)}
            className={cn(
              "min-w-[2.5rem] rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
              lang === code
                ? "bg-white text-primary shadow-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
            aria-pressed={lang === code}
          >
            {code}
          </button>
        ))}
      </div>
    </>
  );
}
