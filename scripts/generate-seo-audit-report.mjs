import fs from "fs";
import path from "path";
import { jsPDF } from "jspdf";

const OUT_DIR = path.join(process.cwd(), "reports");
const OUT_FILE = path.join(OUT_DIR, "seo-audit-developer-actions.pdf");

const NAVY = [26, 60, 94];
const ORANGE = [232, 93, 38];
const MUTED = [74, 85, 104];
const TEXT = [26, 26, 46];

const failingItems = [
  {
    id: "A1",
    name: "Title tag primary keyword at start",
    reason:
      "Subpages use short titles like 'Hakkımızda | TapuCalc' without leading 'tapu harcı' keyword (src/app/tapu-harci-*/page.tsx, src/lib/seo.ts).",
    priority: "High",
    action:
      "Rewrite indexable page titles to lead with primary keyword, e.g. 'Tapu Harcı Hakkında | TapuCalc'.",
  },
  {
    id: "A2",
    name: "Title tag length 50–60 characters",
    reason:
      "Several titles are too short (e.g. 'Yazar | TapuCalc' ~18 chars) or homepage is borderline; not consistently 50–60 chars.",
    priority: "Medium",
    action: "Audit all titles in createPageMetadata() calls and normalize to 50–60 characters.",
  },
  {
    id: "A4",
    name: "Meta description 140–160 characters",
    reason:
      "Home description ~127 chars (src/lib/site.ts). Contact ~175 chars. Privacy/Terms/Disclaimer under 140 chars.",
    priority: "High",
    action: "Rewrite meta descriptions in site.ts and each page.tsx to 140–160 chars with natural keyword use.",
  },
  {
    id: "D8",
    name: "Answer-first H2 structure",
    reason:
      "Homepage sections (HowItWorks, WhoPays, etc.) use intro copy before direct answers; not answer-first per H2.",
    priority: "Medium",
    action: "Add a direct 1–2 sentence answer immediately under each major H2 before supporting detail.",
  },
  {
    id: "D9",
    name: "Content date-stamped when refreshed",
    reason:
      "Only author page shows 'Son güncelleme: Haziran 2026'. Homepage and guide sections lack visible last-updated dates.",
    priority: "Medium",
    action: "Add visible 'Son güncelleme' on homepage and key content sections; sync ArticleJsonLd dateModified.",
  },
  {
    id: "D10",
    name: "Bold/italic for answer phrases",
    reason:
      "Sections use Tailwind font-semibold on UI labels, not semantic <strong>/<em> on factual answer phrases in prose.",
    priority: "Low",
    action: "Highlight key factual sentences in content with semantic strong/em, not decorative utility classes.",
  },
  {
    id: "E1",
    name: "All images in WEBP format",
    reason:
      "SVG assets used in InfoCards (info-registry-visual.svg, info-tax-compare-visual.svg) and refund-background.png (2.1MB) still present in public/images/.",
    priority: "High",
    action: "Convert decorative SVG/PNG assets to optimized WEBP; remove unused PNG duplicate.",
  },
  {
    id: "E2",
    name: "Image compression thresholds",
    reason:
      "refund-background.webp ~103KB (>100KB). refund-background.png ~2.1MB. hero-background.webp ~60KB OK.",
    priority: "High",
    action: "Recompress refund-background.webp under 100KB; delete refund-background.png from public.",
  },
  {
    id: "E6",
    name: "Lazy loading below-fold images",
    reason:
      "InfoCardsSection images lack explicit loading='lazy' (src/components/sections/InfoCardsSection.tsx). Relies on Next default.",
    priority: "Low",
    action: "Add loading='lazy' explicitly to all below-fold Image components for clarity and audits.",
  },
  {
    id: "F6",
    name: "Topic cluster internal linking",
    reason:
      "Weak cross-linking between About, Author, Contact, and homepage sections; only a few contextual links (Hero, FAQ, Guide).",
    priority: "Medium",
    action: "Add contextual links between pillar (homepage), About, Author, and Contact within first sections.",
  },
  {
    id: "F10",
    name: "Related pages at bottom of tool pages",
    reason: "No 'related resources' block linking supporting pages at end of homepage/tool flow.",
    priority: "Low",
    action: "Add related links component before footer on homepage (About, Author, Contact, FAQ anchor).",
  },
  {
    id: "G6",
    name: "Video schema",
    reason: "No embedded video content or VideoObject schema in codebase.",
    priority: "Low",
    action: "Add only if video content is produced; otherwise N/A.",
  },
  {
    id: "G8",
    name: "Schema Rich Results validation",
    reason: "No evidence of Google Rich Results Test / Schema.org validation in repo or CI.",
    priority: "High",
    action: "Run Rich Results Test on /, /tapu-harci-hakkinda, /tapu-harci-iletisim; fix any errors.",
  },
  {
    id: "H5",
    name: "Thin pages handling",
    reason:
      "Contact page is thin (~200 words). Legal pages are noindexed (OK) but Terms not linked in header.",
    priority: "Medium",
    action: "Expand contact page content or add supporting FAQ block; ensure Terms linked in nav if needed.",
  },
  {
    id: "I1",
    name: "Author attribution on content pages",
    reason:
      "AUTHOR_NAME appears in ArticleJsonLd and author page only; homepage long-form sections lack byline.",
    priority: "Medium",
    action: "Add author byline + link to /tapu-harci-yazar on homepage and About content.",
  },
  {
    id: "I4",
    name: "Authoritative external citations",
    reason:
      "Limited clickable links to GİB/TKGM in body content; mostly plain text mentions in legal-content.tsx.",
    priority: "Medium",
    action: "Add rel=noopener links to gib.gov.tr, tkgm.gov.tr in HowItWorks, FAQ, and payment sections.",
  },
  {
    id: "J1",
    name: "Table of Contents for long pages",
    reason: "Homepage exceeds 1500 words but has no jump-link TOC component.",
    priority: "Medium",
    action: "Add sticky or top TOC linking to #info, #how-it-works, #calculator-guide, #faq, etc.",
  },
  {
    id: "J2",
    name: "Calculator above the fold",
    reason:
      "On mobile (max-sm), hero paragraph/badges hidden but H1 still pushes calculator below fold on small screens (375×667).",
    priority: "High",
    action: "Reorder mobile hero (calculator first) or further compact H1 for sub-640px viewports.",
  },
  {
    id: "J6",
    name: "CLS on calculator results",
    reason:
      "AnimatePresence/motion results panel and dynamic height changes may cause layout shift; no explicit CLS guards.",
    priority: "Medium",
    action: "Reserve min-height for results area; test CLS in Lighthouse mobile.",
  },
  {
    id: "J8",
    name: "Social sharing on content pages",
    reason:
      "ResultShareBar exists for calculator results only; no share buttons on About/Author/supporting pages.",
    priority: "Low",
    action: "Add Open Graph share buttons to indexable supporting pages if social distribution is a goal.",
  },
  {
    id: "K1",
    name: "Concise direct answer at top",
    reason: "Homepage opens with marketing H1, not a 40–60 word direct answer snippet for AI/SGE.",
    priority: "High",
    action: "Add answer box under H1: what tapu harcı is, %4 rate, who pays, in 40–60 words.",
  },
  {
    id: "K5",
    name: "Speakable schema",
    reason: "No SpeakableSpecification JSON-LD on key answer paragraphs.",
    priority: "Low",
    action: "Add speakable schema to hero answer box and FAQ answers if pursuing voice/AEO.",
  },
  {
    id: "K8",
    name: "Key Takeaways box",
    reason: "No dedicated summary/takeaways component near top of homepage.",
    priority: "Medium",
    action: "Add bullet 'Önemli Noktalar' box after hero with 4–5 factual takeaways.",
  },
  {
    id: "K10",
    name: "Citation-friendly language",
    reason: "Limited use of attributable phrasing ('492 Sayılı Harçlar Kanunu' present; few 'According to' style citations).",
    priority: "Low",
    action: "Add sourced statements with linked official references in HowItWorks and Examples.",
  },
  {
    id: "K11",
    name: "Wikipedia/Wikidata presence",
    reason: "No off-site directory/Wikipedia integration in codebase (off-page SEO).",
    priority: "Low",
    action: "Marketing/off-page task: list brand on authoritative directories if applicable.",
  },
  {
    id: "K12",
    name: "Consistent brand + tool naming",
    reason: "SITE_NAME is 'TapuCalc' but public brand/logo uses 'Tapu Harcı' (constants.ts vs Logo.tsx).",
    priority: "Medium",
    action: "Align SITE_NAME, titles, and logo text for consistent entity signals.",
  },
  {
    id: "K13",
    name: "Avoid hedging in key facts",
    reason:
      "Disclaimer and body copy use hedging ('olabilir', 'tahmin', 'yalnızca bilgilendirme') which weakens AEO citation.",
    priority: "Low",
    action: "Use definitive phrasing for verified facts; keep hedging only in disclaimer blocks.",
  },
  {
    id: "K14",
    name: "AI citation testing",
    reason: "No documented testing in ChatGPT/Gemini/Perplexity for brand citation.",
    priority: "Low",
    action: "Manual QA task: test branded queries and log citation results.",
  },
  {
    id: "K15",
    name: "Indexable static result pages",
    reason:
      "Calculator results are client-side only; no crawlable URL or static HTML for result states.",
    priority: "Medium",
    action: "Optional: add shareable result URLs with server-rendered summary pages if indexation desired.",
  },
];

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function addFooter(doc, pageNum, totalPages) {
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(`TapuCalc SEO Developer Action Report — Page ${pageNum} of ${totalPages}`, 14, pageH - 8);
}

