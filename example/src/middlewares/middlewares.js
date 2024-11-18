const CustomError = require("@utils/CustomError");
const logger = require("@utils/logger");

/**
 * Async handler for express routes
 * @param {Function} fn - Express route handler
 * @returns {Function} Express route handler
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

    logger.http(`Response ${res.statusCode} ${elapsedTimeInMs.toFixed(3)} ms`);

    const body = Buffer.concat(chunks).toString("utf8");
    logger.http(`Response Body: ${body}`);

    return oldEnd.apply(res, arguments);
  };

  next();
};

module.exports = {
  asyncHandler,
  errorHandler,
  devLogger,
};
