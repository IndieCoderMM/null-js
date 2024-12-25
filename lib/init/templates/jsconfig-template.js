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
      "@db/*": ["src/db/*"],
      "@lib/*": ["src/lib/*"],
      "@middlewares/*": ["src/middlewares/*"],
      "@utils/*": ["src/utils/*"],
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
