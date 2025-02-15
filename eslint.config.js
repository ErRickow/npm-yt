module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'prettier/prettier': ['error', { semi: true }], // Pastikan Prettier mengikuti aturan ini
    semi: ['error', 'always'] // ESLint akan memaksa penggunaan semicolon
  },
  plugins: ['prettier']
};
