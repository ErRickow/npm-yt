const {
  detectSystemInfo,
  generateRandomName,
  getYouTubeID,
  ensureExecutable,
  handleFile,
  getVideoUrl,
  updateFile,
} = require('./../dist/utils.js');
const { Innertube, UniversalCache } = require('youtubei.js');
const { execFile, exec } = require('child_process');
const ai = require('./ia/index.js');
const path = require('path');
const fs = require('fs');
const os = require('os');
const axios = require('axios');
const fetch = require('node-fetch');

updateFile();

const tempPath = path.join(__dirname, '../temp');
const tempDirSystem = os.tmpdir();
let PathErDL = '';

async function clearSystemTempDir() {
  try {
    const command = 'rm -rf ' + tempDirSystem + '/*';
    exec(command, err => {
      if (err) {
        console.error('Gagal membersihkan direktori sementara:', err.message);
      } else {
        console.log('✅ Direktori sementara berhasil dibersihkan.');
      }
    });
  } catch (err) {
    console.error('Kesalahan umum:', err.message);
  }
}

function loadAndShuffleCookies() {
  const cookiesPath = path.join(__dirname, '../dist/cookies.json');
  const cookiesArray = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
  return cookiesArray.sort(() => Math.random() - 0.5);
}

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
    }
  }
  throw new Error('❌ [ERROR] Tidak ada cookie valid yang ditemukan.');
}

async function testCookie(cookiePath) {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const args = ['--no-cache-dir', '-F', '--cookies', cookiePath, url];
  return new Promise((resolve, reject) => {
    execFile(PathErDL, args, (error, stdout, stderr) => {
      if (error) {
        if (PathErDL.includes('ErLib_py')) {
          execFile(
            'python',
            [PathErDL, ...args],
            (pyErr, pyStdout, pyStderr) => {
              if (pyErr) {
                if (
                  pyStderr.includes('This content isn') ||
                  (pyErr.message && pyErr.message.includes('This content isn'))
                ) {
                  resolve(false);
                } else {
                  resolve(true);
                }
              } else {
                resolve(true);
              }
            },
          );
        } else if (
          stderr.includes('This content isn') ||
          (error.message && error.message.includes('This content isn'))
        ) {
          resolve(false);
        } else {
          resolve(true);
        }
      } else {
        resolve(true);
      }
    });
  });
}

detectSystemInfo((error, architecture, platform) => {
  if (error)
    return console.error(
      `❌ [ERROR] Gagal mendeteksi sistem: ${error.message}`,
    );
  if (platform === 'android') {
    PathErDL = path.join(__dirname, '../bin/ErLib_py');
    console.log(`📱 [PLATFORM] Sistem Android terdeteksi.`);
    console.log(
      `🚀 [@er-npm/scraper] Modul diinisialisasi dengan Python untuk Android.`,
    );
    return;
  }
  if (platform !== 'linux' && platform !== 'win32') {
    return console.error(
      `❌ [PLATFORM] Modul ini hanya kompatibel dengan sistem Linux, Android, dan Windows.`,
    );
  }
  console.log(`✅ [PLATFORM] Sistem terdeteksi: ${platform}.`);

  switch (architecture) {
    case 'x64':
      PathErDL = path.join(
        __dirname,
        platform === 'win32' ? '../bin/ErLib_win_x64.zip' : '../bin/ErLib',
      );
      console.log(`💻 [ARSITEKTUR] Arsitektur x64 terdeteksi.`);
      break;
    case 'arm':
      PathErDL = path.join(__dirname, '../bin/ErLib_v7');
      console.log(`🤖 [ARSITEKTUR] Arsitektur ARM terdeteksi.`);
      break;
    case 'arm64':
      PathErDL = path.join(__dirname, '../bin/ErLib_64');
      console.log(`🔧 [ARSITEKTUR] Arsitektur ARM64 terdeteksi.`);
      break;
    case 'x86':
      PathErDL = path.join(__dirname, '../bin/ErLib_win_x86.zip');
      console.log(`💻 [ARSITEKTUR] Arsitektur x86 terdeteksi.`);
      break;
    default:
      console.error(
        `❌ [ARSITEKTUR] Arsitektur tidak didukung: ${architecture}`,
      );
      return;
  }

  console.log(
    `✅ [@er-npm/scraper] Modul berhasil diinisialisasi pada arsitektur: ${architecture}.`,
  );
});

