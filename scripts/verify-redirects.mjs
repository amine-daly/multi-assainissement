#!/usr/bin/env node
/**
 * Verify live HTTP status + Location for amplify-redirects.json rules.
 * Usage: node scripts/verify-redirects.mjs [baseUrl]
 */
import fs from 'node:fs';

const base = (process.argv[2] ?? 'https://multi-assainissement.com').replace(/\/$/, '');
const rules = JSON.parse(fs.readFileSync('amplify-redirects.json', 'utf8'));

const marketing = [
  '/',
  '/desinsectisation',
  '/deratisation',
  '/a-propos',
  '/contact',
  '/faq',
  '/ar/desinsectisation',
  '/ar/deratisation',
];

async function head(url) {
  const res = await fetch(url, { redirect: 'manual' });
  return {
    status: res.status,
    location: res.headers.get('location'),
  };
}

async function followFinal(url, max = 5) {
  let current = url;
  const chain = [];
  for (let i = 0; i < max; i++) {
    const { status, location } = await head(current);
    chain.push({ url: current, status, location });
    if (status >= 300 && status < 400 && location) {
      current = new URL(location, current).href;
      continue;
    }
    break;
  }
  return chain;
}

let failed = 0;

console.log(`\n=== Marketing routes (${base}) ===\n`);
for (const path of marketing) {
  const chain = await followFinal(`${base}${path}`);
  const last = chain[chain.length - 1];
  const landedOn404 = last.url.includes('/404.html');
  const ok = last.status === 200 && !landedOn404;
  const dest = landedOn404 ? '404.html (missing page or trailing-slash bug)' : last.status;
  console.log(
    `${ok ? 'OK' : 'FAIL'} ${path} → ${dest} (${chain.map((c) => c.status).join(' → ')})`,
  );
  if (!ok) failed++;
}

console.log(`\n=== Amplify 301 rules (sample: ${rules.length} total) ===\n`);
for (const rule of rules) {
  if (rule.status !== '301') continue;
  const src = `${base}${rule.source.replace('<*>', 'legacy-unknown-slug')}`;
  const { status, location } = await head(src);
  const locPath = location ? new URL(location, base).pathname : '';
  const expected = rule.target;
  const ok = status === 301 && locPath === expected;
  if (!ok) {
    console.log(`FAIL ${rule.source} → ${status} ${location ?? '(no Location)'} (want ${expected})`);
    failed++;
  }
}

console.log(`\n${failed ? `FAILED: ${failed} issue(s)` : 'All checks passed.'}\n`);
process.exit(failed ? 1 : 0);
