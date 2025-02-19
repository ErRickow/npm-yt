const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        require: 'readonly', // Tambahkan ini agar ESLint mengenali require
        console: 'readonly' // Tambahkan ini agar ESLint mengenali console
      }
    },
    env: {
      node: true, // Ini penting untuk mengizinkan require & console
      es2021: true
    },
    plugins: {
      prettier,
      'unused-imports': unusedImports
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off', // Matikan aturan default
      'unused-imports/no-unused-vars': 'warn', // Gunakan plugin untuk auto-remove
      'unused-imports/no-unused-imports': 'error', // Hapus import yang tidak digunakan
      'no-console': 'off', // Izinkan console.log
      'no-undef': 'off' // Matikan aturan no-undef
    }
  }
];