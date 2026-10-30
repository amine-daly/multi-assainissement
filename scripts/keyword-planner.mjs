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

  // Djerba-specific municipality geoTargetConstants (Houmt Souk, Midoun, Ajim)
  // Explicitly excluding broader Médenine (geoTargetConstants/9075937) and Tunisia (geoTargetConstants/2788)
  const djerbaMunicipalities = [
    { name: 'Houmt Souk (City)', id: 'geoTargetConstants/9076119' },
    { name: 'Djerba - Houmt Souk (District)', id: 'geoTargetConstants/9261985' },
    { name: 'Djerba Midoun (District)', id: 'geoTargetConstants/9209691' },
    { name: 'Djerba - Ajim (District)', id: 'geoTargetConstants/9263251' },
  ];

  const djerbaGeoTargetConstants = djerbaMunicipalities.map(m => m.id);

  console.log('\n[2] Targeted Djerba Municipalities (Strictly island boundaries):');
  djerbaMunicipalities.forEach(m => console.log(`   * ${m.name} -> ${m.id}`));
  console.log('   * Excluded: Médenine Governorate (geoTargetConstants/9075937)');
  console.log('   * Excluded: Tunisia National (geoTargetConstants/2788)');

  const seedKeywords = [
    "fuite d'eau",
    'pompage eau',
    'nettoyage toiture',
    'etancheite toit',
    'nettoyage degats des eaux',
  ];

  console.log(`\n[3] Calling Google Ads API v26 generateKeywordIdeas...`);
  const kwUrl = `https://googleads.googleapis.com/v26/customers/${customerId}:generateKeywordIdeas`;

  const kwRes = await fetch(kwUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': developerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      geoTargetConstants: djerbaGeoTargetConstants,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: {
        keywords: seedKeywords,
      },
    }),
  });

  const kwData = await kwRes.json();
  if (!kwRes.ok) {
    console.error('API Error:', JSON.stringify(kwData, null, 2));
    process.exit(1);
  }

  fs.writeFileSync('scripts/djerba-winter-results.json', JSON.stringify(kwData, null, 2), 'utf8');

  function normalize(str) {
    return str.toLowerCase().replace(/['’]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const winterMonths = ['OCTOBER', 'NOVEMBER', 'DECEMBER', 'JANUARY', 'FEBRUARY', 'MARCH'];
  const results = kwData.results || [];

  const rows = [];

  for (const seed of seedKeywords) {
    const normSeed = normalize(seed);
    const match = results.find(r => normalize(r.text) === normSeed);
    const metrics = match ? match.keywordIdeaMetrics : null;
    const monthlyList = metrics && metrics.monthlySearchVolumes ? metrics.monthlySearchVolumes : [];

    const monthValues = {};
    winterMonths.forEach(m => monthValues[m] = '0');

    monthlyList.forEach(item => {
      const m = item.month.toUpperCase();
      if (winterMonths.includes(m)) {
        monthValues[m] = item.monthlySearches || '0';
      }
    });

    const lowBid = metrics && metrics.lowTopOfPageBidMicros 
      ? (metrics.lowTopOfPageBidMicros / 1000000).toFixed(2) + ' €' 
      : '—';
    const highBid = metrics && metrics.highTopOfPageBidMicros 
      ? (metrics.highTopOfPageBidMicros / 1000000).toFixed(2) + ' €' 
      : '—';

    rows.push({
      keyword: seed,
      oct: monthValues['OCTOBER'],
      nov: monthValues['NOVEMBER'],
      dec: monthValues['DECEMBER'],
      jan: monthValues['JANUARY'],
      feb: monthValues['FEBRUARY'],
      mar: monthValues['MARCH'],
      cpcLow: lowBid,
      cpcHigh: highBid,
      compIdx: metrics && metrics.competitionIndex !== undefined ? metrics.competitionIndex : 'N/A',
      competition: metrics ? metrics.competition || 'NONE' : 'N/A',
    });
  }

  console.log('\n' + '='.repeat(128));
  console.log('DJERBA STRICT (HOUMT SOUK, MIDOUN, AJIM) — WINTER SEARCH VOLUMES (OCT-MAR) & TOP-OF-PAGE CPC');
  console.log('='.repeat(128));
  console.log([
    'Seed Keyword'.padEnd(28),
    'Oct 25'.padStart(7),
    'Nov 25'.padStart(7),
    'Dec 25'.padStart(7),
    'Jan 26'.padStart(7),
    'Feb 26'.padStart(7),
    'Mar 26'.padStart(7),
    'Top CPC Low'.padStart(14),
    'Top CPC High'.padStart(14),
    'Comp. Index'.padStart(12),
  ].join(' | '));
  console.log('-'.repeat(128));

  rows.forEach(r => {
    console.log([
      r.keyword.padEnd(28),
      String(r.oct).padStart(7),
      String(r.nov).padStart(7),
      String(r.dec).padStart(7),
      String(r.jan).padStart(7),
      String(r.feb).padStart(7),
      String(r.mar).padStart(7),
      r.cpcLow.padStart(14),
      r.cpcHigh.padStart(14),
      String(r.compIdx).padStart(12),
    ].join(' | '));
  });
  console.log('='.repeat(128));
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
