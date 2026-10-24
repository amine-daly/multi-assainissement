import googleTrends from 'google-trends-api';

const keywords = [
  'desinsectisation',
  'dératisation',
  'désinsectisation',
  'dératisation djerba',
  'désinsectisation djerba',
  'cafards',
  'punaises de lit',
  'lutte antiparasitaire',
  'extermination cafards',
  'entreprise désinsectisation',
  'Multi-Assainissement',
];

async function interest(keyword) {
  const res = await googleTrends.interestOverTime({
    keyword,
    geo: 'TN',
    startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  });
  const parsed = JSON.parse(res);
  const timeline = parsed.default?.timelineData ?? [];
  if (!timeline.length) return null;
  const values = timeline.map((t) => t.value[0]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const last = values[values.length - 1];
  const max = Math.max(...values);
  return { avg: Math.round(avg * 10) / 10, last, max };
}

async function compare() {
  const res = await googleTrends.interestOverTime({
    keyword: keywords.slice(0, 5),
    geo: 'TN',
    startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  });
  const parsed = JSON.parse(res);
  const timeline = parsed.default?.timelineData ?? [];
  const cols = parsed.default?.averages ?? [];
  console.log('--- Google Trends compare (TN, relative 0-100, API averages) ---');
  for (const a of cols) {
    console.log(`${a.keyword}: avg ${a.value}`);
  }
  return cols;
}

console.log('Google Trends — Tunisia (TN), last 12 months\n');
console.log('Keyword | avg interest | last week | peak');
console.log('---|---|---|---');

for (const kw of keywords) {
  try {
    const r = await interest(kw);
    if (r) console.log(`${kw} | ${r.avg} | ${r.last} | ${r.max}`);
    else console.log(`${kw} | no data`);
    await new Promise((r) => setTimeout(r, 800));
  } catch (e) {
    console.log(`${kw} | error: ${e.message?.slice(0, 80)}`);
  }
}

try {
  await compare();
} catch (e) {
  console.log('compare error', e.message);
}
