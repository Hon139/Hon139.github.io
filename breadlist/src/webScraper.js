const { MongoClient } = require('mongodb');
const playwright = require('playwright');

async function main() {
    const browser = await playwright.chromium.launch({
        headless: true 
    });

    const page = await browser.newPage();
    await page.goto('https://www.scholarshipscanada.com/Scholarships/FeaturedScholarships.aspx');
    await page.waitForTimeout(5000);

    const scholarshipValues = await page.$$eval('span[id^="ctl00_ContentPlaceHolder1_ScholarshipDataControl_grvScholarshipSearch_ctl"][id$="_lblScholarshipValueDisplay"]', els => 
        els.map(el => el.textContent.trim())
    );
    
    const scholarshipNames = await page.$$eval('a[id^="ctl00_ContentPlaceHolder1_ScholarshipDataControl_grvScholarshipSearch_ctl"][class*="bold"]', 
        els => els.map(el => el.textContent.trim())
    );

    console.log("Scholarship Values:", scholarshipValues);
    console.log("Scholarship Titles:", scholarshipNames);

    await browser.close();

    for (let i = 0; i < scholarshipValues.length; i++) {
        await createListing(client, {
            monetaryAmount: scholarshipValues[i],
            sponsorName: "N/A",
            minAge: 12,
            maxAge: 20,
            targetEthnicity: ["North American"],
            targetGender: ["Gender neutral"],
            title: scholarshipNames[i],
            content: "N/A"
        });
    }
    
}

main().catch(console.error);

// creates a new listing
async function createListing(client, newListing){
    const result = await client.db("breadBankData").collection("scholarshipData").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
