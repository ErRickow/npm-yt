const {
  ermp3, ermp4, ai, samehadakuSearch, erai, tiktokDL, igdl, khodam, playstore, yts
} = require('@er-npm/scraper');

async function testScraper() {
  const url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE';
  const tt = 'https://vt.tiktok.com/ZSMM112cS/';
  const ig = 'https://www.instagram.com/reel/DEjX54Rv-PQ/?igsh=MXRjb2NhcTltYzJzaw==';
  let results = [];

  try {
    await ermp3(url);
    results.push('✅ ermp3: Success');
  } catch (err) {
    results.push(`❌ ermp3: Failed - ${err.message}`);
  }

  try {
    await ermp4(url);
    results.push('✅ ermp4: Success');
  } catch (err) {
    results.push(`❌ ermp4: Failed - ${err.message}`);
  }

  try {
    await ai('Hello!');
    results.push('✅ ai: Success');
  } catch (err) {
    results.push(`❌ ai: Failed - ${err.message}`);
  }

  try {
    await erai('hai');
    results.push('✅ erai: Success');
  } catch (err) {
    results.push(`❌ erai: Failed - ${err.message}`);
  }

  try {
    await khodam('slamet');
    results.push('✅ khodam: Success');
  } catch (err) {
    results.push(`❌ khodam: Failed - ${err.message}`);
  }

  try {
    await tiktokDL(tt);
    results.push('✅ tiktokDL: Success');
  } catch (err) {
    results.push(`❌ tiktokDL: Failed - ${err.message}`);
  }

  try {
    await yts('skrillex');
    results.push('✅ yts: Success');
  } catch (err) {
    results.push(`❌ yts: Failed - ${err.message}`);
  }

  try {
    await igdl(ig);
    results.push('✅ igdl: Success');
  } catch (err) {
    results.push(`❌ igdl: Failed - ${err.message}`);
  }

  try {
    await samehadakuSearch('boruto');
    results.push('✅ samehadakuSearch: Success');
  } catch (err) {
    results.push(`❌ samehadakuSearch: Failed - ${err.message}`);
  }

  try {
    await playstore('ff');
    results.push('✅ playstore: Success');
  } catch (err) {
    results.push(`❌ playstore: Failed - ${err.message}`);
  }

  // Print hasil agar bisa ditangkap oleh GitHub Actions
  console.log(results.join('\n'));
}

// Menjalankan fungsi dan menangkap error fatal jika terjadi
testScraper().catch(err => {
  console.error('🚨 Fatal error:', err);
  process.exit(1);
});