const path = require("path");
const { createFile } = require("../../utils/file.js");

const configTemplate = require("./templates/config-template");
const serverTemplate = require("./templates/server-template");
const sequelizercTemplate = require("./templates/sequelizerc-template");
const modelsIndexTemplate = require("./templates/models-index-template");
const indexTemplate = require("./templates/index-template");
const loggerTemplate = require("./templates/logger-template");
const customErrorTemplate = require("./templates/custom-error-template");
const middlewaresTemplate = require("./templates/middlewares-template");
const packageTemplate = require("./templates/package-template");
const jsconfigTemplate = require("./templates/jsconfig-template");
const nodemonTemplate = require("./templates/nodemon-template");
const routerTemplate = require("./templates/router-template");
const helloRouterTemplate = require("./templates/hello-router-template");
const helloControllerTemplate = require("./templates/hello-controller-template");
const gitignoreTemplate = require("./templates/gitignore-template");
const envDefaultsTemplate = require("./templates/env-defaults-template");
const envSchemaTemplate = require("./templates/env-schema-template");
const envDevTemplate = require("./templates/env-dev-template");
const envProdTemplate = require("./templates/env-prod-template");

/** @typedef {Object<string, string[]>} ProjectStructure */

/** @type ProjectStructure */
const projectStructure = {
  "src/api/hello": ["hello.router.js", "hello.controller.js"],
  "src/config": ["config.js"],
  "src/core": ["server.js", "router.js"],
  "src/middlewares": ["middlewares.js"],
  "src/db/migrations": [],
  "src/db": ["models/index.js"],
  "src/utils": ["logger.js", "CustomError.js"],
  src: ["index.js"],
  root: [
    "package.json",
    "jsconfig.json",
    "nodemon.json",
    ".sequelizerc",
    ".gitignore",
    ".env.defaults",
    ".env.schema",
    ".env.dev",
    ".env.prod",
  ],
};

const fileTempates = {
  "config.js": configTemplate,
  "server.js": serverTemplate,
  "index.js": indexTemplate,
  "logger.js": loggerTemplate,
  "router.js": routerTemplate,
  "CustomError.js": customErrorTemplate,
  "middlewares.js": middlewaresTemplate,
  "hello.router.js": helloRouterTemplate,
  "hello.controller.js": helloControllerTemplate,
  "package.json": packageTemplate,
  "jsconfig.json": jsconfigTemplate,
  "nodemon.json": nodemonTemplate,
  "models/index.js": modelsIndexTemplate,
  ".sequelizerc": sequelizercTemplate,
  ".gitignore": gitignoreTemplate,
  ".env.defaults": envDefaultsTemplate,
  ".env.schema": envSchemaTemplate,
  ".env.dev": envDevTemplate,
  ".env.prod": envProdTemplate,
};

/**
 * Generate a new express project with basic structure
 * Deps: express, sequelize, mysql, sequelize-cli
 */
module.exports = () => {
  /**
   * Create files based on the project structure
   * @param {ProjectStructure} structure - Project structure
   */
  const createFiles = (structure) => {
    Object.entries(structure).forEach(([dir, files]) => {
      const dirPath = dir === "root" ? "./" : dir;

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (fileTempates[file]) {
          createFile(filePath, fileTempates[file]);
          return;
        }
      });
    });
  };

  createFiles(projectStructure);
};
