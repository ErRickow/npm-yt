// ROOT URLs
const ROOT_URL = 'https://www.xnxx.com/';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  DNT: '1', // Do Not Track request header
  Connection: 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-User': '?1',
  'Sec-Fetch-Dest': 'document',
  Host: 'www.xnxx.com',
  Referer: 'https://www.xnxx.com'
};

// REGEX
const REGEX_VIDEO_CHECK = /xnxx.com\/(.*?)/;
const REGEX_VIDEO_TITLE = /html5player\.setVideoTitle'([^']*)';/;
const REGEX_VIDEO_UPLOADER = /html5player\.setUploaderName'([^']*)';/;
const REGEX_VIDEO_LIKES =
  /<span class="icon thumb-up"><\/span><span class="value">(.*?)<\/span>/s;
const REGEX_VIDEO_DISLIKES =
  /<span class="icon thumb-down"><\/span><span class="value">(.*?)<\/span>/s;
const REGEX_VIDEO_COMMENT_COUNT =
  /<span class="icon comments"><\/span><span class="value">(.*?)<\/span>/;
const REGEX_VIDEO_PORNSTARS = /<a class="is-pornstar" href="\/search\/(.*?)">/;
const REGEX_VIDEO_KEYWORDS = /<a class="is-keyword" href="\/search\/(.*?)">/;
const REGEX_VIDEO_M3U8 = /html5player\.setVideoHLS'([^']+)';/;

const REGEX_SCRAPE_VIDEOS = /<div class="thumb"><a href="\/video-(.*?)"/;

const REGEX_SEARCH_TOTAL_PAGES = /class="last-page">(.*?)<\/a>/;
const REGEX_MODEL_TOTAL_PAGES = /<a class="last-page" data-page="(.*?)">/;
const REGEX_MODEL_TOTAL_VIDEO_VIEWS =
  /<span class="icon-f icf-eye"><\/span> (.*?) video views/;
