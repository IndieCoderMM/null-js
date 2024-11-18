const { Sequelize } = require("sequelize");
const { config } = require("@config/config");

const {
  options: { host, dialect },
  username,
  password,
  database,
} = config.db;

const sequelize = new Sequelize({
  host,
  dialect,
  username,
  password,
  database,
});

module.exports = sequelize;
