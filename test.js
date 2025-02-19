const {
  ermp3,
  ermp4,
  ai,
  samehadakuSearch,
  erai,
  tiktokDL,
  ttdl,
  igdl,
  khodam,
  playstore,
  yts
} = require('@er-npm/scraper');

async function testScraper() {
  const url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE';
  const tt = 'https://vt.tiktok.com/ZSMM112cS/';
  const ig =
    'https://www.instagram.com/reel/DEjX54Rv-PQ/?igsh=MXRjb2NhcTltYzJzaw==';
  let results = [];

  async function checkService(name, func, ...args) {
    try {
      const res = await func(...args);
      const status = res.status === true ? 'true ✅' : 'false ❌';
      results.push(`${name}: ${status}`);
    } catch (err) {
      results.push(`${name}: false ❌`);
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
  await checkService('aiGambar', ai.gambar, 'soto');
  await checkService('aiV2', ai.v2, 'hi');
  await checkService('aiV3', ai.v3, 'hai');

  console.log(results.join('\n'));
}

testScraper();
