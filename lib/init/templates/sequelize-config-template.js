module.exports = `const { config } = require("./config");

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: "mysql",
  },
};
`;
