const cheerio = require("cheerio");

const axios = require("axios");


const request = axios.default.create({
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "es-419,es;q=0.5",
    "Cache-Control": "max-age=0",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
  },
});

module.exports = async (query) => {
  if (!query || typeof query !== "string") {
    throw new Error("'query' is missing or not a string");
  }

  const codedQuery = encodeURIComponent(query);
  const searchUrl = `https://www.xnxx.com/search/${codedQuery}`;

  try {
    const { data } = await request.get(searchUrl);

    const $ = cheerio.load(data);
    const anchors = $(".thumb-inside .thumb").find("a");

    if (!anchors || !anchors.length) return;

    const index = Math.floor(Math.random() * anchors.length);
    const href = anchors.eq(index).attr("href");
    const url = `https://www.xnxx.com${href}`;

    const { data: content } = await request.get(url);

    const $$ = cheerio.load(content);
    const video = $$("#video-player-bg").find("script").text();

    const pattern = /html5player\.setVideoUrl(?:High|Low)\('([^']+)'\)/;
    const link = video.match(pattern)?.[1];

    return {
      judul: $$(".video-title strong").text(),
      link: url,
      link_dl: link,
      value: $$("#video-votes .rating-box.value").text(),
      views: $$(".metadata").text().split("-")[2]?.trim(),
      likes: $$("#video-votes .vote-action-good .value").text(),
      from: "@er-npm/scraper"
    };
  } catch (error) {
    throw error;
  }
};
