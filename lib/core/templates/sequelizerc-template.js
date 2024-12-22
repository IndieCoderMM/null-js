module.exports = `const path = require("path");

module.exports = {
  "models-path": path.resolve("src", "db", "models"),
  "migrations-path": path.resolve("src", "db", "migrations"),
  "seeders-path": path.resolve("src", "db", "seeders")
}
`;