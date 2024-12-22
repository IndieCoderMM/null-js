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
      "@core/*": ["src/core/*"],
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
