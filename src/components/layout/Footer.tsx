"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SocialIconLink from "@/components/ui/SocialIcon";
import { legalLinks, navLinks, SITE_NAME, socialLinks } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-accent bg-primary text-white">
      <div className="page-container pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-10">
          <div className="mx-auto w-full max-w-md text-center lg:mx-0 lg:max-w-none lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Logo variant="light" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Free title deed fee calculator for property buyers and sellers in
              Turkey, based on official transfer rates.
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

          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:gap-6 lg:contents lg:text-left">
            <div>
              <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-accent">
                Quick Links
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

            <div>
              <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-accent">
                Legal & Info
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

            <div>
              <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-accent">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a
                    href="mailto:info@tapucalc.com"
                    className="transition-colors hover:text-white"
                  >
                    info@tapucalc.com
                  </a>
                </li>
                <li>Istanbul, Turkey</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
