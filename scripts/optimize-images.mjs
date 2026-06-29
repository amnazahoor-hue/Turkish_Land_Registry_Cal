import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const OUTPUT_DIR = path.join(process.cwd(), "public", "images-optimized");
const MAX_BYTES = 100 * 1024;
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

/** Max width hints by filename pattern */
function maxWidthFor(fileName) {
  if (fileName.includes("author")) return 640;
  if (fileName.includes("logo")) return 512;
  if (fileName.includes("faq-sidebar")) return 720;
  if (fileName.includes("background")) return 1600;
  if (fileName.includes("visual") || fileName.includes("illustration")) return 720;
  return 1400;
}

async function optimizeToWebp(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = path.basename(inputPath, path.extname(inputPath)).toLowerCase();
  const outputPath = path.join(OUTPUT_DIR, `${base}.webp`);

  const meta = await sharp(inputPath).metadata();
  const maxWidth = Math.min(meta.width ?? maxWidthFor(base), maxWidthFor(base));

  let quality = 82;
  let buffer = null;

  while (quality >= 35) {
    buffer = await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (buffer.length <= MAX_BYTES) break;
    quality -= 8;
  }

  if (!buffer || buffer.length > MAX_BYTES) {
    let width = maxWidth;
    while (width >= 480 && (!buffer || buffer.length > MAX_BYTES)) {
      buffer = await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72, effort: 6 })
        .toBuffer();
      width -= 120;
    }
  }

  if (!buffer || buffer.length > MAX_BYTES) {
    throw new Error(
      `Could not compress ${path.basename(inputPath)} below 100KB (got ${Math.round((buffer?.length ?? 0) / 1024)}KB)`
    );
  }

  const tempPath = `${outputPath}.tmp`;
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.promises.writeFile(tempPath, buffer);
  await fs.promises.rename(tempPath, outputPath);

  return {
    file: path.basename(outputPath),
    sizeKB: Math.round((buffer.length / 1024) * 10) / 10,
    quality,
    maxWidth,
  };
}

async function swapOptimizedImages() {
  const rasterNames = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()));

  for (const name of rasterNames) {
    const filePath = path.join(IMAGES_DIR, name);
    const backupPath = `${filePath}.old`;
    try {
      if (fs.existsSync(backupPath)) await fs.promises.unlink(backupPath);
      await fs.promises.rename(filePath, backupPath);
    } catch {
      console.warn(`  (could not rename old file: ${name})`);
    }
  }

  const optimized = fs.readdirSync(OUTPUT_DIR);
  for (const name of optimized) {
    if (name.endsWith(".tmp")) continue;
    await fs.promises.copyFile(
      path.join(OUTPUT_DIR, name),
      path.join(IMAGES_DIR, name)
    );
  }

  for (const name of rasterNames) {
    const backupPath = path.join(IMAGES_DIR, `${name}.old`);
    if (fs.existsSync(backupPath)) {
      try {
        await fs.promises.unlink(backupPath);
      } catch {
        /* locked backup — leave for manual cleanup */
      }
    }
  }

  await fs.promises.rm(OUTPUT_DIR, { recursive: true, force: true });
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error("Images directory not found:", IMAGES_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(IMAGES_DIR, f))
    .filter((f) => !f.endsWith(".tmp"));

  const seen = new Set();
  const unique = files.filter((f) => {
    const base = path.basename(f, path.extname(f)).toLowerCase();
    if (seen.has(base)) return false;
    seen.add(base);
    return true;
  });

  console.log(`Optimizing ${unique.length} raster image(s) to WebP (<100KB)...\n`);

  for (const file of unique) {
    const result = await optimizeToWebp(file);
    console.log(`✓ ${result.file} — ${result.sizeKB} KB`);
  }

  console.log("\nReplacing originals in public/images...");
  await swapOptimizedImages();

  console.log("\nDone. Source PNG/JPEG/SVG files are moved aside as *.old when replaced.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
