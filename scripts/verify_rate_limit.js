// scripts/verify_rate_limit.js
const http = require('http');

console.log("Running rate limit tests against localhost:3000...");

function runTests() {
    const totalRequests = 25;
    let completed = 0;
    let statusCodes = [];

    for (let i = 0; i < totalRequests; i++) {
        // Stagger requests slightly
        setTimeout(() => {
            const req = http.request({
                hostname: 'localhost',
                port: 3002,
                path: '/Ceylon-Travel-Hub/api/contact',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Forwarded-For': '127.0.0.1'
                }
            }, (res) => {
                statusCodes.push(res.statusCode);
                completed++;
                if (completed === totalRequests) {
                    analyzeResults(statusCodes);
                }
            });

            req.on('error', (e) => {
                console.error(`Problem with request: ${e.message}`);
                completed++;
                if (completed === totalRequests) {
                    analyzeResults(statusCodes);
                }
            });

            req.write(JSON.stringify({
                name: "Test User",
                email: "test@example.com",
                message: "This is a test message to verify rate limiting."
            }));
            req.end();
        }, i * 50);
    }
}

function analyzeResults(codes) {
    const successCount = codes.filter(c => c === 200).length;
    const rateLimitedCount = codes.filter(c => c === 429).length;

    console.log(`Results:`);
    console.log(`Total requests: ${codes.length}`);
    console.log(`Success (200): ${successCount}`);
    console.log(`Rate Limited (429): ${rateLimitedCount}`);

    if (rateLimitedCount > 0 && successCount <= 20) {
        console.log("✅ Rate limiting verified successfully.");
        process.exit(0);
    } else {
        console.log("❌ Rate limiting verification failed.");
        console.log("Codes:", codes);
        process.exit(1);
    }
}

runTests();
