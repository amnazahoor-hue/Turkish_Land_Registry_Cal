"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SocialIconLink from "@/components/ui/SocialIcon";
import {
  companyLinks,
  legalLinks,
  navLinks,
  SITE_NAME,
  socialLinks,
} from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-accent bg-primary text-white">
      <div className="page-container pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-10">
          <div className="mx-auto w-full max-w-md text-center sm:col-span-2 lg:col-span-2 lg:mx-0 lg:max-w-none lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Logo variant="light" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Türkiye&apos;de mülk alıcıları ve satıcıları için resmi devir
              oranlarına dayalı ücretsiz tapu harcı hesaplama aracı.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              {socialLinks.map((social) => (
                <SocialIconLink
                  key={social.brand}
                  brand={social.brand}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-accent">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-accent">
              Yasal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-accent">
              Kurumsal
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <Link
            href="/#home"
            className="transition-colors hover:text-white/80"
          >
            © {year} {SITE_NAME}. Tüm hakları saklıdır.
          </Link>
        </div>
      </div>
    </footer>
  );
}
