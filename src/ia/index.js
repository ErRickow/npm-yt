const ApiKeyHercai = 'RtjHwyCkQGTmUm6NyZv3MR9Hoyda11NIMWcuqBR0=';
const fetch = require('node-fetch');
const aiLibrary = require('unlimited-ai');
const { gpt } = require('gpti');

let AiTempSave = {};
let AiTempSave2 = {};

/**
 * Mengembalikan daftar model AI yang tersedia untuk teks dan gambar.
 * @returns {Promise<Object>} Objek yang berisi daftar model AI.
 */
async function models() {
  return {
    text: [
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-4o',
      'grok-2',
      'grok-2-mini',
      'grok-beta',
      'claude-3-opus',
      'claude-3-sonnet',
      'claude-3-5-sonnet',
      'claude-3-5-sonnet-2',
      'gemini',
    ],
    textv2: [
      'gpt-4',
      'gpt-3.5-turbo',
      'text-davinci-003',
      'code-davinci-002',
      'text-curie-001',
      'text-babbage-001',
      'text-ada-001',
      'davinci',
      'curie',
      'babbage',
      'ada',
    ],
    textv3: [
      'v3',
      'v3-32k',
      'turbo',
      'turbo-16k',
      'gemini',
      'llama3-70b',
      'llama3-8b',
      'mixtral-8x7b',
      'gemma-7b',
    ],
    image: [
      'dalle',
      'v1',
      'v2',
      'lexica',
      'prodia',
      'simurg',
      'animefy',
      'raava',
      'shonin',
    ],
  };
}

/**
 * Menghapus cache percakapan AI.
 * @returns {Promise<boolean>} Mengembalikan `true` jika berhasil.
 */
async function clear() {
  AiTempSave = {};
  return true;
}

/**
 * Mendapatkan model AI berdasarkan nama model yang diberikan.
 * @param {string} modelim - Nama model yang diinginkan.
 * @returns {string} Nama model yang sesuai atau default `gpt-4o-2024-08-06`.
 */
function getModel(modelim) {
  const modelMap = {
    'gpt-4o-mini': 'gpt-4o-mini',
    'gpt-4-turbo': 'gpt-4-turbo-2024-04-09',
    'gpt-4o': 'gpt-4o-2024-08-06',
    'grok-2': 'grok-2',
    'claude-3-opus': 'claude-3-opus-20240229',
    'gemini': 'gemini-1.5-flash-exp-0827',
  };
  return modelMap[modelim] || 'gpt-4o-2024-08-06';
}

/**
 * Mendapatkan model gambar berdasarkan nama model yang diberikan.
 * @param {string} modelim - Nama model gambar yang diinginkan.
 * @returns {string} Nama model gambar yang sesuai atau default `v3/text2image`.
 */
function getModelImage(modelim) {
  const modelMap = {
    dalle: 'v3/text2image',
    v1: 'v1/text2image',
    v2: 'v2/text2image',
    lexica: 'lexica/text2image',
    prodia: 'prodia/text2image',
    animefy: 'animefy/text2image',
  };
  return modelMap[modelim] || 'v3/text2image';
}

/**
 * Menghasilkan gambar berdasarkan teks yang diberikan.
 * @param {string} textin - Prompt teks untuk menghasilkan gambar.
 * @param {string} [model='dalle'] - Model gambar yang akan digunakan.
 * @returns {Promise<Object>} URL gambar yang dihasilkan.
 * @throws {Error} Jika terjadi kesalahan saat permintaan.
 */
async function imageGenV2(textin, model = 'dalle') {
  if (!textin) throw new Error('Teks tidak disediakan.');
  const modelOfc = getModelImage(model);
  const url = `https://hercai.onrender.com/${modelOfc}?prompt=${encodeURIComponent(textin)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: ApiKeyHercai },
  });

  if (!response.ok) throw new Error(`Kesalahan HTTP! status: ${response.status}`);
  const apiResponse = await response.json();
  return { url: apiResponse.url, prompt: textin, model: model };
}

/**
 * Menghasilkan teks dari model AI berdasarkan input yang diberikan.
 * @param {string} text - Teks input.
 * @param {string} [model='gpt-4o'] - Model yang digunakan.
 * @param {string|boolean} [idChat=false] - ID chat untuk menyimpan percakapan.
 * @returns {Promise<string>} Respons AI.
 * @throws {Error} Jika teks tidak disediakan.
 */
async function ia(text, model = 'gpt-4o', idChat = false) {
  if (!text) throw new Error('Teks tidak disediakan.');
  const modelOfc = getModel(model);

  if (!idChat) {
    return await aiLibrary.generate(modelOfc, [{ role: 'user', content: text }]);
  } else {
    if (!AiTempSave[model]) AiTempSave[model] = {};
    if (!AiTempSave[model][idChat]) AiTempSave[model][idChat] = [];

    const formattedMessages = [
      ...AiTempSave[model][idChat],
      { role: 'user', content: text },
    ];

    const response = await aiLibrary.generate(modelOfc, formattedMessages);
    AiTempSave[model][idChat].push({ role: 'assistant', content: response });
    AiTempSave[model][idChat] = AiTempSave[model][idChat].slice(-10);

    return response;
  }
}

/**
 * Menghasilkan teks dengan model AI versi 2.
 * @param {string} input - Teks input.
 * @param {string} [model='gpt-4'] - Model yang digunakan.
 * @param {string|boolean} [idChat=false] - ID chat untuk menyimpan percakapan.
 * @returns {Promise<string>} Respons AI.
 * @throws {Error} Jika teks tidak disediakan.
 */
async function textV2(input, model = 'gpt-4', idChat = false) {
  if (!input) throw new Error('Teks tidak disediakan.');

  const messages = idChat
    ? [...(AiTempSave2[model]?.[idChat] || []), { role: 'user', content: input }]
    : [{ role: 'user', content: input }];

  const response = await gpt.v1({ messages, model, prompt: input, markdown: false });

  if (idChat) {
    AiTempSave2[model] = AiTempSave2[model] || {};
    AiTempSave2[model][idChat] = (AiTempSave2[model][idChat] || []).slice(-10);
    AiTempSave2[model][idChat].push({ role: 'assistant', content: response.gpt });
  }

  return response.gpt;
}

/**
 * Menghasilkan teks dengan model AI versi 3.
 * @param {string} input - Teks input.
 * @param {string} [model='v3'] - Model yang digunakan.
 * @returns {Promise<string>} Respons AI.
 * @throws {Error} Jika terjadi kesalahan HTTP.
 */
async function textV3(input, model = 'v3') {
  if (!input) throw new Error('Teks tidak disediakan.');

  const url = `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(input)}&model=${model}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: ApiKeyHercai },
  });

  if (!response.ok) throw new Error(`Kesalahan: ${response.status}`);
  return (await response.json()).reply;
}

const ai = Object.assign(ia, { models, clear, image: imageGenV2, v3: textV3, v2: textV2 });

module.exports = ai;