const { corsOptions, config } = require("@config/config.js");
const { devLogger, errorHandler } = require("@middlewares/middlewares.js");
const createRouter = require("./router");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
/** @type {any} */
const helmet = require("helmet");
const morgan = require("morgan");
/** @type {any} */
const morganBody = require("morgan-body");

/**
 * Create express server
 * @returns {Promise<express.Application>} Express app
 */
const createServer = async () => {
  const app = express();
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

  if (config.morganLogger) {
    app.use(
      morgan(":method :url :status :response-time ms - :res[content-length]"),
    );
  }

  if (config.morganBodyLogger) {
    morganBody(app);
  }

  if (config.devLogger) {
    app.use(devLogger);
  }

  app.use("/api", createRouter());

  app.use(errorHandler);

  return app;
};

module.exports = createServer;
