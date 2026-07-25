import {
  writeFileSync,
  mkdirSync,
  createWriteStream,
  readdirSync,
  unlinkSync,
  statSync,
} from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const DIR = join('public', 'assets', 'fonts');
mkdirSync(DIR, { recursive: true });

for (const f of readdirSync(DIR)) {
  if (f.endsWith('.woff2') || f === 'fonts.css') unlinkSync(join(DIR, f));
}

const families = [
  {
    name: 'Montserrat',
    query: 'family=Montserrat:wght@400..700',
    subsets: ['latin', 'latin-ext'],
  },
  {
    name: 'Open Sans',
    query: 'family=Open+Sans:wght@400..700',
    subsets: ['latin', 'latin-ext'],
  },
  {
    name: 'Noto Sans Arabic',
    query: 'family=Noto+Sans+Arabic:wght@400..700',
    subsets: ['arabic'],
  },
];

/**
 * @param {string} query
 */
async function fetchCss(query) {
  const url = `https://fonts.googleapis.com/css2?${query}&display=swap`;
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  return res.text();
}

/** @type {{ fam: string; weight: string; subset: string; local: string; unicode: string }[]} */
const faces = [];
/** @type {Map<string, string>} */
const urlToLocal = new Map();

for (const fam of families) {
  const css = await fetchCss(fam.query);
  const re = /\/\* ([^*]+) \*\/\s*@font-face \{([^}]+)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const subset = m[1].trim();
    if (!fam.subsets.includes(subset)) continue;
    const body = m[2];
    const url = (body.match(/url\((https:[^)]+)\)/) || [])[1];
    const unicode = (body.match(/unicode-range:\s*([^;]+);/) || [])[1].trim();
    const weight = (body.match(/font-weight:\s*([^;]+);/) || [])[1].trim();
    if (!url) continue;

    const slug =
      fam.name.toLowerCase().replace(/\s+/g, '-') + `-${subset}.woff2`;
    if (!urlToLocal.has(url)) urlToLocal.set(url, slug);

    faces.push({
      fam: fam.name,
      weight,
      subset,
      local: urlToLocal.get(url),
      unicode,
    });
  }
}

for (const [url, local] of urlToLocal) {
  const dest = join(DIR, local);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fail ${url}: ${r.status}`);
  await pipeline(Readable.fromWeb(r.body), createWriteStream(dest));
  console.log(`${local}  ${Math.round(statSync(dest).size / 1024)}KB`);
}

let outCss =
  '/* Self-hosted variable fonts — latin / latin-ext / arabic, font-display: swap */\n';
for (const f of faces) {
  outCss += `
@font-face {
  font-family: '${f.fam}';
  font-style: normal;
  font-weight: ${f.weight};
  font-display: swap;
  src: url('/assets/fonts/${f.local}') format('woff2');
  unicode-range: ${f.unicode};
}
`;
}

writeFileSync(join(DIR, 'fonts.css'), outCss);

// Keep Angular stylesheet in sync (bundled with main CSS — no extra request)
const scssPath = join('src', 'styles', 'fonts.scss');
writeFileSync(scssPath, outCss);
console.log(`wrote ${scssPath}`);

const totalKb = readdirSync(DIR)
  .filter((f) => f.endsWith('.woff2'))
  .reduce((s, f) => s + statSync(join(DIR, f)).size, 0);
console.log(
  `faces: ${faces.length}, files: ${urlToLocal.size}, total: ${Math.round(totalKb / 1024)}KB`,
);
