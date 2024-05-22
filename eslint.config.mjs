import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["src/**/*.ts"],
    rules: {
      "no-unused-vars": "error",
      // "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },

  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
