import fs from 'fs';
import path from 'path';

async function main() {
  const mcpConfigPath = path.resolve('C:/Users/amine/.gemini/config/mcp_config.json');
  const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
  const gAdsEnv = mcpConfig.mcpServers['google-ads'].env;

  const clientId = gAdsEnv.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = gAdsEnv.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = gAdsEnv.GOOGLE_ADS_REFRESH_TOKEN;
  const customerId = gAdsEnv.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '');
  const developerToken = gAdsEnv.GOOGLE_ADS_DEVELOPER_TOKEN;

  console.log(`[1] Authenticating via OAuth2 for Customer ID: ${customerId}...`);

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    console.error('OAuth Token Error:', tokenData);
    process.exit(1);
  }

  const accessToken = tokenData.access_token;
  console.log('[1] Successfully obtained OAuth2 access token.');

  // Strict Geo Targeting: Djerba + Zarzis ONLY
  const targetLocations = [
    { name: 'Houmt Souk (City)', id: 'geoTargetConstants/9076119' },
    { name: 'Djerba - Houmt Souk (District)', id: 'geoTargetConstants/9261985' },
    { name: 'Djerba Midoun (District)', id: 'geoTargetConstants/9209691' },
    { name: 'Djerba - Ajim (District)', id: 'geoTargetConstants/9263251' },
    { name: 'Zarzis (District)', id: 'geoTargetConstants/9232848' },
  ];

  const geoTargetConstants = targetLocations.map(l => l.id);

  console.log('\n[2] Targeted Municipalities (Djerba + Zarzis strictly):');
  targetLocations.forEach(loc => console.log(`   * ${loc.name} -> ${loc.id}`));
  console.log('   * Excluded: Tunisia National (geoTargetConstants/2788)');

  const seedKeywords = [
    'etancheite toit',
    'etancheite djerba',
    "fuite d'eau toit",
    'عزل الأسطح',
    'مقاول عزل',
  ];

  console.log(`\n[3] Calling Google Ads API v26 generateKeywordIdeas...`);
  const kwUrl = `https://googleads.googleapis.com/v26/customers/${customerId}:generateKeywordIdeas`;

  // French query
  const frRes = await fetch(kwUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': developerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'languageConstants/1002',
      geoTargetConstants: geoTargetConstants,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: {
        keywords: seedKeywords,
      },
    }),
  });
  const frData = await frRes.json();

  // Arabic query
  const arRes = await fetch(kwUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': developerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'languageConstants/1019',
      geoTargetConstants: geoTargetConstants,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: {
        keywords: seedKeywords,
      },
    }),
  });
  const arData = await arRes.json();

  const combinedResults = [...(frData.results || []), ...(arData.results || [])];
  fs.writeFileSync('scripts/etancheite-results.json', JSON.stringify({ fr: frData, ar: arData }, null, 2), 'utf8');

  function normalize(str) {
    return str.toLowerCase().replace(/['’]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const winterMonths = ['OCTOBER', 'NOVEMBER', 'DECEMBER', 'JANUARY', 'FEBRUARY', 'MARCH'];
  const rows = [];

  for (const seed of seedKeywords) {
    const normSeed = normalize(seed);
    const match = combinedResults.find(r => normalize(r.text) === normSeed);
    const metrics = match ? match.keywordIdeaMetrics : null;
    const monthlyList = metrics && metrics.monthlySearchVolumes ? metrics.monthlySearchVolumes : [];

    const monthValues = {};
    winterMonths.forEach(m => monthValues[m] = 0);

    monthlyList.forEach(item => {
      const m = item.month.toUpperCase();
      if (winterMonths.includes(m)) {
        monthValues[m] = parseInt(item.monthlySearches || '0', 10);
      }
    });

    const lowBid = metrics && metrics.lowTopOfPageBidMicros 
      ? (metrics.lowTopOfPageBidMicros / 1000000).toFixed(2) + ' €' 
      : '—';
    const highBid = metrics && metrics.highTopOfPageBidMicros 
      ? (metrics.highTopOfPageBidMicros / 1000000).toFixed(2) + ' €' 
      : '—';

    rows.push({
      seed,
      avg: metrics ? (metrics.avgMonthlySearches || '0') : '0',
      oct: monthValues['OCTOBER'],
      nov: monthValues['NOVEMBER'],
      dec: monthValues['DECEMBER'],
      jan: monthValues['JANUARY'],
      feb: monthValues['FEBRUARY'],
      mar: monthValues['MARCH'],
      cpcLow: lowBid,
      cpcHigh: highBid,
      compIdx: metrics && metrics.competitionIndex !== undefined ? metrics.competitionIndex : 'N/A',
      competition: metrics ? (metrics.competition || 'NONE') : 'N/A',
      monthlyList
    });
  }

  console.log('\n' + '='.repeat(130));
  console.log('DJERBA & ZARZIS STRICT — ÉTANCHÉITÉ TOIT & BÂTIMENT (WINTER PERIOD OCT-MAR)');
  console.log('='.repeat(130));
  console.log([
    'Seed Keyword'.padEnd(26),
    'Oct'.padStart(5),
    'Nov'.padStart(5),
    'Dec'.padStart(5),
    'Jan'.padStart(5),
    'Feb'.padStart(5),
    'Mar'.padStart(5),
    'Top CPC Low'.padStart(14),
    'Top CPC High'.padStart(14),
    'Comp. Index'.padStart(12),
    'Level'.padStart(8),
  ].join(' | '));
  console.log('-'.repeat(130));

  rows.forEach(r => {
    console.log([
      r.seed.padEnd(26),
      String(r.oct).padStart(5),
      String(r.nov).padStart(5),
      String(r.dec).padStart(5),
      String(r.jan).padStart(5),
      String(r.feb).padStart(5),
      String(r.mar).padStart(5),
      r.cpcLow.padStart(14),
      r.cpcHigh.padStart(14),
      String(r.compIdx).padStart(12),
      r.competition.padStart(8),
    ].join(' | '));
  });
  console.log('='.repeat(130));

  console.log('\n--- ALL GENERATED IDEAS SUMMARY ---');
  combinedResults.forEach(r => {
    const m = r.keywordIdeaMetrics;
    console.log(`${r.text} | Avg: ${m?.avgMonthlySearches ?? 0} | CompIdx: ${m?.competitionIndex ?? 'N/A'}`);
  });
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
