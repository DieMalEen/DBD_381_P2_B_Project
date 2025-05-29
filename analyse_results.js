const fs = require('fs');

function parseArtilleryResults(file) {
  const data = JSON.parse(fs.readFileSync(file));

  const counters = data.aggregate.counters || {};
  const summaries = data.aggregate.summaries || {};

  const results = [];

  const totalRequests = counters['http.requests'] || 0;
  const totalSuccess = counters['http.codes.200'] || 0;
  const totalFailures = counters['vusers.failed'] || 0;

  const latencyStats = summaries['http.response_time'] || {};

  results.push({
    Scenario: 'Overall',
    Requests: totalRequests,
    Success: totalSuccess,
    Failed: totalFailures,
    'Avg Latency (ms)': latencyStats.mean?.toFixed(2) || 'N/A',
    'Min Latency (ms)': latencyStats.min || 'N/A',
    'Max Latency (ms)': latencyStats.max || 'N/A',
    'P95 Latency (ms)': latencyStats.p95 || 'N/A'
  });

  // Optionally break down by endpoint
  const endpointLatencies = Object.entries(summaries)
    .filter(([key]) => key.startsWith('plugins.metrics-by-endpoint.response_time'))
    .map(([key, stats]) => {
      const endpoint = key.replace('plugins.metrics-by-endpoint.response_time.', '');
      return {
        Scenario: endpoint,
        Requests: counters[`plugins.metrics-by-endpoint.${endpoint}.codes.200`] || 0,
        Success: counters[`plugins.metrics-by-endpoint.${endpoint}.codes.200`] || 0,
        Failed: 0, // Artillery doesn’t expose this per-endpoint without customization
        'Avg Latency (ms)': stats.mean?.toFixed(2) || 'N/A',
        'Min Latency (ms)': stats.min || 'N/A',
        'Max Latency (ms)': stats.max || 'N/A',
        'P95 Latency (ms)': stats.p95 || 'N/A'
      };
    });

  console.table(results.concat(endpointLatencies));
}

parseArtilleryResults('results.json');