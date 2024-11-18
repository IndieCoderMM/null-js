#!/usr/bin/env node
const { program } = require("commander");
const core = require("../lib/core");
const model = require("../lib/model");
const scaffold = require("../lib/scaffold");

program.version("0.0.1");

program
  .command("init")
  .description("Initialize a new project")
  .action(core.init);

program
  .command("create:model <modelName> [attributes...]")
  .description("Generate a new Sequelize model and migration")
  .action(model.create);

program
  .command("scaffold:api <modelName>")
  .description("Generate basic API files for a resource")
  .action(scaffold.api);

program.parse(process.argv);