const doc = new jsPDF({ unit: "mm", format: "a4" });
const pageW = doc.internal.pageSize.getWidth();
const margin = 14;
const contentW = pageW - margin * 2;
let y = 0;

// Cover
doc.setFillColor(...NAVY);
doc.rect(0, 0, pageW, 52, "F");
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.text("SEO Audit — Developer Action Report", margin, 22);
doc.setFontSize(11);
doc.setFont("helvetica", "normal");
doc.text("TapuCalc / Tapu Harcı Land Registry Calculator", margin, 32);
doc.text(`Generated: ${new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}`, margin, 42);

doc.setTextColor(...TEXT);
y = 62;
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Scope", margin, y);
y += 7;
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
y = wrapText(
  doc,
  "Read-only audit of the Next.js codebase (src/app, components, lib, public/images). This report lists checklist items that FAILED or need developer action. Passing items are documented in the companion audit response.",
  margin,
  y,
  contentW,
  5
);
y += 6;
y = wrapText(
  doc,
  `Total failing / action items: ${failingItems.length}`,
  margin,
  y,
  contentW,
  5
);

// Summary table header
y += 10;
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Developer Action Items", margin, y);
y += 8;

const high = failingItems.filter((i) => i.priority === "High").length;
const med = failingItems.filter((i) => i.priority === "Medium").length;
const low = failingItems.filter((i) => i.priority === "Low").length;
doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.text(`Priority breakdown: High ${high} | Medium ${med} | Low ${low}`, margin, y);
y += 10;

