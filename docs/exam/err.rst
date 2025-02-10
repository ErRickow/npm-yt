Penanganan Error
================

Jika terjadi kesalahan saat mengakses API, berikut beberapa kode error yang mungkin muncul:

  - **400 (Bad Request)** → Parameter yang dikirim tidak valid.
  - **404 (Not Found)** → URL atau endpoint tidak ditemukan.
  - **500 (Internal Server Error)** → Kesalahan dari server.
  - **504 (Timeout)** -> Timeout dari server

**Cara Menangani Error di Axios**:

.. code-block:: javascript

    axios.get("https://er-api.biz.id/dl/ermp3?u=https://link.yt.com/")
        .then(response => console.log(response.data))
        .catch(error => {
            console.error("Terjadi kesalahan:", error.response ? error.response.data : error.message);
        });

**Cara Menangani Error di node-fetch**:

.. code-block:: javascript

    fetch("https://er-api.biz.id/get/metaai?t=hai")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error("Terjadi kesalahan:", error.message));