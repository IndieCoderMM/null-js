module.exports = `"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const { config } = require("@config/config");

const db = {};

const { username, password, database, host, dialect } = config.db;

const sequelize = new Sequelize.Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/** @type {Record<string, import('sequelize').ModelStatic<import('sequelize').Model>>} */
db.models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db.models[model.name] = model;
  });

Object.keys(db.models).forEach((modelName) => {
  // @ts-ignore
  if (db.models[modelName].associate) {
    // @ts-ignore
    db.models[modelName].associate(db.models);
  }
});

console.log("Models loaded:");
console.table(Object.keys(db.models));

module.exports = db;
`;
