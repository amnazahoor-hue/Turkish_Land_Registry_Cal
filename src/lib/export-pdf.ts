import type { TapuFeeResult } from "@/types";
import { formatTRYForPdf } from "@/lib/formatters";
import { SITE_DOMAIN } from "@/lib/site";

const NAVY: [number, number, number] = [26, 60, 94];
const BLUE: [number, number, number] = [45, 106, 159];
const ORANGE: [number, number, number] = [232, 93, 38];
const GOLD: [number, number, number] = [244, 166, 35];
const LIGHT: [number, number, number] = [248, 250, 252];
const BORDER: [number, number, number] = [203, 213, 225];
const TEXT: [number, number, number] = [26, 26, 46];
const MUTED: [number, number, number] = [74, 85, 104];
const WHITE: [number, number, number] = [255, 255, 255];

type JsPDF = import("jspdf").jsPDF;

async function loadLogoPngDataUrl(): Promise<string | null> {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `${window.location.origin}/images/logo-transparent.webp`;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const targetH = 256;
    const scale = targetH / img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

function downloadBlob(doc: JsPDF, filename: string) {
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

function generateDocumentId(): string {
  const date = new Date();
  const ymd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TPC-${ymd}-${suffix}`;
}

function formatGeneratedAt(): string {
  return new Date().toLocaleString("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function drawDocumentFrame(doc: JsPDF, margin: number, pageW: number, pageH: number) {
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.6);
  doc.rect(margin, margin, pageW - margin * 2, pageH - margin * 2, "S");

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.25);
  doc.rect(margin + 1.5, margin + 1.5, pageW - margin * 2 - 3, pageH - margin * 2 - 3, "S");
}

function drawWatermark(doc: JsPDF, pageW: number, pageH: number) {
  doc.setTextColor(235, 240, 245);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(52);
  doc.text("TAHMİNİ", pageW / 2, pageH / 2 + 8, {
    align: "center",
    angle: 35,
  });
}

function drawLetterhead(
  doc: JsPDF,
  opts: { margin: number; pageW: number; logoDataUrl: string | null }
): number {
  const { margin, pageW, logoDataUrl } = opts;
  const innerX = margin + 6;
  let y = margin + 8;

  doc.setFillColor(...NAVY);
  doc.rect(innerX, y, pageW - innerX * 2, 36, "F");

  doc.setFillColor(...ORANGE);
  doc.rect(innerX, y + 36, pageW - innerX * 2, 1.2, "F");

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", innerX + 5, y + 5, 14, 14);
  }

  const textX = logoDataUrl ? innerX + 22 : innerX + 5;
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("TapuCalc", textX, y + 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Tapu Harcı Hesaplama Aracı", textX, y + 20);

  doc.setFontSize(7);
  doc.setTextColor(220, 230, 240);
  doc.text("Resmi %4 tapu devir oranına dayalı ücretsiz hesaplama", textX, y + 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.text(SITE_DOMAIN, pageW - innerX - 5, y + 12, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 210, 220);
  doc.setFontSize(6.5);
  doc.text("Türkiye Gayrimenkul Araçları", pageW - innerX - 5, y + 18, {
    align: "right",
  });

  return y + 44;
}

function drawDocumentTitle(doc: JsPDF, margin: number, pageW: number, y: number): number {
  const innerX = margin + 6;
  const contentW = pageW - innerX * 2;

  doc.setFillColor(...LIGHT);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.35);
  doc.roundedRect(innerX, y, contentW, 16, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text("TAPU HARCI HESAPLAMA RAPORU", pageW / 2, y + 7.5, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "Resmi %4 devir oranına (Alıcı %2 + Satıcı %2) dayalı tahmini ücret özeti",
    pageW / 2,
    y + 12.5,
    { align: "center" }
  );

  return y + 22;
}

function drawMetaBlock(
  doc: JsPDF,
  margin: number,
  pageW: number,
  y: number,
  documentId: string
): number {
  const innerX = margin + 6;
  const contentW = pageW - innerX * 2;
  const colW = contentW / 2;
  const rowH = 9;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.35);
  doc.setFillColor(...WHITE);

  const fields = [
    { label: "Belge No", value: documentId },
    { label: "Oluşturulma Tarihi", value: formatGeneratedAt() },
    { label: "Belge Türü", value: "Hesaplama Tahmini" },
    { label: "Geçerlilik", value: "Bilgilendirme amaçlı — resmi belge değildir" },
  ];

  fields.forEach((field, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = innerX + col * colW;
    const cellY = y + row * rowH;

    doc.rect(x, cellY, colW, rowH, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(field.label, x + 3, cellY + 4);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXT);
    const valueLines = doc.splitTextToSize(field.value, colW - 6);
    doc.text(valueLines, x + 3, cellY + 7.5);
  });

  return y + rowH * 2 + 6;
}

function drawIntro(doc: JsPDF, margin: number, pageW: number, y: number): number {
  const innerX = margin + 6;
  const contentW = pageW - innerX * 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);

  const intro =
    "Aşağıdaki tablo, beyan edilen gayrimenkul satış bedeli üzerinden 492 sayılı Kanun " +
    "kapsamındaki resmi tapu harcı oranları (%2 alıcı + %2 satıcı) esas alınarak " +
    "TapuCalc aracılığıyla otomatik olarak oluşturulmuştur.";

  const lines = doc.splitTextToSize(intro, contentW);
  doc.text(lines, innerX, y);
  return y + lines.length * 4.5 + 5;
}

function drawOfficialTable(
  doc: JsPDF,
  margin: number,
  pageW: number,
  y: number,
  rows: { label: string; rate: string; value: string; total?: boolean }[]
): number {
  const innerX = margin + 6;
  const contentW = pageW - innerX * 2;
  const col1 = contentW * 0.48;
  const col2 = contentW * 0.14;
  const col3 = contentW * 0.38;
  const headerH = 9;
  const rowH = 11;

  doc.setFillColor(...NAVY);
  doc.rect(innerX, y, contentW, headerH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...WHITE);
  doc.text("Kalem", innerX + 3, y + 6);
  doc.text("Oran", innerX + col1 + 3, y + 6);
  doc.text("Tutar (TRY)", innerX + col1 + col2 + 3, y + 6);

  let rowY = y + headerH;

  rows.forEach((row, index) => {
    const isTotal = row.total === true;
    const isAlt = index % 2 === 1 && !isTotal;

    if (isTotal) {
      doc.setFillColor(255, 247, 240);
      doc.setDrawColor(...ORANGE);
      doc.setLineWidth(0.6);
    } else if (isAlt) {
      doc.setFillColor(...LIGHT);
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.35);
    } else {
      doc.setFillColor(...WHITE);
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.35);
    }

    doc.rect(innerX, rowY, contentW, rowH, "FD");
    doc.line(innerX + col1, rowY, innerX + col1, rowY + rowH);
    doc.line(innerX + col1 + col2, rowY, innerX + col1 + col2, rowY + rowH);

    doc.setFont("helvetica", isTotal ? "bold" : "normal");
    doc.setFontSize(isTotal ? 9 : 8.5);
    doc.setTextColor(...(isTotal ? NAVY : TEXT));
    doc.text(row.label, innerX + 3, rowY + 7);

    doc.setFont("helvetica", isTotal ? "bold" : "normal");
    doc.setFontSize(8);
    doc.setTextColor(...(isTotal ? ORANGE : MUTED));
    doc.text(row.rate, innerX + col1 + 3, rowY + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(isTotal ? 10.5 : 9);
    doc.setTextColor(...(isTotal ? ORANGE : TEXT));
    const valueLines = doc.splitTextToSize(row.value, col3 - 6);
    doc.text(valueLines, innerX + col1 + col2 + 3, rowY + 7);

    rowY += rowH;
  });

  return rowY + 6;
}

function drawDisclaimerBox(doc: JsPDF, margin: number, pageW: number, y: number): number {
  const innerX = margin + 6;
  const contentW = pageW - innerX * 2;
  const pad = 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const disclaimer =
    "Bu belge yalnızca bilgilendirme amaçlı bir tahmindir ve herhangi bir resmi kurum " +
    "veya Tapu Sicil Müdürlüğü tarafından düzenlenmiş resmi bir belge niteliği taşımaz. " +
    "Ödeme yapmadan önce güncel oranları ilgili Tapu Sicil Müdürlüğünden teyit ediniz. " +
    "TapuCalc herhangi bir devlet kurumu ile bağlantılı değildir.";

  const bodyLines = doc.splitTextToSize(disclaimer, contentW - pad * 2);
  const boxH = 12 + bodyLines.length * 3.8;

  doc.setFillColor(255, 252, 245);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.roundedRect(innerX, y, contentW, boxH, 2, 2, "FD");

  doc.setFillColor(...GOLD);
  doc.rect(innerX, y, contentW, 7, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...NAVY);
  doc.text("ÖNEMLİ NOT", innerX + pad, y + 4.8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT);
  doc.text(bodyLines, innerX + pad, y + 12);

  return y + boxH + 8;
}

function drawOfficialStamp(doc: JsPDF, x: number, y: number) {
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.55);
  doc.circle(x, y, 11, "S");

  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.25);
  doc.circle(x, y, 9.2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(...NAVY);
  doc.text("TAHMİNİ", x, y - 3, { align: "center" });
  doc.text("BELGE", x, y + 0.5, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(...BLUE);
  doc.text("TapuCalc", x, y + 5, { align: "center" });
}

function drawFooter(doc: JsPDF, margin: number, pageW: number, pageH: number, documentId: string) {
  const innerX = margin + 6;
  const contentW = pageW - innerX * 2;
  const y = pageH - margin - 18;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.35);
  doc.line(innerX, y, innerX + contentW, y);

  doc.setFillColor(...NAVY);
  doc.rect(innerX, y + 1.5, contentW * 0.65, 0.8, "F");
  doc.setFillColor(...ORANGE);
  doc.rect(innerX + contentW * 0.65, y + 1.5, contentW * 0.35, 0.8, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...MUTED);
  doc.text(`${SITE_DOMAIN}  ·  Türkiye Gayrimenkul Araçları  ·  Ücretsiz Tapu Harcı Hesaplama`, innerX, y + 6);

  doc.setFontSize(6);
  doc.text(`Belge referansı: ${documentId}`, innerX, y + 10);
  doc.text("Elektronik ortamda oluşturulmuştur — ıslak imza gerektirmez.", innerX + contentW, y + 10, {
    align: "right",
  });
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

  const logoDataUrl = await loadLogoPngDataUrl();
  const documentId = generateDocumentId();

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 12;

  drawWatermark(doc, pageW, pageH);
  drawDocumentFrame(doc, margin, pageW, pageH);

  let y = drawLetterhead(doc, { margin, pageW, logoDataUrl });
  y = drawDocumentTitle(doc, margin, pageW, y);
  y = drawMetaBlock(doc, margin, pageW, y, documentId);
  y = drawIntro(doc, margin, pageW, y);

  y = drawOfficialTable(doc, margin, pageW, y, [
    { label: "Gayrimenkul Satış Bedeli", rate: "—", value: salePricePdf.replace(/^TRY\s*/, "") },
    { label: "Alıcı Tapu Harcı", rate: "%2", value: formatTRYForPdf(result.buyerFee).replace(/^TRY\s*/, "") },
    { label: "Satıcı Tapu Harcı", rate: "%2", value: formatTRYForPdf(result.sellerFee).replace(/^TRY\s*/, "") },
    {
      label: "TOPLAM TAPU HARCI",
      rate: "%4",
      value: formatTRYForPdf(result.totalFee).replace(/^TRY\s*/, ""),
      total: true,
    },
  ]);

  y = drawDisclaimerBox(doc, margin, pageW, y);

  const innerX = margin + 6;
  drawOfficialStamp(doc, innerX + 14, y + 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "Bu rapor TapuCalc hesaplama aracı tarafından otomatik üretilmiştir.\n" +
      "Resmi tapu işlemleri yalnızca Tapu Sicil Müdürlüklerinde gerçekleştirilir.",
    innerX + 30,
    y + 2
  );

  drawFooter(doc, margin, pageW, pageH, documentId);

  const dateStamp = new Date().toISOString().slice(0, 10);
  const filename = `TapuCalc-Harc-Raporu-${dateStamp}-${documentId.split("-").pop()}.pdf`;

  try {
    doc.save(filename);
  } catch {
    downloadBlob(doc, filename);
  }
}
