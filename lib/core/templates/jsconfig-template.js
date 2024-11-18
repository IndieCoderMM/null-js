module.exports = `{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "moduleResolution": "node",
    "checkJs": true,
    "allowJs": true,
    "baseUrl": ".",
    "paths": {
      "@api/*": ["src/api/*"],
      "@config/*": ["src/config/*"],
      "@middlewares/*": ["src/middlewares/*"],
      "@utils/*": ["src/utils/*"],
      "@core/*": ["src/core/*"]
    }
  },
  "include": [
    "src/**/*.js"
  ],
  "exclude": [
    "node_modules"
  ]
}
`;
