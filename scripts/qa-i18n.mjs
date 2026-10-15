import fs from 'fs';
import { execSync } from 'child_process';

function flatten(o, p = '') {
  const keys = [];
  for (const [a, v] of Object.entries(o)) {
    const n = p ? `${p}.${a}` : a;
    if (v && typeof v === 'object' && !Array.isArray(v)) keys.push(...flatten(v, n));
    else keys.push(n);
  }
  return keys;
}

function get(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

const langs = ['fr-fr', 'en-gb', 'ar-sa'];
const maps = Object.fromEntries(
  langs.map((l) => {
    const json = JSON.parse(fs.readFileSync(`public/assets/i18n/${l}.json`, 'utf8'));
    return [l, { json, keys: new Set(flatten(json)) }];
  }),
);

const base = [...maps['fr-fr'].keys].sort();
let parityOk = true;
for (const l of langs) {
  const miss = base.filter((k) => !maps[l].keys.has(k));
  const extra = [...maps[l].keys].filter((k) => !maps['fr-fr'].keys.has(k));
  console.log(`\n== ${l}: ${maps[l].keys.size} keys ==`);
  if (miss.length) {
    parityOk = false;
    console.log('  missing vs fr-fr:', miss);
  }
  if (extra.length) {
    parityOk = false;
    console.log('  extra vs fr-fr:', extra);
  }
  const empty = base.filter((k) => {
    const v = get(maps[l].json, k);
    return typeof v === 'string' && v.trim() === '';
  });
  if (empty.length) {
    parityOk = false;
    console.log('  empty values:', empty);
  }
}

const files = execSync(
  'rg -l "translate|titleKey|labelKey|descriptionKey|instant\\(" src/app -g "*.ts" -g "*.html"',
  { encoding: 'utf8' },
)
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const used = new Set();
const keyRe =
  /(?:titleKey|subtitleKey|labelKey|descKey|qKey|aKey|descriptionKey|captionKey|altKey|beforeAltKey|afterAltKey)\s*[:=]\s*['"]([a-zA-Z][a-zA-Z0-9_.]*)['"]|'([a-zA-Z][a-zA-Z0-9_.]*)'\s*\|\s*translate|"([a-zA-Z][a-zA-Z0-9_.]*)"\s*\|\s*translate|instant\(\s*['"]([a-zA-Z][a-zA-Z0-9_.]*)['"]/g;
/** Keys listed as string literals (e.g. why-choose-us points array) and piped later. */
const literalKeyRe = /['"]((?:home|lead|nav|header|footer|common|seo|faq|alt|about|contact|privacy|notFound|desinsectisation|deratisation|nettoyagePiscine|capturationChats|legionellose|sticky|brand|quickContact|emergency|pageHeader|proofGallery|sidebar|lang)\.[a-zA-Z0-9_.]+)['"]/g;

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = keyRe.exec(text))) {
    const key = m[1] || m[2] || m[3] || m[4];
    if (key && key.includes('.')) used.add(key);
  }
  while ((m = literalKeyRe.exec(text))) {
    used.add(m[1]);
  }
}

const missingInJson = [...used].filter((k) => !maps['fr-fr'].keys.has(k)).sort();
const unused = base.filter((k) => !used.has(k));

console.log(`\n== Template/TS usage ==`);
console.log(`Used keys: ${used.size}`);
console.log(`Missing from JSON: ${missingInJson.length}`);
missingInJson.forEach((k) => console.log('  ', k));

// Unused is informational (seo.* may only be used via PAGE_SEO maps)
const criticalUnused = unused.filter(
  (k) => !k.startsWith('seo.') && !k.startsWith('alt.') && !k.startsWith('lang.'),
);
console.log(`Unused non-seo/alt/lang keys: ${criticalUnused.length}`);
criticalUnused.slice(0, 40).forEach((k) => console.log('  ', k));

// Spot-check critical groups
const groups = [
  'lead.',
  'header.',
  'nav.',
  'home.hero.',
  'common.whatsappPrefill',
  'faq.items.',
  'seo.home.',
];
console.log('\n== Critical group presence ==');
for (const g of groups) {
  const keys = base.filter((k) => k === g || k.startsWith(g));
  const ok = keys.every((k) => langs.every((l) => maps[l].keys.has(k)));
  console.log(`  ${g}* (${keys.length}): ${ok ? 'OK' : 'FAIL'}`);
}

// Hardcoded French leftovers in templates (heuristic)
const frHits = [];
const frRe =
  /\b(Appelez|Désinsectisation|Dératisation|WhatsApp Devis|Me faire rappeler|Liens rapides|Entreprise Agréée|Questions fréquentes|Politique de confidentialité)\b/;
for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const [i, line] of text.split(/\r?\n/).entries()) {
    if (frRe.test(line) && !line.includes('translate') && !line.includes('//')) {
      frHits.push(`${file}:${i + 1}: ${line.trim().slice(0, 120)}`);
    }
  }
}
console.log(`\n== Possible hardcoded FR in HTML ==`);
console.log(frHits.length ? frHits.join('\n') : '  none found');

const exit = missingInJson.length || !parityOk ? 1 : 0;
console.log(`\nQA keys result: ${exit === 0 ? 'PASS' : 'FAIL'}`);
process.exit(exit);
