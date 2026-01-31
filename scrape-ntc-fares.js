const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Function to scrape NTC bus fares
async function scrapeNTCFares() {
    try {
        console.log('Starting NTC fare scraping...');
        
        // Fetch the main NTC fares page
        const response = await axios.get('https://ntc.gov.lk/bus-fares');
        const $ = cheerio.load(response.data);
        
        // Find the latest fare revision link
        let fareUrl = null;
        $('a').each((index, element) => {
            const href = $(element).attr('href');
            const text = $(element).text().toLowerCase();
            
            if (href && (text.includes('fare') || text.includes('tariff') || text.includes('revision')) && !href.startsWith('#')) {
                if (!fareUrl) {
                    fareUrl = new URL(href, 'https://ntc.gov.lk').href;
                }
            }
        });
        
        if (!fareUrl) {
            console.log('Could not find fare revision link, trying alternative selectors...');
            // Alternative approach - look for common fare-related links
            fareUrl = 'https://ntc.gov.lk/bus-fares'; // fallback to main page
        }
        
        console.log('Fetching fare data from:', fareUrl);
        
        // Scrape the fare revision page
        const fareResponse = await axios.get(fareUrl);
        const fare$ = cheerio.load(fareResponse.data);
        
        // Extract fare data - this is a simplified version
        // In reality, we'd need to parse the specific table structure
        const fares = {};
        
        // Look for fare tables
        fare$('table').each((index, table) => {
            const rows = fare$(table).find('tr');
            
            rows.each((rowIndex, row) => {
                if (rowIndex === 0) return; // Skip header
                
                const cols = fare$(row).find('td');
                if (cols.length >= 3) {
                    const stage = fare$(cols[0]).text().trim();
                    const currentFare = parseFloat(fare$(cols[1]).text().replace(/[^0-9.]/g, '')) || 0;
                    
                    if (stage && currentFare > 0) {
                        fares[stage] = {
                            normal: currentFare,
                            semiLuxury: currentFare * 1.5,
                            ac: currentFare * 2.0,
                            expressway: currentFare * 2.5
                        };
                    }
                }
            });
        });
        
        // If no fares found in tables, try parsing structured text
        if (Object.keys(fares).length === 0) {
            console.log('No fares found in tables, trying text parsing...');
            
            // Parse any fare-like data in the page
            const textContent = fare$('body').text();
            const fareRegex = /([A-Za-z\s]+)\s+(\d+(?:\.\d+)?)/g;
            let match;
            
            while ((match = fareRegex.exec(textContent)) !== null) {
                const stage = match[1].trim();
                const baseFare = parseFloat(match[2]);
                
                if (baseFare && baseFare > 0) {
                    fares[stage] = {
                        normal: baseFare,
                        semiLuxury: baseFare * 1.5,
                        ac: baseFare * 2.0,
                        expressway: baseFare * 2.5
                    };
                }
            }
        }
        
        // Add Sri Lankan specific routes and fares as fallback
        if (Object.keys(fares).length === 0) {
            console.log('Using default Sri Lankan bus fares as fallback...');
            Object.assign(fares, getDefaultSriLankanFares());
        }
        
        // Save to local file as cache
        const fareData = {
            lastUpdated: new Date().toISOString(),
            fares: fares
        };
        
        fs.writeFileSync('./ntc-fares-cache.json', JSON.stringify(fareData, null, 2));
        console.log(`Scraped ${Object.keys(fares).length} fare entries from NTC`);
        
        return fareData;
    } catch (error) {
        console.error('Error scraping NTC fares:', error.message);
        
        // Try to load from cache if available
        try {
            const cachedData = JSON.parse(fs.readFileSync('./ntc-fares-cache.json', 'utf8'));
            console.log('Loaded fares from cache');
            return cachedData;
        } catch (cacheError) {
            console.log('No cache available, using default fares');
            return {
                lastUpdated: new Date().toISOString(),
                fares: getDefaultSriLankanFares()
            };
        }
    }
}

function getDefaultSriLankanFares() {
    // Default Sri Lankan bus fares based on typical values
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

module.exports = { scrapeNTCFares };

// Run scraper if called directly
if (require.main === module) {
    scrapeNTCFares().then(result => {
        console.log('Scraping completed. Last updated:', result.lastUpdated);
    });
}