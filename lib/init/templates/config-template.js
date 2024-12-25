module.exports = `// @ts-nocheck
const dotenv = require("dotenv");
const dotenvExtended = require("dotenv-extended");
const dotenvParseVariables = require("dotenv-parse-variables");

dotenv.config();

const ENV = process.env.NODE_ENV || "development";

const env = dotenvExtended.load({
  path: ENV === "production" ? "./.env.prod" : "./.env.dev",
  defaults: "./.env.defaults",
  schema: "./.env.schema",
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
});

/**
 * @type {Object<string, string|number|boolean>}
 */
const parsedEnv = dotenvParseVariables(env);

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  /**
   * @param {string} origin - Origin of the request
   * @param {Function} callback - Callback function
   */
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  exposedHeaders: [],
};

/**
 * @typedef {'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'} LogLevel
 * @typedef {'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'} Dialect
 */

/**
 * @typedef {Object} Config
 * @property {number} port - Port number
 * @property {boolean} morganLogger - Enable morgan logger
 * @property {boolean} morganBodyLogger - Enable morgan body logger
 * @property {boolean} devLogger - Enable dev logger
 * @property {LogLevel} loggerLevel - Logger level
 * @property {Object} db - Database configuration
 * @property {string} db.database - Database name
 * @property {string} db.username - Database user
 * @property {string} db.password - Database password
 * @property {string} db.host - Database host
 * @property {string} db.port - Database port
 * @property {Dialect} db.dialect - Database dialect
 */

/**
 * Application configuration
 * @type {Config}
 */
const config = {
  port: parsedEnv.PORT,
  db: {
    host: parsedEnv.DB_HOST,
    port: parsedEnv.DB_PORT,
    dialect: parsedEnv.DB_DIALECT,
    database: parsedEnv.DB_DATABASE,
    username: parsedEnv.DB_USER,
    password: parsedEnv.DB_PASSWORD,
  },
  morganLogger: parsedEnv.MORGAN_LOGGER,
  morganBodyLogger: parsedEnv.MORGAN_BODY_LOGGER,
  devLogger: parsedEnv.DEV_LOGGER,
  loggerLevel: parsedEnv.LOGGER_LEVEL,
};

module.exports = {
  corsOptions,
  config,
};
`;
