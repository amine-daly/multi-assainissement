import fs from 'fs';
import path from 'path';

const root = 'dist/multi-assainissement/browser';
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const desinsect = fs.readFileSync(path.join(root, 'desinsectisation', 'index.html'), 'utf8');

const checks = [
  ['html lang fr-TN', index.includes('lang="fr-TN"') || index.includes("lang='fr-TN'")],
  ['dir ltr default', index.includes('dir="ltr"')],
  ['service hreflang → /ar/', desinsect.includes('hreflang="ar-SA" href="https://multi-assainissement.com/ar/desinsectisation"')],
  ['service x-default', desinsect.includes('hreflang="x-default"')],
  ['service links to Arabic version', desinsect.includes('href="/ar/desinsectisation"')],
  ['brand in prerender', index.includes('Multi-Assainissement')],
  ['i18n fr asset', fs.existsSync(path.join(root, 'assets/i18n/fr-fr.json'))],
  ['i18n en asset', fs.existsSync(path.join(root, 'assets/i18n/en-gb.json'))],
  ['i18n ar asset', fs.existsSync(path.join(root, 'assets/i18n/ar-sa.json'))],
  ['sitemap', fs.existsSync(path.join(root, 'sitemap.xml'))],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}`);
  if (!ok) failed++;
}

const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const smOk = sm.includes('xhtml:link') && sm.includes('hreflang="ar-SA"');
console.log(`${smOk ? 'PASS' : 'FAIL'} - sitemap hreflang`);
if (!smOk) failed++;

const contact = path.join(root, 'contact', 'index.html');
if (fs.existsSync(contact)) {
  const html = fs.readFileSync(contact, 'utf8');
  const noQueryHreflang = !/hreflang="[^"]+" href="[^"]*\?lang=/.test(html);
  console.log(`${noQueryHreflang ? 'PASS' : 'FAIL'} - contact has no ?lang= hreflang`);
  if (!noQueryHreflang) failed++;
} else {
  console.log('WARN - contact/index.html not found (check prerender output shape)');
}

const arDes = path.join(root, 'ar/desinsectisation/index.html');
if (fs.existsSync(arDes)) {
  const html = fs.readFileSync(arDes, 'utf8');
  const arTitleOk = html.includes('بق الفراش') && html.includes('lang="ar-SA"');
  console.log(`${arTitleOk ? 'PASS' : 'FAIL'} - ar/desinsectisation prerender (Arabic title + lang)`);
  if (!arTitleOk) failed++;
} else {
  console.log('FAIL - ar/desinsectisation/index.html missing');
  failed++;
}

const arDer = path.join(root, 'ar/deratisation/index.html');
if (fs.existsSync(arDer)) {
  const html = fs.readFileSync(arDer, 'utf8');
  const arTitleOk = html.includes('مكافحة الفئران') && html.includes('dir="rtl"');
  console.log(`${arTitleOk ? 'PASS' : 'FAIL'} - ar/deratisation prerender (Arabic + RTL)`);
  if (!arTitleOk) failed++;
} else {
  console.log('FAIL - ar/deratisation/index.html missing');
  failed++;
}

process.exit(failed ? 1 : 0);
