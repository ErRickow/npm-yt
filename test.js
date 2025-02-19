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

  const testCases = [
    { name: 'ermp3', func: () => ermp3(url) },
    { name: 'ermp4', func: () => ermp4(url) },
    { name: 'ai', func: () => ai('Hello!') },
    { name: 'erai', func: () => erai('hai') },
    { name: 'khodam', func: () => khodam('slamet') },
    { name: 'ttdl', func: () => tiktokDL(tt) },
    { name: 'yts', func: () => yts('skrillex') },
    { name: 'igdl', func: () => igdl(ig) },
    { name: 'samehadakuSearch', func: () => samehadakuSearch('boruto') },
    { name: 'playstore', func: () => playstore('ff') }
  ];

  for (let test of testCases) {
    try {
      const res = await test.func();
      if (!res.status) throw new Error(`${test.name} failed`);
      results.push(`${test.name}: ✅`);
    } catch (err) {
      results.push(`${test.name}: ❌ (${err.message})`);
    }
  }

  console.log(results.join('\n'));
}

testScraper().catch(err => {
  console.error('Fatal error:', err);
});