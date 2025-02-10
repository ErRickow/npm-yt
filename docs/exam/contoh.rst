Schema Respons API
==================

**Contoh hasil dari `/dl/ermp3` (Download MP3 dari YouTube):**

.. code-block:: json

    {
      "status": 200,
      "hasil": [
        {
          "judul": "judul lagu",
          "link_download": "link download"
        }
      ],
      "from": "er-api"
    }

.. tip::
   
   jika gagal, status codenya bukan 200

**Contoh hasil dari `/get/metaai` (AI Chatbot):**

.. code-block:: json

    {
        "status": 200,
        "hasil": "Halo! saya meta ai",
        "from": "er-api"
    }