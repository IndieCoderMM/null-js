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
 * @property {string} db.user - Database user
 * @property {string} db.password - Database password
 * @property {Object} db.options - Database options
 * @property {string} db.options.host - Database host
 * @property {string} db.options.dialect - Database dialect
 * @property {number} db.options.port - Database port
 */

/**
 * Application configuration
 * @type {Config}
 */
const config = {
  port: 3000,
  morganLogger: true,
  morganBodyLogger: true,
  devLogger: true,
  loggerLevel: "debug",
  db: {
    database: "db",
    user: "db_user",
    password: "db_password",
    options: {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    },
  },
};

module.exports = {
  corsOptions,
  config,
};
