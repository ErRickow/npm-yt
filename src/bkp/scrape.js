const cheerio = require("cheerio");
const axios = require("axios");

const axiosInstance = axios.create({
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "es-419,es;q=0.5",
    "Cache-Control": "max-age=0",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
  },
});

async function bkp(query) {
  // Validate input
  if (!query || typeof query !== "string") {
    throw new Error("Invalid input: 'query' should be a non-empty string");
  }

  const codedQuery = encodeURIComponent(query);
  const searchUrl = `https://www.xnxx.com/search/${codedQuery}`;

  try {
    // Fetch the search results page
    const { data } = await axiosInstance.get(searchUrl);
    const $ = cheerio.load(data);

    // Extract video links from the page
    const anchors = $(".thumb-inside .thumb a");
    if (!anchors || anchors.length === 0) {
      throw new Error("No videos found for the given query");
    }

    // Randomly pick a video
    const index = Math.floor(Math.random() * anchors.length);
    const href = anchors.eq(index).attr("href");
    if (!href) {
      throw new Error("Failed to extract video URL");
    }

    // Fetch the selected video's page
    const videoUrl = `https://www.xnxx.com${href}`;
    const { data: videoPageData } = await axiosInstance.get(videoUrl);

    const $$ = cheerio.load(videoPageData);
    const videoScript = $$("script").filter((i, el) => {
      return $$ (el).text().includes('html5player.setVideoUrl');
    }).text();

    const videoUrlMatch = videoScript.match(/html5player\.setVideoUrl(?:High|Low)'([^']+)'/);
    const videoLink = videoUrlMatch ? videoUrlMatch[1] : null;

    if (!videoLink) {
      throw new Error("Failed to extract video download link");
    }

    return {
      link: videoUrl,
      link_dl: videoLink,
      title: $$("h1.video-title").text().trim(),
      value: $$("div.rating-box.value").text().trim(),
      views: $$("div.metadata").text().split("-")[2]?.trim(),
      likes: $$("div.vote-action-good .value").text().trim(),
      from: '@er-npm/scraper',
    };
  } catch (error) {
    console.error(`Error fetching video data: ${error.message}`);
    throw new Error("An error occurred while fetching video data. Please try again later.");
  }
}

module.exports = bkp;