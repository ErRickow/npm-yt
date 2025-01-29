Selamat Datang di Er-NPM
========================

Pendahuluan
-----------

``@er-npm/scraper`` adalah pustaka Node.js untuk berinteraksi dengan berbagai API.

Instalasi
---------

Untuk menginstal pustaka ini, jalankan perintah berikut:

.. code-block:: bash

   $ npm install @er-npm/scraper

.. important::

   Harap dicatat bahwa masih ada beberapa kesalahan yang perlu diperbaiki.

Penggunaan
----------

Berikut adalah contoh cara menggunakan pustaka ini:

.. code-block:: javascript

    // Impor modul
    const { ermp3, ermp4, yts, alldl, ai } = require("@er-npm/scraper");

    (async () => {
        const prompt = 'hai cantik!';
        const response = await ai(prompt);
        console.log(response);
    })();

Daftar Isi
----------

.. toctree::
   :maxdepth: 1
   :caption: Daftar Isi

   table