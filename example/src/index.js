require("module-alias/register");
const { config } = require("@config/config.js");
const createServer = require("@core/server.js");
const logger = require("@utils/logger.js");

createServer()
  .then((app) =>
    app.listen(config.port, () => {
      logger.info("Server ready at port: " + config.port);
    }),
  )
  .catch((err) => {
    logger.error("Failed to create server: " + err.message);
  });
