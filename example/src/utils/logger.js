const { config } = require("@config/config.js");
const winston = require("winston");

const prettyJson = winston.format.printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.label || "-"} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: config.loggerLevel === "silent" ? undefined : config.loggerLevel,
  silent: config.loggerLevel === "silent",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    prettyJson,
  ),
  defaultMeta: { service: "api-example" },
  transports: [new winston.transports.Console({})],
});

module.exports = logger;
