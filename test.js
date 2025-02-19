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
  const ig =
    'https://www.instagram.com/reel/DEjX54Rv-PQ/?igsh=MXRjb2NhcTltYzJzaw==';
  let results = [];

  try {
    const res = await ermp3(url);
    if (!res.status) throw new Error('ermp3 failed');
    results.push('ermp3: ✅');
  } catch (err) {
    results.push(`ermp3: ❌ (${err.message})`);
  }

  try {
    const res = await ermp4(url);
    if (!res.status) throw new Error('ermp4 failed');
    results.push('ermp4: ✅');
  } catch (err) {
    results.push(`ermp4: ❌ (${err.message})`);
  }

  try {
    const res = await ai('Hello!');
    if (!res.status) throw new Error('ai failed');
    results.push('ai: ✅');
  } catch (err) {
    results.push(`ai: ❌ (${err.message})`);
  }

  try {
    const res = await erai('hai');
    if (!res.status) throw new Error('erai failed');
    results.push('erai: ✅');
  } catch (err) {
    results.push(`erai: ❌ (${err.message})`);
  }

  try {
    const res = await khodam('slamet');
    if (!res.status) throw new Error('khodam failed');
    results.push('khodam: ✅');
  } catch (err) {
    results.push(`khodam: ❌ (${err.message})`);
  }

  try {
    const res = await tiktokDL(tt);
    if (!res.status) throw new Error('ttdl failed');
    results.push('ttdl: ✅');
  } catch (err) {
    results.push(`ttdl: ❌ (${err.message})`);
  }

  try {
    const res = await yts('skrillex');
    if (!res.status) throw new Error('yts failed');
    results.push('yts: ✅');
  } catch (err) {
    results.push(`yts: ❌ (${err.message})`);
  }

  try {
    const res = await igdl(ig);
    if (!res.status) throw new Error('igdl failed');
    results.push('igdl: ✅');
  } catch (err) {
    results.push(`igdl: ❌ (${err.message})`);
  }

  try {
    const res = await samehadakuSearch('boruto');
    if (!res.status) throw new Error('samehadakuSearch failed');
    results.push('samehadakuSearch: ✅');
  } catch (err) {
    results.push(`samehadakuSearch: ❌ (${err.message})`);
  }

  try {
    const res = await playstore('ff');
    if (!res.status) throw new Error('playstore failed');
    results.push('playstore: ✅');
  } catch (err) {
    results.push(`playstore: ❌ (${err.message})`);
  }

  console.log(results.join('\n'));
}

testScraper();