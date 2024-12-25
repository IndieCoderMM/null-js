#!/usr/bin/env node
const { program } = require("commander");
const { initProject } = require("../lib/init");
const model = require("../lib/model");
const { generateApi } = require("../lib/api");

program.version("0.0.1");

program
  .command("init")
  .description("Initialize a new project")
  .action(initProject);

program
  .command("generate:model <modelName> [attributes...]")
  .description("Generate a new Sequelize model and migration")
  .action(model.create);

program
  .command("generate:api <modelName>")
  .description("Generate basic API files for a resource")
  .action(generateApi);

program.parse(process.argv);
