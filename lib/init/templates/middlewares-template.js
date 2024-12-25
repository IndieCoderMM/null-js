module.exports = `const CustomError = require("@utils/CustomError");
const { Op } = require("sequelize");
const logger = require("@utils/logger");

/**
 * Async handler for express routes
 * @param {Function} fn - Express route handler
 * @returns {import("express").NextFunction} Express route handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Error handler for express routes
 * @type {import("express").ErrorRequestHandler}
 * @param {Error | CustomError} err - Error object
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  logger.error("Server Error: " + err.message);
  logger.error(err.stack);

  res.status(500).json({ message: "Internal Server Error" });
};

/**
 * Log request and response in development mode
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next function
 */
const devLogger = (req, res, next) => {
  const startHrTime = process.hrtime();

  const [oldWrite, oldEnd] = [res.write, res.end];
  const chunks = [];

  res.write = function (chunk) {
    chunks.push(Buffer.from(chunk));
    oldWrite.apply(res, arguments);

    return true;
  };

  res.end = function (chunk) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }

    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    logger.http(\`Response \${res.statusCode} \${elapsedTimeInMs.toFixed(3)} ms\`);

    const body = Buffer.concat(chunks).toString("utf8");
    logger.http(\`Response Body: \${body}\`);

    return oldEnd.apply(res, arguments);
  };

  next();
};

// export interface IParsedRequest extends ExpressRequest {
//   parsedQuery?: {
//     limit?: number;
//     offset?: number;
//     order?: Order;
//     where?: WhereOptions;
//   };
// }

/**
 * @typedef {import("express").Request & Object} IParsedRequest
 * @property {Object} parsedQuery
 * @property {number | undefined} parsedQuery.limit
 * @property {number | undefined} parsedQuery.offset
 * @property {import("sequelize").Order} parsedQuery.order
 * @property {import("sequelize").WhereOptions} parsedQuery.where
 */

/**
 * @param {any} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const queryParser = (req, res, next) => {
  const { _end, _order, _sort, _start, q, ...filters } = req.query;

  const limit = _end
    ? parseQueryInt(_end) - (parseQueryInt(_start) || 0)
    : undefined;
  const offset = parseQueryInt(_start);
  const order = buildOrder(_sort, _order);
  const where = buildWhere(filters, q);

  req.parsedQuery = { limit, offset, order, where };

  next();
};
/**
 * @param {any} value
 * @return {number | undefined}
 */
const parseQueryInt = (value) => {
  if (isNaN(value)) {
    return undefined;
  }
  return parseInt(value);
};

/**
 * @param {string} sort
 * @param {string} order
 * @returns {import("sequelize").Order}
 */
const buildOrder = (sort, order) => {
  return sort && order
    ? [[sort, order.toUpperCase()]]
    : [["updatedAt", "DESC"]];
};

/**
 * @param {any} filters
 * @param {string | undefined} q
 * @returns {import("sequelize").WhereOptions}
 */
const buildWhere = (filters, q) => {
  return {};
};

module.exports = {
  asyncHandler,
  errorHandler,
  devLogger,
  queryParser,
};`;
