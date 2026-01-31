const fs = require('fs');
const path = require('path');

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';
const OUTPUT_FILE = path.join(__dirname, '../src/data/busStops.json');

const query = `
[out:json][timeout:90];
area["name:en"="Sri Lanka"]->.searchArea;
(
  node["highway"="bus_stop"](area.searchArea);
  node["public_transport"="platform"](area.searchArea);
);
out body;
`;

const main = async () => {
  try {
    console.log('Fetching bus stops from Overpass API...');
    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`Overpass API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.elements.length} elements.`);

    // Extract relevant data
    const busStops = data.elements.map(el => ({
      id: el.id,
      lat: el.lat,
      lon: el.lon,
      name: el.tags.name || el.tags['name:en'] || el.tags['name:si'] || el.tags['name:ta'] || 'Unknown Bus Stop',
      tags: el.tags
    }));

    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(busStops, null, 2));
    console.log(`Saved ${busStops.length} bus stops to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('Error fetching bus stops:', error);
    process.exit(1);
  }
};

main();
