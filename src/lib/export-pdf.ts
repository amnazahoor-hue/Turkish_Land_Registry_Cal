import type { TapuFeeResult } from "@/types";
import { formatTRYForPdf } from "@/lib/formatters";

const NAVY: [number, number, number] = [26, 60, 94];
const ORANGE: [number, number, number] = [232, 93, 38];
const GOLD: [number, number, number] = [244, 166, 35];
const LIGHT: [number, number, number] = [248, 250, 252];
const TEXT: [number, number, number] = [26, 26, 46];
const MUTED: [number, number, number] = [74, 85, 104];

function drawLogo(doc: import("jspdf").jsPDF, x: number, y: number) {
  doc.setFillColor(...ORANGE);
  doc.roundedRect(x, y, 16, 16, 4, 4, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(x + 5, y + 9, 6, 6, "F");
  doc.setFillColor(...NAVY);
  doc.triangle(x + 5, y + 5, x + 8, y + 2, x + 11, y + 5, "F");
  doc.setFillColor(...GOLD);
  doc.roundedRect(x + 10, y + 3, 4, 5, 1, 1, "F");
}

function downloadBlob(doc: import("jspdf").jsPDF, filename: string) {
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function drawLabelValueRow(
  doc: import("jspdf").jsPDF,
  opts: {
    x: number;
    y: number;
    w: number;
    label: string;
    value: string;
    highlight?: boolean;
  }
): number {
  const { x, y, w, label, value, highlight } = opts;
  const boxH = highlight ? 22 : 18;

  if (highlight) {
    doc.setFillColor(...LIGHT);
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.8);
  } else {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.35);
  }
  doc.roundedRect(x, y, w, boxH, 3, 3, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(label, x + 5, y + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(highlight ? 12 : 10);
  doc.setTextColor(...(highlight ? ORANGE : TEXT));

  const valueLines = doc.splitTextToSize(value, w - 12);
  doc.text(valueLines, x + 5, y + (highlight ? 15 : 13));

  return boxH + 5;
}

export async function downloadResultPdf(
  result: TapuFeeResult,
  salePriceLabel: string
): Promise<void> {
  const salePricePdf = salePriceLabel.includes("₺")
    ? formatTRYForPdf(result.salePrice)
    : salePriceLabel.startsWith("TRY")
      ? salePriceLabel
      : formatTRYForPdf(result.salePrice);

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentW = pageW - margin * 2;
  let y = margin;

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, 48, "F");
  doc.setFillColor(...ORANGE);
  doc.rect(0, 46, pageW, 2.5, "F");

  drawLogo(doc, margin, 15);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("TapuCalc", margin + 22, 24);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Title Deed Fee Calculator", margin + 22, 31);
  doc.setFontSize(8);
  doc.text("Official 4% transfer fee estimate", margin + 22, 37);

  y = 58;
  doc.setTextColor(...TEXT);
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("Fee Calculation Summary", margin, y);
  y += 9;

  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(
    `Generated: ${new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`,
    margin,
    y
  );
  y += 10;

  const rows: { label: string; value: string; highlight?: boolean }[] = [
    { label: "Property Sale Price", value: salePricePdf },
    { label: "Buyer Fee (2%)", value: formatTRYForPdf(result.buyerFee) },
    { label: "Seller Fee (2%)", value: formatTRYForPdf(result.sellerFee) },
    { label: "Total Title Deed Fee (4%)", value: formatTRYForPdf(result.totalFee), highlight: true },
  ];

  rows.forEach((row) => {
    y += drawLabelValueRow(doc, {
      x: margin,
      y,
      w: contentW,
      label: row.label,
      value: row.value,
      highlight: row.highlight,
    });
  });

  y += 4;
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentW, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  const disclaimer =
    "This document is an estimate based on the official 4% title deed fee rate " +
    "(2% buyer + 2% seller). Confirm current rates with your local land registry office " +
    "before making any payment. TapuCalc is not affiliated with any government agency.";
  const lines = doc.splitTextToSize(disclaimer, contentW);
  doc.text(lines, margin, y);

  y += lines.length * 4 + 10;
  doc.setFillColor(...NAVY);
  doc.rect(margin, y, contentW, 0.8, "F");
  doc.setFillColor(...GOLD);
  doc.rect(margin, y + 1, contentW * 0.35, 0.8, "F");

  doc.setFontSize(7);
  doc.text("tapucalc.com  |  Turkey Property Tools", margin, y + 6);

  const filename = `TapuCalc-Fee-Estimate-${Date.now()}.pdf`;

  try {
    doc.save(filename);
  } catch {
    downloadBlob(doc, filename);
  }
}
