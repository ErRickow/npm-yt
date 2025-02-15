module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier' // Tambahkan ini agar tidak bentrok dengan Prettier
  ],
  rules: {
    'prettier/prettier': ['error']
  },
  plugins: ['prettier']
}