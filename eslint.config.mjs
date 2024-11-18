const globals = require("globals");
const pluginJs = require("@eslint/js");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
      "no-extra-semi": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-implicit-globals": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      quotes: ["error", "single", { avoidEscape: true }],
      semi: ["error", "always"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "eol-last": ["error", "always"],
      "max-len": ["warn", { code: 80 }],
      "prefer-const": "error",
      "no-var": "error",
      "arrow-spacing": ["error", { before: true, after: true }],
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
      "prefer-module": "off",
    },
  },
  pluginJs.configs.recommended,
];

