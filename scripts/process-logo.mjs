import fs from "fs";
import path from "path";
import sharp from "sharp";

const LOGO_IN = path.join(process.cwd(), "public", "images", "logo.webp");
const LOGO_OUT = path.join(process.cwd(), "public", "images", "logo-transparent.webp");
const FAVICON_OUT = path.join(process.cwd(), "public", "favicon.ico");
const FAVICON_SIZE = 48;

function shouldBeTransparent(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  // Neutral gray background, grid pattern, and soft drop shadow
  if (delta < 18 && lum > 118) return true;
  if (delta < 12 && lum > 95) return true;

  return false;
}

async function removeBackground(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (shouldBeTransparent(r, g, b)) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, { raw: { width, height, channels } }).trim();
}

async function main() {
  const trimmed = await removeBackground(LOGO_IN);
  const meta = await trimmed.metadata();

  const targetWidth = Math.round((meta.width ?? 400) * 1.15);
  const logoBuffer = await trimmed
    .resize({ width: targetWidth, withoutEnlargement: false })
    .webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toBuffer();

  await fs.promises.writeFile(LOGO_OUT, logoBuffer);

  const faviconBuffer = await sharp(logoBuffer)
    .resize(FAVICON_SIZE - 4, FAVICON_SIZE - 4, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: 2,
      bottom: 2,
      left: 2,
      right: 2,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(FAVICON_SIZE, FAVICON_SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await fs.promises.writeFile(FAVICON_OUT, faviconBuffer);

  console.log(`✓ logo.webp — transparent, ${targetWidth}px wide`);
  console.log(`✓ favicon.ico — ${FAVICON_SIZE}px, transparent`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
