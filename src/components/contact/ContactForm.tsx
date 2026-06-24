"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) return;

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const subject = (data.get("subject") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Ad soyad zorunludur";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Geçerli bir e-posta girin";
    if (!subject) newErrors.subject = "Konu zorunludur";
    if (!message || message.length < 20)
      newErrors.message = "Mesaj en az 20 karakter olmalıdır";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-success/30 bg-green-50 p-8 text-center"
        role="status"
      >
        <h2 className="text-xl font-semibold text-success">Teşekkürler!</h2>
        <p className="mt-2 text-text-secondary">
          Mesajınız alındı. 1–2 iş günü içinde yanıt vereceğiz.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-secondary hover:underline"
        >
          Başka bir mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-2xl border border-border bg-white p-8 shadow-sm"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold">
          Ad Soyad
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full rounded-lg border border-border px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
        />
        {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold">
          E-posta Adresi
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-lg border border-border px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
        />
        {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-semibold">
          Konu
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full rounded-lg border border-border px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-error">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-lg border border-border px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-error">{errors.message}</p>
        )}
      </div>

      <p className="text-sm text-text-secondary">Yanıt süresi: 1–2 iş günü</p>

      <Button type="submit" className="w-full">
        Mesaj Gönder
      </Button>
    </form>
  );
}
