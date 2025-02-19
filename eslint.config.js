const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      prettier,
      'unused-imports': unusedImports
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': ['error', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
      'no-console': 'off'
    }
  }
];