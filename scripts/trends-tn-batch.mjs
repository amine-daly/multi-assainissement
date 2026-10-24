import googleTrends from 'google-trends-api';
import fs from 'fs';

/** Pest / sanitation keywords relevant to Multi-Assainissement (Djerba + Tunisia). */
const KEYWORDS = [
  // Core services (FR, with/without accents)
  'desinsectisation',
  'désinsectisation',
  'deratisation',
  'dératisation',
  'decafardisation',
  'décafardisation',
  'desinfection',
  'désinfection',
  'lutte antiparasitaire',
  'nuisibles',
  'traitement nuisibles',
  'entreprise desinsectisation',
  'societe desinsectisation',
  'société de dératisation',
  'societe de deratisation',
  // Pests
  'cafards',
  'cafard',
  'blatte',
  'blattes',
  'blatte germanique',
  'punaises de lit',
  'punaise de lit',
  'rats',
  'souris',
  'rongeurs',
  'fourmis',
  'moustiques',
  'scorpion',
  // Geo — national
  'desinsectisation tunisie',
  'dératisation tunisie',
  'desinsectisation tunis',
  'deratisation tunis',
  // Geo — Djerba / south
  'desinsectisation djerba',
  'dératisation djerba',
  'deratisation djerba',
  'desinsectisation djerba tunisie',
  'nuisibles djerba',
  'cafards djerba',
  'deratisation midoun',
  'desinsectisation houmt souk',
  // Hotel / pro
  'desinsectisation hotel',
  'dératisation hôtel',
  'hygiene hotel',
  'hygiène hôtelière',
  'lutte anti legionelle',
  'legionelle hotel',
  'captation chats',
  'capture chats errants',
  // Brand / generic
  'Multi-Assainissement',
  'multi assainissement',
  'assainissement djerba',
  'entreprise assainissement djerba',
  // AR / mixed (common in TN)
  'مكافحة الحشرات',
  'مكافحة الفئران',
];

async function avgInterest(keyword) {
  const res = await googleTrends.interestOverTime({
    keyword,
    geo: 'TN',
    startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  });
  const parsed = JSON.parse(res);
  const timeline = parsed.default?.timelineData ?? [];
  if (!timeline.length) return null;
  const values = timeline.map((t) => t.value[0]);
  const sum = values.reduce((a, b) => a + b, 0);
  if (sum === 0) return null;
  const avg = sum / values.length;
  return {
    avg: Math.round(avg * 10) / 10,
    max: Math.max(...values),
    last: values.at(-1),
    weeks: values.length,
  };
}

const results = [];
for (const kw of KEYWORDS) {
  try {
    const r = await avgInterest(kw);
    if (r) results.push({ keyword: kw, ...r });
  } catch (_) {}
  await new Promise((r) => setTimeout(r, 450));
}

results.sort((a, b) => b.avg - a.avg);

const outPath = 'scripts/trends-tn-results.json';
fs.writeFileSync(outPath, JSON.stringify({ geo: 'TN', period: 'last 12 months', source: 'Google Trends API', results }, null, 2));

console.log('Source: Google Trends (Tunisia TN), relative interest 0-100, 12-month average\n');
console.log('Rank | Avg | Peak | Last | Keyword');
console.log('-----|-----|------|------|--------');
results.forEach((r, i) => {
  console.log(`${String(i + 1).padStart(4)} | ${String(r.avg).padStart(4)} | ${String(r.max).padStart(4)} | ${String(r.last).padStart(4)} | ${r.keyword}`);
});
console.log(`\nNo measurable Trends data: ${KEYWORDS.length - results.length} keywords`);
console.log(`Full JSON: ${outPath}`);