async function processOutput(args, tempFile, retries = 3) {
  await ensureExecutable(PathErDL);

  const cobaEksekusi = percobaan =>
    new Promise((resolve, reject) => {
      execFile(PathErDL, args, async (err, stdout, stderr) => {
        if (err) {
          if (PathErDL.includes('ErLib_py')) {
            execFile(
              'python',
              [PathErDL, ...args],
              async (pyErr, pyStdout, pyStderr) => {
                if (pyErr) {
                  if (percobaan < retries) {
                    console.log(
                      `Percobaan ${percobaan} gagal. Mencoba lagi...`,
                    );
                    await clearSystemTempDir();
                    resolve(await cobaEksekusi(percobaan + 1));
                  } else {
                    await clearSystemTempDir();
                    reject(
                      `Terjadi kesalahan saat menjalankan dengan Python setelah ${retries} percobaan: ${pyStderr || pyErr.message}`,
                    );
                  }
                } else {
                  handleFile(tempFile, resolve, reject);
                }
              },
            );
          } else {
            if (percobaan < retries) {
              console.log(`Percobaan ${percobaan} gagal. Mencoba lagi...`);
              await clearSystemTempDir();
              resolve(await cobaEksekusi(percobaan + 1));
            } else {
              await clearSystemTempDir();
              reject(
                `Kesalahan ErLib setelah ${retries} percobaan: ${stderr || err.message}`,
              );
            }
          }
        } else {
          handleFile(tempFile, resolve, reject);
        }
      });
    });

  return cobaEksekusi(1);
}

// async function ermp3(input) {
//   const url = getVideoUrl(input);
//   const output = path.join(tempPath, generateRandomName('m4a'));
//   const validCookiePath = await findValidCookie();
//
//   const args = [
//     '--no-cache-dir',
//     '-f',
//     'worstaudio',
//     '--cookies',
//     validCookiePath,
//     '-o',
//     output,
//     url,
//   ];
//
//   return await processOutput(args, output);
// }

const base64Url = 'aHR0cHM6Ly9hcGkuc2lwdXR6eC5teS5pZC9hcGkvZC95dG1wMz91cmw9';
const decodedUrl = atob(base64Url);

/**
 * Method ErMp3
 * this is how the parameter
 *
 * @param {str} url - url youtube yang akan di unduh
 * @throws {error} pesan error, jika terjadi kesalahan
 * @returns {str} result dari ermp3
 */
async function ermp3(url) {
  const apiUrl = `${decodedUrl}${url}`;

  try {
    const response = await axios.get(apiUrl);
    return {
      status: true,
      judul: response.data.data.title,
      url: response.data.data.dl,
      from: '@er-npm/scraper',
    };
  } catch (error) {
    // Menangani error jika terjadi
    return {
      status: false,
      why: 'eror njing.',
      terus_gmna: 'visit: t.me/chakszzz',
    };
  }
}

//Contoh penggunaan
// const url = "https://www.youtube.com/watch?v=vx2u5uUu3DE";
// ermp3(url).then(result => console.log(result));
/**
 * Export an image from the given canvas and save it to the disk.
 *
 * @param {Object} options Output options
 * @param {string} options.judul The output format (``jpeg``,  ``png``, or
 *     ``webp``)
 * @param {string} options.status The output quality when format is
 *     ``jpeg`` or ``webp`` (from ``0.00`` to ``1.00``)
 */
