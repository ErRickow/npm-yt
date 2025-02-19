const { ermp3, ermp4, ai } = require('@er-npm/scraper');

async function testScraper() {
  const url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE';
  let results = [];

  try {
    await ermp3(url);
    results.push("ermp3: ✅");
  } catch (err) {
    results.push(`ermp3 Error: ${err.message}`);
  }

  try {
    await ermp4(url);
    results.push("ermp4: ✅");
  } catch (err) {
    results.push(`ermp4 Error: ${err.message}`);
  }

  try {
    await ai("Hello!");
    results.push("ai: ✅");
  } catch (err) {
    results.push(`ai Error: ${err.message}`);
  }

  console.log(results.join("\n"));
}

testScraper();