import {
  readdirSync,
  unlinkSync,
  statSync,
  existsSync,
  renameSync,
  copyFileSync,
} from 'node:fs';
import { join, extname, basename, relative, dirname } from 'node:path';
import sharp from 'sharp';

const ROOT = join('public', 'assets', 'images');

/** @typedef {{ width: number; quality: number }} Preset */

/** @type {Record<string, Preset>} */
const PRESETS = {
  'hero-djerba.png': { width: 1400, quality: 72 },
  'hero-djerba.webp': { width: 1400, quality: 72 },
  'activity-hotel.png': { width: 800, quality: 72 },
  'activity-hotel.webp': { width: 800, quality: 72 },
  'bait-station.png': { width: 900, quality: 72 },
  'bait-station.webp': { width: 900, quality: 72 },
  'desinsectisation-bedbugs.png': { width: 1000, quality: 72 },
  'desinsectisation-bedbugs.webp': { width: 1000, quality: 72 },
  'before-deratisation.png': { width: 1000, quality: 72 },
  'after-deratisation.png': { width: 1000, quality: 72 },
  'logo.png': { width: 480, quality: 82 },
  'logo.webp': { width: 480, quality: 82 },
  'logo-multi-assainissement.png': { width: 480, quality: 82 },
};

const CLIENT_PRESET = { width: 320, quality: 80 };
const DEFAULT = { width: 1100, quality: 72 };

/** Extra responsive variants */
const VARIANTS = [
  {
    sourceRel: 'hero-djerba-md.webp',
    outRel: 'hero-djerba-sm.webp',
    width: 1100,
    quality: 62,
  },
];

function walk(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function presetFor(relPath) {
  const name = basename(relPath);
  if (PRESETS[name]) return PRESETS[name];
  if (relPath.replace(/\\/g, '/').includes('/clients/')) return CLIENT_PRESET;
  return DEFAULT;
}

async function toWebp(srcAbs, outAbs, width, quality) {
  const before = existsSync(srcAbs) ? statSync(srcAbs).size : 0;
  await sharp(srcAbs)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outAbs);
  const after = statSync(outAbs).size;
  return { before, after };
}

function replaceFile(tmp, dest) {
  try {
    if (existsSync(dest)) unlinkSync(dest);
    renameSync(tmp, dest);
  } catch {
    copyFileSync(tmp, dest);
    try {
      unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

async function convertPng(absPath) {
  const rel = relative(ROOT, absPath);
  const outAbs = join(
    dirname(absPath),
    `${basename(absPath, extname(absPath))}.webp`,
  );
  const { width, quality } = presetFor(rel);
  const tmp = `${outAbs}.tmp`;
  const { before, after } = await toWebp(absPath, tmp, width, quality);
  replaceFile(tmp, outAbs);
  try {
    unlinkSync(absPath);
  } catch (err) {
    console.warn(`could not delete ${rel}: ${err.message}`);
  }
  const saved = before ? (((before - after) / before) * 100).toFixed(0) : '?';
  console.log(
    `${rel} → ${basename(outAbs)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${saved}%)`,
  );
  return outAbs;
}

/** Re-encode oversized WebPs */
async function recompressWebp(absPath) {
  const rel = relative(ROOT, absPath);
  const name = basename(rel);
  if (name.endsWith('-sm.webp') || name.endsWith('.tmp')) return;

  const sizeKb = statSync(absPath).size / 1024;
  const { width, quality } = presetFor(rel);
  const needsWork = sizeKb > 120 || name === 'hero-djerba.webp';
  if (!needsWork) return;

  const tmp = `${absPath}.tmp`;
  const { before, after } = await toWebp(absPath, tmp, width, quality);
  if (after >= before * 0.95) {
    unlinkSync(tmp);
    console.log(`skip ${rel} (already optimized)`);
    return;
  }
  replaceFile(tmp, absPath);
  const saved = (((before - after) / before) * 100).toFixed(0);
  console.log(
    `recompress ${rel}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${saved}%)`,
  );
}

async function writeVariants() {
  for (const v of VARIANTS) {
    const src = join(ROOT, v.sourceRel);
    if (!existsSync(src)) {
      console.warn(`variant skip: missing ${v.sourceRel}`);
      continue;
    }
    const out = join(ROOT, v.outRel);
    const tmp = `${out}.tmp`;
    const { before, after } = await toWebp(src, tmp, v.width, v.quality);
    replaceFile(tmp, out);
    console.log(
      `variant ${v.outRel}  from ${basename(src)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
    );
  }
}

const all = walk(ROOT);
const pngs = all.filter((f) => f.toLowerCase().endsWith('.png'));
/** @type {Set<string>} */
const justConverted = new Set();

if (!pngs.length) console.log('No PNGs to convert.');
for (const file of pngs) {
  const out = await convertPng(file);
  justConverted.add(out);
}

for (const file of walk(ROOT).filter((f) => f.toLowerCase().endsWith('.webp'))) {
  if (justConverted.has(file)) continue;
  await recompressWebp(file);
}

await writeVariants();
console.log('Done.');
