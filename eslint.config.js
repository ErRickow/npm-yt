const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': ['error', { semi: true }],
      semi: ['error', 'always']
    }
  }
];
