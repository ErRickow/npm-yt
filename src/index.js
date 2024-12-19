const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const { Innertube, UniversalCache } = require("youtubei.js");

const ytdlpPath = path.join(__dirname, "../bin/yt-dlp");
const cookiesPath = path.join(__dirname, "../bin/cookies.txt");
const cookiesPath2 = path.join(__dirname, "../bin/cookies.json");
const cookiesJson = JSON.parse(fs.readFileSync(cookiesPath2, 'utf-8'));
const tempPath = path.join(__dirname, "../temp");

const formattedCookies = cookiesJson.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

function generateRandomName(extension) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `${timestamp}_${random}.${extension}`;
}

function getYouTubeID(input) {
  if (!input) return null;
  try {
    const url = new URL(input)
    const validDomains = [
      'youtube.com',
      'www.youtube.com',
      'm.youtube.com',
      'youtu.be',
      'youtube.co'
    ];
    if (!validDomains.some(domain => url.hostname.endsWith(domain))) {
      return input;
    }
    if (url.hostname === 'youtu.be') {
      return url.pathname.substring(1);
    }
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/shorts/')) {
        return url.pathname.split('/')[2];
      } else if (url.searchParams.has('v')) {
        return url.searchParams.get('v');
      } else if (url.pathname === '/watch') {
        return null;
      } else if (url.pathname.startsWith('/channel/')) {
        return null;
      } else if (url.pathname.startsWith('/user/')) {
        return null;
      } else if (url.pathname.startsWith('/playlist') && url.searchParams.has('list')) {
        return url.searchParams.get('list');
      }
    }
  } catch {
    return input;
  }
  return input;
}

async function ensureExecutable(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.X_OK, (err) => {
      if (err) {
        execFile("chmod", ["+x", filePath], (chmodErr) => {
          if (chmodErr) reject(`Erro ao corrigir permissões: ${chmodErr.message}`);
          else resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

async function processOutput(args, tempFile) {
  await ensureExecutable(ytdlpPath);

  return new Promise((resolve, reject) => {
    execFile(ytdlpPath, args, (err, stdout, stderr) => {
      if (err) reject(`yt-dlp error: ${stderr || err.message}`);
      else {
        fs.readFile(tempFile, (readErr, buffer) => {
          if (readErr) reject(`Error reading file: ${readErr.message}`);
          else {
            fs.unlink(tempFile, () => {});
            resolve(buffer);
          }
        });
      }
    });
  });
}

function getVideoUrl(input) {
  const id = getYouTubeID(input);
  return `https://www.youtube.com/watch?v=${id}`;
}

async function ytmp3(input) {
  const url = getVideoUrl(input);
  const output = path.join(tempPath, generateRandomName("mp3"));
  const args = [
    "-f",
    "bestaudio[ext=mp3]/mp3",
    "--cookies",
    cookiesPath,
    "-o",
    output,
    url,
  ];
  return await processOutput(args, output);
}

async function ytmp4(input) {
  const url = getVideoUrl(input);
  const output = path.join(tempPath, generateRandomName("mp4"));
  const args = [
    "-f",
    "bestvideo+bestaudio[ext=mp4]/mp4",
    "--cookies",
    cookiesPath,
    "-o",
    output,
    url,
  ];
  return await processOutput(args, output);
}

/*
async function alldl(input) {
  const url = input.startsWith("http") ? input : getVideoUrl(input);
  const results = [];
  const tempFiles = [
    { type: "video", ext: "mp4", format: "bestvideo+bestaudio[ext=mp4]/mp4" },
    { type: "image", ext: "jpg", format: "best[ext=jpg]" },
  ];

  for (const { type, ext, format } of tempFiles) {
    const output = path.join(tempPath, generateRandomName(ext));
    const args = ["-f", format, "--cookies", cookiesPath, "-o", output, url];

    try {
      const buffer = await processOutput(args, output);
      results.push({ type, src: buffer });
    } catch (error) {
      console.error(`Erro ao baixar ${type}: ${error.message}`);
    }
  }

  return results;
}*/

async function alldl(input) {
  const url = input.startsWith("http") ? input : getVideoUrl(input);
  const results = [];
  const outputTemplate = path.join(tempPath, "%(title)s_%(id)s.%(ext)s");
  const args = [
    "-f", "bestvideo+bestaudio/best",
    "--cookies", cookiesPath,
    "--output", outputTemplate,
    "--no-warnings",
    "--yes-playlist",
    url,
  ];

  try {
    await ensureExecutable(ytdlpPath);
    await new Promise((resolve, reject) => {
      execFile(ytdlpPath, args, (error, stdout) => {
        if (error) return reject(error);
        resolve(stdout.trim());
      });
    });
    const files = fs.readdirSync(tempPath);
    for (const file of files) {
      const filePath = path.join(tempPath, file);
      const buffer = fs.readFileSync(filePath);
      const type = file.endsWith(".mp4") ? "video" : "image";
      results.push({ type, src: buffer });
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Erro ao baixar mídia: ${error.message}`);
  }
  return results;
}

async function yts(query) {
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const search = await yt.search(query);
  return search;
}

module.exports = { ytmp3, ytadl: ytmp3, ytvdl: ytmp4, ytmp4, alldl, yts };