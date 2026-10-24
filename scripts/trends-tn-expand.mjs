import googleTrends from 'google-trends-api';

const seeds = ['desinsectisation', 'deratisation', 'cafard', 'cafards djerba', 'nuisibles djerba', 'desinsectisation tunisie', 'deratisation tunisie', 'hygiene hotel djerba', 'blatte', 'rat djerba'];

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
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return { avg: Math.round(avg * 10) / 10, max: Math.max(...values), last: values.at(-1) };
}

async function related(keyword) {
  const res = await googleTrends.relatedQueries({
    keyword,
    geo: 'TN',
    startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  });
  const parsed = JSON.parse(res);
  const top = parsed.default?.rankedList?.[0]?.rankedKeyword ?? [];
  const rising = parsed.default?.rankedList?.[1]?.rankedKeyword ?? [];
  return { top: top.slice(0, 15), rising: rising.slice(0, 10) };
}

for (const seed of ['desinsectisation', 'deratisation', 'cafards']) {
  console.log('\n=== RELATED for', seed, '===');
  try {
    const r = await related(seed);
    console.log('TOP:');
    for (const k of r.top) console.log(' ', k.query, '| value', k.value);
    console.log('RISING:');
    for (const k of r.rising) console.log(' ', k.query, '| value', k.value);
  } catch (e) {
    console.log('err', e.message);
  }
  await new Promise((r) => setTimeout(r, 1000));
}

console.log('\n=== ALL SEEDS avg interest TN ===');
const rows = [];
for (const kw of seeds) {
  try {
    const r = await avgInterest(kw);
    if (r) rows.push({ kw, ...r });
    await new Promise((r) => setTimeout(r, 600));
  } catch (_) {}
}
rows.sort((a, b) => b.avg - a.avg);
for (const r of rows) console.log(`${r.kw}\tavg ${r.avg}\tpeak ${r.max}\tlast ${r.last}`);
