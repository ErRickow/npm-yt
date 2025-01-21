import { detectSystemInfo, generateRandomName, getYouTubeID, ensureExecutable, handleFile, getVideoUrl, updateFile } from './../dist/utils.js';
import { Innertube, UniversalCache } from "youtubei.js";
import { execFile } from "child_process";
import ai from './ia/index.js';
import path from "path";
import fs from "fs";
import os from 'os';
import fetch from 'node-fetch';




updateFile();




const tempPath = path.join(__dirname, "../temp");
const tempDirSystem = os.tmpdir();
let PathErDL = '';

async function clearSystemTempDir() {
  try {
    const command = "rm -rf " + tempDirSystem + "/*";
    exec(command, (err) => {
      if (err) {
        console.error('Gagal membersihkan direktori sementara:', err.message);
      } else {
      }
    });
  } catch (err) {
    console.error('Kesalahan umum:', err.message);
  }
}

function loadAndShuffleCookies() {
const cookiesPath = path.join(__dirname, "../dist/cookies.json");
const cookiesArray = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
return cookiesArray.sort(() => Math.random() - 0.5);
};

async function findValidCookie() {
const cookiesArray = loadAndShuffleCookies();
const testedCookies = new Set();
for (const cookie of cookiesArray) {
if (testedCookies.has(cookie)) continue;
const tempCookiePath = path.join(__dirname, '../dist/cookie.txt');
fs.writeFileSync(tempCookiePath, cookie);
const isValid = await testCookie(tempCookiePath);
testedCookies.add(cookie);
if (isValid) {
return tempCookiePath;
}}
throw new Error('❌ [ERROR] Tidak ada cookie valid yang ditemukan');
};

async function testCookie(cookiePath) {
const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const args = ["--no-cache-dir", "-F", "--cookies", cookiePath, url];
return new Promise((resolve, reject) => {
execFile(PathErDL, args, (error, stdout, stderr) => {
if (error) {
if (PathErDL.includes('erdl_py')) {
execFile('python', [PathErDL, ...args], (pyErr, pyStdout, pyStderr) => {
if (pyErr) {
if (pyStderr.includes('This content isn') || (pyErr.message && pyErr.message.includes('This content isn'))) {
resolve(false);
} else {
resolve(true);
}} else {
resolve(true);
}});
} else if (stderr.includes('This content isn') || (error.message && error.message.includes('This content isn'))) {
resolve(false);
} else {
resolve(true);
}} else {
resolve(true);
}});
});
}

detectSystemInfo((error, architecture, platform) => {
  if (error) return console.error(`❌ [ERROR] Gagal mendeteksi sistem: ${error.message}`);
  if (platform === 'android') {
    PathErDL = path.join(__dirname, "../bin/erdl_py");

    console.log(`📱 [PLATFORM] Sistem Android terdeteksi.`);

    console.log(`🚀 [@hiudyy/ytdl] Modul diinisialisasi dengan Python untuk Android.`);
    return;
  }
  if (platform !== 'linux' && platform !== 'win32') {
    return console.error(`❌ [PLATFORM] Modul ini hanya kompatibel dengan sistem Linux, Android, dan Windows.`);
  }
  console.log(`✅ [PLATFORM] Sistem terdeteksi: ${platform}.`);

  switch (architecture) {
    case 'x64':
      PathErDL = path.join(__dirname, platform === 'win32' ? "../bin/ErLib_win_x64.zip" : "../bin/ErLib");
      console.log(`💻 [ARSITEKTUR] Arsitektur x64 terdeteksi.`);
      break;
    case 'arm':
      PathErDL = path.join(__dirname, "../bin/ErLib_v7");
      console.log(`🤖 [ARSITEKTUR] Arsitektur ARM terdeteksi.`);
      break;
    case 'arm64':
      PathErDL = path.join(__dirname, "../bin/ErLib_64");
      console.log(`🔧 [ARSITEKTUR] Arsitektur ARM64 terdeteksi.`);
      break;
    case 'x86':
      PathErDL = path.join(__dirname, "../bin/ErLib_win_x86.zip");
      console.log(`💻 [ARSITEKTUR] Arsitektur x86 terdeteksi.`);
      break;
    default:
      console.error(`❌ [ARSITEKTUR] Arsitektur tidak didukung: ${architecture}`);
      return;
  }

  console.log(`✅ [@hiudyy/ytdl] Modul berhasil diinisialisasi pada arsitektur: ${architecture}.`);
});