async function ermp4(url) {
  await clearSystemTempDir(); // Assuming this function is defined to clear the temp directory

  const sampah = path.join(
    tempPath,
    `${Math.floor(Math.random() * 100000)}_${Math.floor(Math.random() * 100000)}`,
  );
  const outputTemplate = path.join(tempPathDl, '%(title)s_%(id)s.%(ext)s');

  const ur = 'aHR0cHM6Ly9hcGkuc2lwdXR6eC5teS5pZC9hcGkvZC95dG1wND91cmw9';
  const tob = atob(ur);
  const apiUrl = `${tob}${url}`;

  try {
    const response = await axios.get(apiUrl);

    // Assuming response.data.data.dl contains the download URL, you can use the `sampah` variable for the download path
    const filePath = path.join(
      sampah,
      `${response.data.data.title}_${Math.floor(Math.random() * 100000)}.mp4`,
    );

    // Download and save the file to the 'sampah' directory
    const writer = fs.createWriteStream(filePath);
    const fileResponse = await axios.get(response.data.data.dl, {
      responseType: 'stream',
    });
    fileResponse.data.pipe(writer);

    return {
      status: true,
      judul: response.data.data.title,
      url: filePath,
      from: '@er-npm/scraper',
    };
  } catch (error) {
    // Handle errors
    return {
      status: false,
      why: 'Error occurred.',
      terus_gmna: 'Visit: t.me/chakszzz',
    };
  }
}

