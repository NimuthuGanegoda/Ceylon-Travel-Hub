const fs = require('fs');
const https = require('https');
const path = require('path');
const pdf = require('pdf-parse');

const PDF_URL = 'https://www.ntc.gov.lk/bus_fare/2025/july/Normal%20Section%20350%20(Eng).pdf';
const OUTPUT_FILE = path.join(__dirname, '../src/data/busFares.json');

// Ensure data directory exists
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Fallback data
const fallbackData = {
  lastUpdated: new Date().toISOString(),
  source: 'Fallback Data (NTC Site Unreachable/Parse Failed)',
  normal: [
    { stage: 1, fare: 30 },
    { stage: 2, fare: 45 },
    { stage: 3, fare: 58 },
    { stage: 4, fare: 72 },
    { stage: 5, fare: 86 },
    { stage: 6, fare: 102 },
    { stage: 7, fare: 118 },
    { stage: 8, fare: 132 },
    { stage: 9, fare: 147 },
    { stage: 10, fare: 163 },
    { stage: 11, fare: 178 },
    { stage: 12, fare: 193 },
    { stage: 13, fare: 208 },
    { stage: 14, fare: 224 },
    { stage: 15, fare: 239 },
    { stage: 20, fare: 315 },
    { stage: 30, fare: 468 },
    { stage: 50, fare: 775 },
    { stage: 100, fare: 1530 }
  ],
  expressway: {
    'Makumbura-Galle': 1100,
    'Makumbura-Matara': 1300,
    'Kadawatha-Galle': 1200,
    'Kadawatha-Matara': 1400,
    'Colombo-Kandy': 1000 // Hypothetical
  }
};

const downloadPDF = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download PDF. Status Code: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const parsePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  try {
    const data = await pdf(dataBuffer);
    const text = data.text;

    // Simple parsing logic (This is highly dependent on PDF layout)
    // We look for patterns like "Stage Fare" lines.
    // For now, let's assume the fallback is better unless we see clear structure.
    // Real parsing would require inspecting 'text' content structure.

    console.log("PDF parsed successfully. Text length:", text.length);
    console.log("First 1000 chars:", text.substring(0, 1000));

    // Extracting fares might need regex.
    // The text output shows patterns like:
    // "1"
    // "27.0027.00" (Old Fare + New Fare concatenated)

    const lines = text.split('\n');
    const stages = [];

    // Regex to match the concatenated prices line: e.g., "27.0027.00" or "318.00317.00"
    const priceRegex = /^\s*(\d+\.\d{2})(\d+\.\d{2})\s*$/;
    // Regex to match just a number (Stage)
    const stageRegex = /^\s*(\d+)\s*$/;

    let lastStage = null;

    for (const line of lines) {
       const stageMatch = line.match(stageRegex);
       const priceMatch = line.match(priceRegex);

       if (stageMatch) {
           lastStage = parseInt(stageMatch[1]);
       } else if (priceMatch && lastStage !== null) {
           const oldFare = parseFloat(priceMatch[1]);
           const newFare = parseFloat(priceMatch[2]);

           // Basic validation: stage > 0, fare > 0
           if (lastStage > 0 && newFare > 0) {
               stages.push({ stage: lastStage, fare: newFare });
               lastStage = null; // Reset
           }
       }
    }

    if (stages.length > 5) {
        return {
            lastUpdated: new Date().toISOString(),
            source: 'Scraped from NTC PDF',
            normal: stages.sort((a, b) => a.stage - b.stage),
            expressway: fallbackData.expressway // Keep hardcoded expressway rates
        };
    } else {
        throw new Error("Could not extract enough stages from PDF text.");
    }

  } catch (error) {
    console.error("Error parsing PDF:", error.message);
    throw error;
  }
};

const main = async () => {
  const tempPdfPath = path.join(__dirname, 'temp_fares.pdf');

  try {
    console.log(`Downloading PDF from ${PDF_URL}...`);
    await downloadPDF(PDF_URL, tempPdfPath);
    console.log("Download complete.");

    console.log("Parsing PDF...");
    const parsedData = await parsePDF(tempPdfPath);
    console.log(`Extracted ${parsedData.normal.length} fare stages.`);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(parsedData, null, 2));
    console.log(`Successfully saved data to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error("Scraping failed, using fallback data:", error.message);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fallbackData, null, 2));
    console.log(`Saved fallback data to ${OUTPUT_FILE}`);
  } finally {
    if (fs.existsSync(tempPdfPath)) {
      fs.unlinkSync(tempPdfPath);
    }
  }
};

main();
