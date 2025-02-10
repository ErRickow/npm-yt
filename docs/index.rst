Selamat Datang di Er-NPM
========================

`@er-npm/scraper <https://www.npmjs.com/package/@er-npm/scraper>`_ adalah pustaka Node.js untuk berinteraksi dengan berbagai API.

Pendahuluan
-----------

Pustaka ini memungkinkan Anda untuk mengakses berbagai layanan API dengan mudah.

Instalasi
---------

Untuk menginstal pustaka ini, jalankan perintah berikut:

.. code-block:: bash

   npm install @er-npm/scraper

.. attention::

   Harap dicatat bahwa masih ada beberapa kesalahan yang perlu diperbaiki.

Penggunaan
----------

Berikut adalah contoh cara menggunakan pustaka ini:

.. code-block:: javascript

    // Impor modul
    const { ermp3, ermp4, yts, alldl, playstore, samehadakuDL, samehadakuSearch, ai } = require("@er-npm/scraper");

    (async () => {
        const prompt = 'hai cantik!';
        const response = await ai(prompt);
        console.log(response);
    })();

Daftar Isi
----------

.. toctree::
   :maxdepth: 1

   table