async function alldl(input) {
  await clearSystemTempDir();
  const url = input;
  const results = [];
  const tempPathDl = path.join(
    tempPath,
    `${Math.floor(Math.random() * 100000)}_${Math.floor(Math.random() * 100000)}`,
  );
  const outputTemplate = path.join(tempPathDl, '%(title)s_%(id)s.%(ext)s');

  try {
    await ensureExecutable(PathErDL);
    const validCookiePath = await findValidCookie();

    // Argumentos para listar formatos disponíveis
    const formatArgs = [
      '--no-cache-dir',
      '-F',
      '--cookies',
      validCookiePath,
      url,
    ];

    const formats = await new Promise((resolve, reject) => {
      execFile(PathErDL, formatArgs, (error, stdout) => {
        if (error) return reject(error);
        resolve(stdout.trim());
      });
    });

    // Detecta tipos de arquivos suportados
    const hasAudio =
      /\.(mp3|m4a|aac|wav|flac|ogg|opus)$/i.test(formats) ||
      formats.includes('audio');
    const hasVideo =
      /\.(mp4|mkv|avi|mov|wmv|flv|webm)$/i.test(formats) ||
      formats.includes('video');
    const hasImages =
      /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(formats) ||
      formats.includes('image');
    const hasDocument =
      /\.(pdf|doc|docx|xls|xlsx|txt|ppt|pptx|zip|apk)$/i.test(formats) ||
      formats.includes('document');

    const downloadArgsList = [];

    // Vídeo + Áudio com qualidade média
    if (hasVideo || !hasAudio) {
      downloadArgsList.push([
        '--no-cache-dir',
        '-f',
        'bestvideo+worstaudio/best',
        '--merge-output-format',
        'mp4',
        '--cookies',
        validCookiePath,
        '--output',
        outputTemplate,
        '--no-warnings',
      ]);
    }

    // Áudio com qualidade mais baixa e rápido
    if (hasAudio) {
      downloadArgsList.push([
        '--no-cache-dir',
        '-f',
        'worstaudio',
        '--cookies',
        validCookiePath,
        '--output',
        outputTemplate,
        '--no-warnings',
        '--socket-timeout',
        '10',
        '--concurrent-fragments',
        '16',
      ]);
    }

    // Imagens
    if (hasImages) {
      downloadArgsList.push([
        '--no-cache-dir',
        '-f',
        'best',
        '--cookies',
        validCookiePath,
        '--output',
        outputTemplate,
        '--no-warnings',
        '--yes-playlist',
      ]);
    }

    // Documentos
    if (hasDocument) {
      downloadArgsList.push([
        '--no-cache-dir',
        '-f',
        'best',
        '--cookies',
        validCookiePath,
        '--output',
        outputTemplate,
        '--no-warnings',
      ]);
    }

    // Executa os downloads
    for (const args of downloadArgsList) {
      let attempt = 0;
      let success = false;

      while (attempt < 3 && !success) {
        attempt++;
        try {
          await new Promise((resolve, reject) => {
            execFile(
              PathErDL,
              args.concat(url),
              async (error, stdout, stderr) => {
                if (error) {
                  if (PathErDL.includes('ErLib_py')) {
                    execFile(
                      'python',
                      [PathErDL, ...args, url],
                      async (pyErr, pyStdout, pyStderr) => {
                        if (pyErr) {
                          return reject(
                            `ErLib error (Python): ${pyStderr || pyErr.message}`,
                          );
                        }
                        resolve(pyStdout.trim());
                      },
                    );
                  } else {
                    return reject(`ErLib error: ${stderr || error.message}`);
                  }
                } else {
                  resolve(stdout.trim());
                }
              },
            );
          });

          // Se não houver erro, marca como sucesso
          success = true;
          console.log(`Tentativa ${attempt} bem-sucedida para args: ${args}`);
        } catch (err) {
          console.log(
            `Tentativa ${attempt} falhou para args: ${args}. Erro: ${err}`,
          );
          if (attempt === 3) {
            await clearSystemTempDir();
            console.error(`Erro após 3 tentativas para args: ${args}.`);
            throw new Error(err); // Relança o erro após 3 tentativas falhas
          }
        }
      }
    }

    // Processa os arquivos baixados
    const files = fs.readdirSync(tempPathDl);
    for (const file of files) {
      const filePath = path.join(tempPathDl, file);
      const extension = path.extname(file).toLowerCase();
      const convertedFilePath = path.join(
        tempPathDl,
        `converted_${path.basename(file, extension)}.mp4`,
      );

      if (['.mp4', '.mkv', '.webm'].includes(extension)) {
        try {
          await convertToCompatibleVideo(filePath, convertedFilePath); // Converte o vídeo para formato compatível
          const buffer = fs.readFileSync(convertedFilePath);
          results.push({ type: 'video', src: buffer, mimetype: 'video/mp4' });
          fs.unlinkSync(filePath); // Remove o arquivo original
          fs.unlinkSync(convertedFilePath); // Remove o arquivo convertido
        } catch (conversionError) {
          console.error('Erro ao converter vídeo:', conversionError);
        }
      } else if (['.mp3', '.m4a', '.opus'].includes(extension)) {
        const buffer = fs.readFileSync(filePath);
        results.push({ type: 'audio', src: buffer, mimetype: 'audio/mpeg' });
        fs.unlinkSync(filePath);
      } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) {
        const buffer = fs.readFileSync(filePath);
        results.push({ type: 'image', src: buffer, mimetype: 'image/jpg' });
        fs.unlinkSync(filePath);
      } else if (
        [
          '.pdf',
          '.doc',
          '.docx',
          '.xls',
          '.xlsx',
          '.txt',
          '.ppt',
          '.pptx',
        ].includes(extension)
      ) {
        const buffer = fs.readFileSync(filePath);
        results.push({
          type: 'document',
          src: buffer,
          mimetype: 'application/octet-stream',
        });
        fs.unlinkSync(filePath);
      } else if (['.zip'].includes(extension)) {
        const buffer = fs.readFileSync(filePath);
        results.push({
          type: 'document',
          src: buffer,
          mimetype: 'application/zip',
        });
        fs.unlinkSync(filePath);
      } else if (['.apk'].includes(extension)) {
        const buffer = fs.readFileSync(filePath);
        results.push({
          type: 'document',
          src: buffer,
          mimetype: 'application/vnd.android.package-archive',
        });
        fs.unlinkSync(filePath);
      } else {
        const buffer = fs.readFileSync(filePath);
        results.push({
          type: 'unknown',
          src: buffer,
          mimetype: 'application/octet-stream',
        });
        fs.unlinkSync(filePath);
      }
    }
  } catch (err) {
    console.error('Errr:', err);
  }

  return results;
}

async function convertToCompatibleVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -movflags +faststart "${outputPath}"`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Kesalahan FFmpeg:', stderr || error.message);
        return reject(error);
      }
      resolve();
    });
  });
}

/**
 * Export an image from the given canvas and save it to the disk.
 *
 * @param {string} query - strings yang akan di gunakan
 * @returns {number} the output
 */
async function yts(query) {
  await clearSystemTempDir();
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const search = await yt.search(query);
  return search;
}

module.exports = {
  ermp3,
  ermp4,
  ytadl: ermp3,
  ytvdl: ermp4,
  alldl,
  yts,
  ai: ai,
  update: updateFile,
  clear: clearSystemTempDir,
};
