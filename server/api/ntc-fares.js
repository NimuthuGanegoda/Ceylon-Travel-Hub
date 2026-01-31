// This is a mock API endpoint that would integrate with our scraping service
// In a real implementation, this would be part of a backend framework like Express

const { scrapeNTCFares } = require('../../scrape-ntc-fares');

let cachedFares = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes cache

// Function to get NTC fares with caching
async function getNTCFares() {
  const now = Date.now();
  
  // Check if we have cached data and it's still valid
  if (cachedFares && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('Returning cached fares data');
    return cachedFares;
  }
  
  console.log('Fetching fresh fares data from NTC...');
  
  try {
    // Fetch fresh data from our scraping service
    const freshData = await scrapeNTCFares();
    cachedFares = freshData;
    lastFetchTime = now;
    
    return freshData;
  } catch (error) {
    console.error('Error fetching NTC fares:', error);
    
    // Return cached data if available, otherwise return default
    if (cachedFares) {
      return cachedFares;
    }
    
    return {
      lastUpdated: new Date().toISOString(),
      fares: getDefaultSriLankanFares()
    };
  }
}

function getDefaultSriLankanFares() {
  return {
    'Colombo - Kandy': {
      normal: 100,
      semiLuxury: 150,
      ac: 200,
      expressway: 250
    },
    'Colombo - Galle': {
      normal: 120,
      semiLuxury: 180,
      ac: 240,
      expressway: 300
    },
    'Colombo - Jaffna': {
      normal: 500,
      semiLuxury: 750,
      ac: 1000,
      expressway: 1250
    },
    'Kandy - Galle': {
      normal: 200,
      semiLuxury: 300,
      ac: 400,
      expressway: 500
    },
    'Colombo - Negombo': {
      normal: 80,
      semiLuxury: 120,
      ac: 160,
      expressway: 200
    },
    'Colombo - Kurunegala': {
      normal: 150,
      semiLuxury: 225,
      ac: 300,
      expressway: 375
    },
    'Colombo - Anuradhapura': {
      normal: 350,
      semiLuxury: 525,
      ac: 700,
      expressway: 875
    },
    'Colombo - Trincomalee': {
      normal: 450,
      semiLuxury: 675,
      ac: 900,
      expressway: 1125
    },
    'Colombo - Batticaloa': {
      normal: 550,
      semiLuxury: 825,
      ac: 1100,
      expressway: 1375
    },
    'Galle - Matara': {
      normal: 60,
      semiLuxury: 90,
      ac: 120,
      expressway: 150
    }
  };
}

// Express.js compatible route handler
async function handleNTCFaresRequest(req, res) {
  try {
    const faresData = await getNTCFares();
    res.json(faresData);
  } catch (error) {
    console.error('Error in NTC fares API:', error);
    res.status(500).json({
      error: 'Failed to fetch fare data',
      lastUpdated: new Date().toISOString(),
      fares: getDefaultSriLankanFares()
    });
  }
}

module.exports = { 
  getNTCFares, 
  handleNTCFaresRequest 
};