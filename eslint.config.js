export default [
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"], // Pastikan ESLint memeriksa file yang benar
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];