import { readdirSync, unlinkSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const DIR = join('public', 'assets', 'images');

/** @type {Record<string, { width: number; quality: number }>} */
const PRESETS = {
  'hero-djerba.png': { width: 1600, quality: 78 },
  'logo.png': { width: 480, quality: 85 },
  'logo-multi-assainissement.png': { width: 480, quality: 85 },
};

const DEFAULT = { width: 1200, quality: 78 };

async function convert(file) {
  const src = join(DIR, file);
  const out = join(DIR, `${basename(file, extname(file))}.webp`);
  const preset = PRESETS[file] ?? DEFAULT;
  const before = statSync(src).size;

  await sharp(src)
    .rotate()
    .resize({ width: preset.width, withoutEnlargement: true })
    .webp({ quality: preset.quality, effort: 5 })
    .toFile(out);

  const after = statSync(out).size;
  unlinkSync(src);
  const saved = (((before - after) / before) * 100).toFixed(0);
  console.log(
    `${file} → ${basename(out)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${saved}%)`,
  );
}

const pngs = readdirSync(DIR).filter((f) => f.toLowerCase().endsWith('.png'));
if (!pngs.length) {
  console.log('No PNGs to convert.');
  process.exit(0);
}

for (const file of pngs) {
  await convert(file);
}
