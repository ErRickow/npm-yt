// Importing necessary modules
import * as consts from './modules/consts';
import * as errors from './modules/errors';
import * as searchFilters from './modules/sFilters';

import axios from 'axios';
import { JSDOM } from 'jsdom';

const baseQualities = [
  '250p',
  '360p',
  '480p',
  '720p',
  '1080p',
  '1440p',
  '2160p',
];

// Video class
class Video {
  constructor(url) {
    this.url = url;
    this.availableM3u8Urls = null;
    this.availableQualities = null;
    this.scriptContent = null;
    this.htmlContent = null;
    this.metadataMatches = null;
    this.jsonContent = null;

    if (!consts.REGEX_VIDEO_CHECK.test(this.url)) {
      throw new errors.InvalidUrl('The video URL is invalid!');
    } else {
      this.getBaseHtml();
      this.getScriptContent();
      this.getMetadataMatches();
      this.extractJsonFromHtml();
    }
  }

  async getBaseHtml() {
    const response = await axios.get(this.url);
    this.htmlContent = response.data;
  }

  static isDesiredScript(tag) {
    if (tag.nodeName !== 'SCRIPT') return false;
    const scriptContents = ['html5player', 'setVideoTitle', 'setVideoUrlLow'];
    return scriptContents.every(content => tag.textContent.includes(content));
  }

  getMetadataMatches() {
    const dom = new JSDOM(this.htmlContent);
    const metadataSpan = dom.window.document.querySelector('span.metadata');
    const metadataText = metadataSpan ? metadataSpan.textContent.trim() : '';
    this.metadataMatches = metadataText.match(
      /(\d+min|\d+p|\d[\d.,]*\s*[views]*)/g,
    );
  }

  getScriptContent() {
    const dom = new JSDOM(this.htmlContent);
    const scriptTags = Array.from(
      dom.window.document.querySelectorAll('script'),
    );
    const targetScript = scriptTags.find(Video.isDesiredScript);

    if (targetScript) {
      this.scriptContent = targetScript.textContent;
    } else {
      throw new errors.InvalidResponse("Couldn't extract JSON from HTML");
    }
  }

  extractJsonFromHtml() {
    const dom = new JSDOM(this.htmlContent);
    const scriptTag = dom.window.document.querySelector(
      'script[type="application/ld+json"]',
    );

    if (scriptTag) {
      const jsonText = scriptTag.textContent.trim();
      this.jsonContent = JSON.parse(jsonText);
    }
  }

  get m3u8BaseUrl() {
    const match = consts.REGEX_VIDEO_M3U8.exec(this.scriptContent);
    return match ? match[1] : null;
  }

  getSegments(quality) {
    const fixedQuality = Core.fixQuality(quality);
    return Core.getSegments(fixedQuality, this.m3u8BaseUrl, baseQualities, '-');
  }

  download(quality, path, downloader, callback = Core.textProgressBar) {
    Core.download(this, quality, path, callback, downloader);
  }

  get title() {
    const match = consts.REGEX_VIDEO_TITLE.exec(this.scriptContent);
    return match ? decodeURIComponent(match[1]) : '';
  }

  get author() {
    const match = consts.REGEX_VIDEO_UPLOADER.exec(this.scriptContent);
    return match ? match[1] : '';
  }

  get length() {
    const length = this.metadataMatches
      ? this.metadataMatches[0].replace('min', '').trim()
      : '';
    return length;
  }

  get highestQuality() {
    return this.metadataMatches ? this.metadataMatches[1] : '';
  }

  get views() {
    return this.metadataMatches ? this.metadataMatches[2] : '';
  }

  get commentCount() {
    const match = consts.REGEX_VIDEO_COMMENT_COUNT.exec(this.htmlContent);
    return match ? match[1] : '';
  }

  get likes() {
    const match = consts.REGEX_VIDEO_LIKES.exec(this.htmlContent);
    return match ? match[1] : '';
  }

  get dislikes() {
    const match = consts.REGEX_VIDEO_DISLIKES.exec(this.htmlContent);
    return match ? match[1] : '';
  }

