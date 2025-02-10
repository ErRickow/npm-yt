Contoh Penggunaan ER-APIS
=========================

.. caution::
    Pastikan telah menginstal **node-fetch** atau **axios** sebelum menggunakan API.

Instalasi node-fetch:

.. code-block:: bash

    npm i node-fetch

Instalasi axios:

.. code-block:: bash

    npm i axios

.. admonition:: Jangan Install Semua
    :class: tip

    Pilih salah satu antara **axios** atau **node-fetch**, jangan menginstal keduanya sekaligus.

    **Base URL**: https://er-api.biz.id

Contoh Menggunakan Axios
========================

.. code-block:: javascript

    const axios = require('axios');
    const urlnya = "https://er-api.biz.id/dl/ermp3?u=https://link.yt.com/"; // Contoh penggunaan ERMP3 dari ER-APIS
    
    axios.get(urlnya)
        .then(response => {
            console.log(response.data); // Menampilkan hasil berupa link download, judul, dan parameter lainnya
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
        });

Contoh Menggunakan node-fetch
=============================

.. code-block:: javascript

    const fetch = require('node-fetch');
    const urlnya = "https://er-api.biz.id/get/metaai?t=hai"; // Contoh penggunaan MetaAI dari ER-APIS
    
    fetch(urlnya)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Terjadi kesalahan:", error));