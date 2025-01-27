.. _tut:

Contoh Fungsi ErMp3
___________________

Fungsi `ermp3` digunakan untuk mengambil URL audio dari video YouTube. Fungsi ini membutuhkan URL video YouTube sebagai parameter dan akan mengembalikan URL audio dalam bentuk string.

**Parameter:**
- `url` (*string*): URL video YouTube yang akan diubah menjadi audio.

**Pengembalian:**
- (*string*): URL file audio.

.. code-block:: js
   const { ermp3 } = require('@er-npm/scraper');

   (async () => {
     // Memanggil fungsi ermp3
     const url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE';
     const aud = await ermp3(url);

     console.log('Done✅:', aud); // URL audio
   })();