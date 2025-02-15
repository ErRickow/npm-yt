module.exports = {
  env: {
    node: true, // Aktifkan lingkungan Node.js
    es2021: true // Aktifkan fitur ES2021
  },
  overrides: [
    {
      files: ['*.mjs'], // Semua file .mjs dianggap ES Modules
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      files: ['*.cjs'], // Semua file .cjs dianggap CommonJS
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.js'], // Jika ada .js, deteksi otomatis berdasarkan package.json
      parserOptions: {
        sourceType: 'unambiguous'
      }
    }
  ],
  rules: {
    'no-undef': 'off', // Hindari error undefined untuk global variables
    'no-unused-vars': 'warn' // Tandai variabel yang tidak terpakai
  }
};
