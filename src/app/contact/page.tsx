import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact TapuCalc — questions, feedback, and partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface pb-16 pt-24 sm:pt-28 md:pt-32">
        <div className="page-container-narrow max-w-xl">
          <h1 className="text-center font-display text-3xl font-bold text-primary sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-center text-text-secondary">
            Questions, suggestions, or partnership requests — use the form below.
            We typically reply within 1–2 business days.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
          <div className="mt-10 rounded-xl border border-border bg-white p-6 text-center text-sm text-text-secondary">
            <p className="font-semibold text-primary">Direct contact</p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:info@tapucalc.com"
                className="text-secondary hover:underline"
              >
                info@tapucalc.com
              </a>
            </p>
            <p className="mt-1">Istanbul, Turkey</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