  get pornstars() {
    const match = consts.REGEX_VIDEO_PORNSTARS.exec(this.htmlContent);
    return match ? match[1] : '';
  }

  get tags() {
    const match = consts.REGEX_VIDEO_KEYWORDS.exec(this.htmlContent);
    return match ? match[1] : '';
  }

  get description() {
    return decodeURIComponent(this.jsonContent.description);
  }

  get thumbnailUrl() {
    return this.jsonContent.thumbnailUrl;
  }

  get publishDate() {
    return this.jsonContent.uploadDate;
  }

  get contentUrl() {
    return this.jsonContent.contentUrl;
  }
}

// Search class
class Search {
  constructor(query, uploadTime, length, searchingQuality, limit = 5) {
    this.query = this.validateQuery(query);
    this.uploadTime = uploadTime;
    this.length = length;
    this.searchingQuality = searchingQuality;
    this.limit = limit;
  }

  static validateQuery(query) {
    return query.replace(' ', '+');
  }

  async getHtmlContent() {
    const url = `https://www.xnxx.com/search${this.uploadTime}${this.length}${this.searchingQuality}/${this.query}`;
    const response = await axios.get(url, { headers: consts.HEADERS });
    return response.data;
  }

  async getTotalPages() {
    const htmlContent = await this.getHtmlContent();
    const match = consts.REGEX_SEARCH_TOTAL_PAGES.exec(htmlContent);
    return match ? match[1] : 0;
  }

  async getVideos() {
    let page = this.limit;
    const url =
      page === 0
        ? `https://www.xnxx.com/search${this.uploadTime}${this.length}${this.searchingQuality}/${this.query}`
        : `https://www.xnxx.com/search${this.uploadTime}${this.length}${this.searchingQuality}/${this.query}/${page}`;
    const response = await axios.get(url, { headers: consts.HEADERS });
    const urls = consts.REGEX_SCRAPE_VIDEOS.exec(response.data);

    return urls.map(url_ => new Video(`https://www.xnxx.com/video-${url_}`));
  }
}

// User class
class User {
  constructor(url, limit = 5) {
    this.url = url;
    this.limit = limit;
  }

  async getBaseJson() {
    const url = `${this.url}/videos/best/0?from=goldtab`;
    const response = await axios.get(url, { headers: consts.HEADERS });
    return JSON.parse(response.data);
  }

  async getVideos() {
    const url = `${this.url}/videos/best/${this.limit}?from=goldtab`;
    const response = await axios.get(url, { headers: consts.HEADERS });
    return response.data.videos.map(
      video => new Video(`https://www.xnxx.com${video.u}`),
    );
  }

  async getTotalVideos() {
    const baseJson = await this.getBaseJson();
    return baseJson.nb_videos;
  }

  async getTotalVideoViews() {
    const content = await this.getContent();
    const match = consts.REGEX_MODEL_TOTAL_VIDEO_VIEWS.exec(content);
    return match ? match[1] : '';
  }
}

// Client class
class Client {
  static getVideo(url) {
    return new Video(url);
  }

  static search(
    query,
    uploadTime = '',
    length = '',
    searchingQuality = '',
    limit = 5,
  ) {
    return new Search(query, uploadTime, length, searchingQuality, limit);
  }

  static getUser(url, limit = 5) {
    return new User(url, limit);
  }
}

// Main function for CLI
async function main() {
  const args = require('minimist')(process.argv.slice(2));

  if (args.download) {
    const client = new Client();
    const video = client.getVideo(args.download);
    const path = Core.returnPath(args, video);
    video.download(args.quality, path, args.downloader);
  }

  if (args.file) {
    const videos = [];
    const client = new Client();

    const fs = require('fs');
    const content = fs.readFileSync(args.file, 'utf-8').split('\n');

    for (const url of content) {
      videos.push(client.getVideo(url));
    }

    for (const video of videos) {
      const path = Core.returnPath(args, video);
      video.download(args.quality, path, args.downloader);
    }
  }
}

main().catch(error => console.error(error));

module.exports = {
  Search,
  Video,
  User,
  Client
}