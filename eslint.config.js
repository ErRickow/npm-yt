module.exports = {
  root: true,
  extends: [
    'eslint:recommended', // Atau aturan lain yang Anda gunakan
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'], // Tentukan ekstensi di sini
      rules: {
        // Aturan khusus untuk file tertentu
      },
    },
  ],
};
