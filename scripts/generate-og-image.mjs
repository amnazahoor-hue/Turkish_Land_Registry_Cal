import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images", "og-image.webp");
const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a3c5e"/>
      <stop offset="100%" style="stop-color:#2d6a9f"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="1050" cy="120" r="180" fill="#e85d26" opacity="0.15"/>
  <circle cx="150" cy="520" r="220" fill="#f4a623" opacity="0.12"/>
  <text x="80" y="200" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700" fill="#ffffff">
    Tapu Harcı Hesaplama
  </text>
  <text x="80" y="280" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="500" fill="#f4a623">
    Alıcı ve satıcı paylarını anında hesaplayın
  </text>
  <text x="80" y="360" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#ffffff" opacity="0.85">
    Resmi %4 oran · %2 alıcı + %2 satıcı · Ücretsiz araç
  </text>
  <rect x="80" y="420" width="280" height="56" rx="28" fill="#e85d26"/>
  <text x="120" y="456" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="#ffffff">
    tapuharcihesaplama.tr
  </text>
</svg>
`;

async function main() {
  const buffer = await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  await fs.promises.mkdir(path.dirname(OUT), { recursive: true });
  await fs.promises.writeFile(OUT, buffer);
  console.log(`✓ og-image.webp — ${Math.round(buffer.length / 1024)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
