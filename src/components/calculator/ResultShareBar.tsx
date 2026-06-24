"use client";

import { useState } from "react";
import { FileDown, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { formatTRY } from "@/lib/formatters";
import {
  buildResultSummary,
  getEmailShareUrl,
  getWhatsAppShareUrl,
} from "@/lib/share";
import { downloadResultPdf } from "@/lib/export-pdf";
import type { TapuFeeResult } from "@/types";
import { cn } from "@/lib/cn";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ResultShareBarProps {
  result: TapuFeeResult;
  salePriceLabel: string;
  compact?: boolean;
}

export default function ResultShareBar({
  result,
  salePriceLabel,
  compact = false,
}: ResultShareBarProps) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<"idle" | "success" | "error">("idle");

  const summary = buildResultSummary(result, salePriceLabel);

  const handleWhatsApp = () => {
    window.open(getWhatsAppShareUrl(summary), "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    const subject = "TapuCalc — Title Deed Fee Estimate";
    window.location.href = getEmailShareUrl(subject, summary);
  };

  const handlePdf = async () => {
    setPdfLoading(true);
    setPdfStatus("idle");
    try {
      await downloadResultPdf(result, formatTRY(result.salePrice));
      setPdfStatus("success");
      setTimeout(() => setPdfStatus("idle"), 4000);
    } catch (err) {
      console.error("PDF export failed:", err);
      setPdfStatus("error");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className={cn("border-t border-border", compact ? "pt-3" : "pt-6")}>
      {!compact && (
        <p className="mb-4 text-center text-sm font-semibold text-text-primary">
          Sonuçları paylaşın veya kaydedin
        </p>
      )}
      <div
        className={cn(
          "mx-auto flex w-full gap-2",
          compact
            ? "justify-center"
            : "max-w-md flex-col sm:max-w-none sm:flex-row sm:justify-center sm:gap-3"
        )}
      >
        <ShareButton
          onClick={handleWhatsApp}
          label="WhatsApp"
          compact={compact}
          className="bg-[#25D366] text-white hover:bg-[#1da851]"
          icon={<WhatsAppIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />}
        />
        <ShareButton
          onClick={handleEmail}
          label="E-posta"
          compact={compact}
          className="bg-primary text-white hover:opacity-90"
          icon={<Mail className={compact ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2} />}
        />
        <ShareButton
          onClick={handlePdf}
          label={pdfLoading ? "PDF…" : compact ? "PDF" : "PDF İndir"}
          compact={compact}
          disabled={pdfLoading}
          className="bg-btn text-white hover:bg-btn-hover"
          icon={<FileDown className={compact ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2} />}
        />
      </div>

      {pdfStatus === "success" && (
        <p
          className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-success"
          role="status"
        >
          <CheckCircle size={16} />
          PDF downloaded successfully
        </p>
      )}
      {pdfStatus === "error" && (
        <p
          className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-error"
          role="alert"
        >
          <AlertCircle size={16} />
          PDF export failed. Please try again.
        </p>
      )}
    </div>
  );
}

function ShareButton({
  onClick,
  label,
  icon,
  className,
  disabled,
  compact = false,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  className: string;
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold shadow-md transition-all disabled:cursor-wait disabled:opacity-70",
        compact
          ? "min-h-[36px] flex-1 px-2 py-2 text-xs"
          : "min-h-[44px] w-full flex-1 rounded-xl px-5 py-3 text-sm sm:max-w-[200px] sm:flex-initial",
        className
      )}
    >
      {icon}
      <span className={compact ? "truncate" : undefined}>{label}</span>
    </button>
  );
}
