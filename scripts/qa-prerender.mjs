import fs from 'fs';
import path from 'path';

const root = 'dist/multi-assainissement/browser';
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const checks = [
  ['html lang fr-TN', index.includes('lang="fr-TN"') || index.includes("lang='fr-TN'")],
  ['dir ltr default', index.includes('dir="ltr"')],
  ['hreflang present', index.includes('hreflang="fr-TN"')],
  ['x-default', index.includes('hreflang="x-default"')],
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
  const hasHreflang = html.includes('hreflang="en-GB"');
  console.log(`${hasHreflang ? 'PASS' : 'FAIL'} - contact prerender hreflang`);
  if (!hasHreflang) failed++;
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
