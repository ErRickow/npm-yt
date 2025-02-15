import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    plugins: { prettier },
    rules: {
      "prettier/prettier": ["error", { semi: true }],
      "semi": ["error", "always"]
    }
  }
];