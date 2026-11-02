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

  // Target ONLY Djerba + Zarzis
  const targetLocations = [
    { name: 'Houmt Souk (City)', id: 'geoTargetConstants/9076119' },
    { name: 'Djerba - Houmt Souk (District)', id: 'geoTargetConstants/9261985' },
    { name: 'Djerba Midoun (District)', id: 'geoTargetConstants/9209691' },
    { name: 'Djerba - Ajim (District)', id: 'geoTargetConstants/9263251' },
    { name: 'Zarzis (District)', id: 'geoTargetConstants/9232848' },
  ];

  const geoTargetConstants = targetLocations.map(l => l.id);

  console.log('\n[2] Geographic Targeting: Djerba AND Zarzis ONLY:');
  targetLocations.forEach(loc => console.log(`   - ${loc.name}: ${loc.id}`));
  console.log('   - Excluded: Tunisia National (geoTargetConstants/2788)');
  console.log('   - Excluded: Medenine Governorate (geoTargetConstants/9075937)');

  const seedKeywords = [
    'debouchage canalisation',
    'debouchage toilette',
    'plombier djerba',
    'تسريح قنوات',
    'بالوعة مسدودة',
  ];

  console.log('\n[3] Calling Google Ads API v26 generateKeywordIdeas...');
  const kwUrl = `https://googleads.googleapis.com/v26/customers/${customerId}:generateKeywordIdeas`;

  // First try without language specified to allow both French and Arabic seeds
  let response = await fetch(kwUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': developerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      geoTargetConstants: geoTargetConstants,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: {
        keywords: seedKeywords,
      },
    }),
  });

  let data = await response.json();
  
  if (!response.ok) {
    console.log('Query without language failed:', data?.error?.message || data);
    console.log('Retrying with language: French (1002)...');
    response = await fetch(kwUrl, {
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
    data = await response.json();
  }

  if (!response.ok) {
    console.error('API Error:', JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log(`[4] Received response. Total keyword ideas: ${data.results?.length || 0}`);
  fs.writeFileSync('scripts/debouchage-djerba-zarzis-results.json', JSON.stringify(data, null, 2), 'utf8');

  // Also let's check Arabic seeds specifically if language was required or if we need separate calls
  // Let's test Arabic call as well to compare
  const arResponse = await fetch(kwUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': developerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'languageConstants/1019', // Arabic
      geoTargetConstants: geoTargetConstants,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: {
        keywords: seedKeywords,
      },
    }),
  });
  const arData = await arResponse.json();
  if (arResponse.ok) {
    console.log(`[4b] Received Arabic response. Total keyword ideas: ${arData.results?.length || 0}`);
    fs.writeFileSync('scripts/debouchage-arabic-results.json', JSON.stringify(arData, null, 2), 'utf8');
  }

  function normalize(str) {
    return str.toLowerCase().replace(/['’]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const winterMonths = ['OCTOBER', 'NOVEMBER', 'DECEMBER', 'JANUARY', 'FEBRUARY', 'MARCH'];
  const allResults = [...(data.results || []), ...(arData.results || [])];

  console.log('\n--- EXTRACTING METRICS FOR SEED KEYWORDS ---');
  const rows = [];

  for (const seed of seedKeywords) {
    const normSeed = normalize(seed);
    const match = allResults.find(r => normalize(r.text) === normSeed);
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
      seed,
      matched: !!match,
      avgSearches: metrics?.avgMonthlySearches ?? '0',
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
      monthlyList: monthlyList
    });
  }

  console.log(JSON.stringify(rows, null, 2));
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

