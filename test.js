const {
  ermp3,
  ermp4,
  ai,
  samehadakuSearch,
  erai,
  tiktokDL,
  igdl,
  khodam,
  playstore,
  yts
} = require('@er-npm/scraper');

async function testScraper() {
  const url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE';
  const tt = 'https://vt.tiktok.com/ZSMM112cS/';
  const ig = 'https://www.instagram.com/reel/DEjX54Rv-PQ/?igsh=MXRjb2NhcTltYzJzaw==';
  let results = [];

  async function checkService(name, func, ...args) {
    try {
      const startTime = Date.now(); // Waktu mulai
      const res = await func(...args);
      const duration = Date.now() - startTime; // Hitung durasi

      const status = res.status === true ? 'true ✅' : 'false ❌';
      results.push(`${name}: ${status} (${duration}ms)`);
    } catch (err) {
      results.push(`${name}: false ❌ (Error: ${err.message})`);
    }
  }

  await checkService('ermp3', ermp3, url);
  await checkService('ermp4', ermp4, url);
  await checkService('ai', ai, 'Hello!');
  await checkService('erai', erai, 'hai');
  await checkService('khodam', khodam, 'slamet');
  await checkService('ttdl', tiktokDL, tt);
  await checkService('yts', yts, 'skrillex');
  await checkService('igdl', igdl, ig);
  await checkService('samehadakuSearch', samehadakuSearch, 'boruto');
  await checkService('playstore', playstore, 'ff');

  // Cek apakah objek `ai` memiliki properti yang dipanggil
  if (ai?.gambar) await checkService('aiGambar', ai.gambar, 'soto');
  if (ai?.v2) await checkService('aiV2', ai.v2, 'hi');
  if (ai?.v3) await checkService('aiV3', ai.v3, 'hai');

  console.log(results.join('\n'));
}

testScraper();