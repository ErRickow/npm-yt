const dl = require('xnxx-dl');

async function bokep(judul) {
  if (!judul) {
    return {
      status: false,
      why: 'Masukkan judul'
    };
  }

  try {
    const what = await dl.download(judul);

    return {
      status: true,
      judul: what.title,
      dl_link: what.link_dl,
      rating: what.value,
      penonton: what.views,
      likes: what.likes,
      from: '@er-npm/scraper'
    };
  } catch (error) {
    return {
      status: false,
      why: 'Error njing.',
      terus_gmna: 'Visit: t.me/chakszzz'
    };
  }
}

module.exports = bokep;