async function processOutput(args, tempFile) {
await ensureExecutable(PathErDL);
return new Promise((resolve, reject) => {
execFile(PathErDL, args, (err, stdout, stderr) => {
if (err) {
if (PathErDL.includes('erdl_py')) {
execFile('python', [PathErDL, ...args], (pyErr, pyStdout, pyStderr) => {
if (pyErr) {
reject(`Percobaan gagal. Mencoba lagi... ${pyStderr || pyErr.message}`);
} else {
handleFile(tempFile, resolve, reject);
}})} else {
reject(`ErLib error: ${stderr || err.message}`);
}} else {
handleFile(tempFile, resolve, reject);
}})})};




async function ermp3(input) {
  await clearSystemTempDir();
  const url = getVideoUrl(input);
  const output = path.join(tempPath, generateRandomName("m4a"));
  const validCookiePath = await findValidCookie();

  const args = ["--no-cache-dir", "-f", "worstaudio", "--cookies", validCookiePath, "-o", output, url];
  
  return await processOutput(args, output);
};




async function ermp4(input) {
  await clearSystemTempDir();
  const url = getVideoUrl(input);
  const output = path.join(tempPath, generateRandomName("mp4"));
  const validCookiePath = await findValidCookie();

  const args = ["--no-cache-dir", "-f", "bestvideo+worstaudio[ext=mp4]/mp4", "--cookies", validCookiePath, "-o", output, url];
  
  return await processOutput(args, output);
};




