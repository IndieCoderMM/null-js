module.exports = `{
  "name": "null-app-template",
  "version": "1.0.0",
  "description": "Production-ready Express.js boilerplate with best practices",
  "author": "",
  "license": "ISC",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon"
  },
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "module-alias": "^2.2.3",
    "morgan": "^1.10.0",
    "morgan-body": "^2.6.9",
    "winston": "^3.14.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "nodemon": "^3.0.2",
    "sequelize-cli": "^6.6.2"
  },
  "_moduleAliases": {
    "@api": "src/api",
    "@core": "src/core",
    "@config": "src/config",
    "@utils": "src/utils",
    "@middlewares": "src/middlewares"
  }
}
`;
