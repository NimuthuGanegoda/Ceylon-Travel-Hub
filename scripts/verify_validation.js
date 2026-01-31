// scripts/verify_validation.js
const http = require('http');

console.log("Running validation tests against localhost:3000...");

function runTests() {
    // Test case 1: Invalid Email
    const postData = JSON.stringify({
        name: "Test",
        email: "not-an-email",
        message: "Valid message content here."
    });

    const req = http.request({
        hostname: 'localhost',
        port: 3002,
        path: '/Ceylon-Travel-Hub/api/contact',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'X-Forwarded-For': '127.0.0.2'
        }
    }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log(`Response Status: ${res.statusCode}`);
            console.log(`Response Body: ${data}`);

            if (res.statusCode === 400 && data.includes('Validation Error')) {
                console.log("✅ Input validation verified successfully.");
                process.exit(0);
            } else {
                console.log("❌ Input validation verification failed.");
                process.exit(1);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        process.exit(1);
    });

    req.write(postData);
    req.end();
}

runTests();
