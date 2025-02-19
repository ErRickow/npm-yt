const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  js.configs.recommended, // Menggunakan konfigurasi JS yang direkomendasikan
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        require: 'readonly', // Diperlukan agar ESLint tidak error
        console: 'readonly', // Diperlukan agar console.log tidak dianggap error
        process: 'readonly', // Untuk environment Node.js
        module: 'readonly' // Agar require/module.exports tidak error
      }
    },
    plugins: {
      prettier,
      'unused-imports': unusedImports
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off', // Digantikan oleh unused-imports
      'unused-imports/no-unused-imports': 'error', // Hanya gunakan aturan ini
      'no-console': 'off', // Izinkan console.log
      'no-undef': 'off' // Matikan aturan no-undef karena kita sudah atur globals
    }
  }
];