for (const item of failingItems) {
  if (y > 265) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(...ORANGE);
  doc.rect(margin, y - 4, 3, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text(`[${item.id}] ${item.name}  (${item.priority})`, margin + 5, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  y = wrapText(doc, `Issue: ${item.reason}`, margin + 5, y, contentW - 5, 4.5);
  y += 1;
  doc.setTextColor(...TEXT);
  y = wrapText(doc, `Action: ${item.action}`, margin + 5, y, contentW - 5, 4.5);
  y += 7;
}

// Implementation phases page
doc.addPage();
y = 20;
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(...NAVY);
doc.text("Recommended Implementation Phases", margin, y);
y += 10;

const phases = [
  {
    title: "Phase 1 — Critical (Week 1)",
    items: ["A4 Meta descriptions", "E1/E2 Image optimization", "G8 Schema validation", "K1 Direct answer box", "J2 Mobile calculator above fold"],
  },
  {
    title: "Phase 2 — On-Page SEO (Week 2)",
    items: ["A1/A2 Title tags", "D8 Answer-first H2s", "D9 Date stamps", "I1 Author bylines", "I4 Official source links", "J1 Table of contents"],
  },
  {
    title: "Phase 3 — AEO & UX (Week 3)",
    items: ["K8 Key takeaways", "F6 Topic cluster links", "H5 Expand thin pages", "J6 CLS fixes", "K12 Brand name alignment"],
  },
  {
    title: "Phase 4 — Optional / Off-page",
    items: ["K11 Directory listings", "K14 AI citation testing", "K15 Shareable result URLs", "G6 Video schema", "J8 Social share on articles"],
  },
];

for (const phase of phases) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ORANGE);
  doc.text(phase.title, margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  for (const line of phase.items) {
    doc.text(`• ${line}`, margin + 3, y);
    y += 5.5;
  }
  y += 4;
}

y += 4;
doc.setFontSize(9);
doc.setTextColor(...MUTED);
wrapText(
  doc,
  "Files reviewed: src/lib/site.ts, src/lib/seo.ts, src/lib/constants.ts, src/components/seo/JsonLd.tsx, src/app/page.tsx, all tapu-harci-* routes, public/images/*, section components.",
  margin,
  y,
  contentW,
  4.5
);

const totalPages = doc.getNumberOfPages();
for (let p = 1; p <= totalPages; p++) {
  doc.setPage(p);
  addFooter(doc, p, totalPages);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
const buffer = Buffer.from(doc.output("arraybuffer"));
fs.writeFileSync(OUT_FILE, buffer);
console.log(`PDF written to ${OUT_FILE}`);