async function alldl(input) {
  await clearSystemTempDir();
  const url = input;
  const results = [];
  const tempPathDl = path.join(tempPath, `${Math.floor(Math.random() * 100000)}_${Math.floor(Math.random() * 100000)}`);
  const outputTemplate = path.join(tempPathDl, "%(title)s_%(id)s.%(ext)s");

  try {
    await ensureExecutable(PathErDL);
    const validCookiePath = await findValidCookie();

    // Argument untuk daftar format yang tersedia
    const formatArgs = ["--no-cache-dir", "-F", "--cookies", validCookiePath, url];

    const formats = await new Promise((resolve, reject) => {
      execFile(PathErDL, formatArgs, (error, stdout) => {
        if (error) return reject(error);
        resolve(stdout.trim());
      });
    });

    // Deteksi jenis file yang didukung
    const hasAudio = /\.(mp3|m4a|aac|wav|flac|ogg|opus)$/i.test(formats) || formats.includes('audio');
    const hasVideo = /\.(mp4|mkv|avi|mov|wmv|flv|webm)$/i.test(formats) || formats.includes('video');
    const hasImages = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(formats) || formats.includes('image');
    const hasDocument = /\.(pdf|doc|docx|xls|xlsx|txt|ppt|pptx|zip|apk)$/i.test(formats) || formats.includes('document');

    const downloadArgsList = [];

    // Video + Audio dengan kualitas menengah
    if (hasVideo || !hasAudio) {
      downloadArgsList.push(["--no-cache-dir", "-f", "bestvideo+worstaudio/best", "--merge-output-format", "mp4", "--cookies", validCookiePath, "--output", outputTemplate, "--no-warnings"]);
    }

    // Audio dengan kualitas lebih rendah dan cepat
    if (hasAudio) {
      downloadArgsList.push([
        "--no-cache-dir",
        "-f",
        "worstaudio",
        "--cookies",
        validCookiePath,
        "--output",
        outputTemplate,
        "--no-warnings",
        "--socket-timeout", "10",
        "--concurrent-fragments", "16",
      ]);
    }

    // Gambar
    if (hasImages) {
      downloadArgsList.push([
        "--no-cache-dir",
        "-f",
        "best",
        "--cookies",
        validCookiePath,
        "--output",
        outputTemplate,
        "--no-warnings",
        "--yes-playlist",
      ]);
    }

    // Dokumen
    if (hasDocument) {
      downloadArgsList.push([
        "--no-cache-dir",
        "-f",
        "best",
        "--cookies",
        validCookiePath,
        "--output",
        outputTemplate,
        "--no-warnings",
      ]);
    }

    // Menjalankan proses unduhan
    for (const args of downloadArgsList) {
      let attempt = 0;
      let success = false;

      while (attempt < 3 && !success) {
        attempt++;
        try {
          await new Promise((resolve, reject) => {
            execFile(PathErDL, args.concat(url), async (error, stdout, stderr) => {
              if (error) {
                if (PathErDL.includes("erdl_py")) {
                  execFile("python", [PathErDL, ...args, url], async (pyErr, pyStdout, pyStderr) => {
                    if (pyErr) {
                      return reject(`ErLib error (Python): ${pyStderr || pyErr.message}`);
                    }
                    resolve(pyStdout.trim());
                  });
                } else {
                  return reject(`ErLib error: ${stderr || error.message}`);
                }
              } else {
                resolve(stdout.trim());
              }
            });
          });

          // Jika tidak ada kesalahan, tandai sebagai berhasil
          success = true;
          console.log(`Percobaan ${attempt} berhasil untuk args: ${args}`);
        } catch (err) {
          console.log(`Percobaan ${attempt} gagal untuk args: ${args}. Kesalahan: ${err}`);
          if (attempt === 3) {
            await clearSystemTempDir();
            console.error(`Kesalahan setelah 3 percobaan untuk args: ${args}.`);
            throw new Error(err); // Lemparkan ulang kesalahan setelah 3 percobaan gagal
          }
        }
      }

      // Memproses file yang diunduh
      const files = fs.readdirSync(tempPathDl);
      for (const file of files) {
        const filePath = path.join(tempPathDl, file);
        const extension = path.extname(file).toLowerCase();
        const convertedFilePath = path.join(tempPathDl, `converted_${path.basename(file, extension)}.mp4`);

        if ([".mp4", ".mkv", ".webm"].includes(extension)) {
          try {
            await convertToCompatibleVideo(filePath, convertedFilePath); // Konversi video ke format yang kompatibel
            const buffer = fs.readFileSync(convertedFilePath);
            results.push({ type: "video", src: buffer, mimetype: "video/mp4" });
            fs.unlinkSync(filePath); // Hapus file asli
            fs.unlinkSync(convertedFilePath); // Hapus file yang telah dikonversi
          } catch (conversionError) {
            console.error("Kesalahan saat mengonversi video:", conversionError);
          }
        } else if ([".mp3", ".m4a", ".opus"].includes(extension)) {
          const buffer = fs.readFileSync(filePath);
          results.push({ type: "audio", src: buffer, mimetype: "audio/mpeg" });
          fs.unlinkSync(filePath);
        } else if ([".jpg", ".jpeg", ".png", ".webp"].includes(extension)) {
          const buffer = fs.readFileSync(filePath);
          results.push({ type: "image", src: buffer, mimetype: "image/jpg" });
          fs.unlinkSync(filePath);
        } else if ([".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt", ".ppt", ".pptx"].includes(extension)) {
          const buffer = fs.readFileSync(filePath);
          results.push({ type: "document", src: buffer, mimetype: "application/octet-stream" });
          fs.unlinkSync(filePath);
        } else if ([".zip"].includes(extension)) {
          const buffer = fs.readFileSync(filePath);
          results.push({ type: "document", src: buffer, mimetype: "application/zip" });
          fs.unlinkSync(filePath);
        } else if ([".apk"].includes(extension)) {
          const buffer = fs.readFileSync(filePath);
          results.push({ type: "document", src: buffer, mimetype: "application/vnd.android.package-archive" });
          fs.unlinkSync(filePath);
        } else {
          const buffer = fs.readFileSync(filePath);
          results.push({ type: "unknown", src: buffer, mimetype: "application/octet-stream" });
          fs.unlinkSync(filePath);
        }
      }
    }
  } catch (err) {
    console.error("Kesalahan saat mengunduh:", err);
  }

  return results;
}

async function convertToCompatibleVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -movflags +faststart "${outputPath}"`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg error:", stderr || error.message);
        return reject(error);
      }
      resolve();
    });
  });
}




async function yts(query) {
await clearSystemTempDir();
const yt = await Innertube.create({ cache: new UniversalCache() });
const search = await yt.search(query);
return search;
};




const expotszz = {
ermp3: ermp3, 
ermp4: ermp4,
ytadl: ermp3, 
ytvdl: ermp4, 
alldl: alldl, 
yts: yts, 
ai: ai,
update: updateFile
};

export default expotszz;