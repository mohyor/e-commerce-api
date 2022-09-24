const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "./logs/error.log"),
      level: "error",
      handleExceptions: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "./logs/exceptionerror.log"),
      level: "error",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

//   process.on("unhandledRejection", (ex) => {
//     logger.log("error", ex.message);
//     logger.error(ex.message, ex);
//   });
//   process.on("uncaughtException", (ex) => {
//     logger.log("error", ex.message);
//     logger.error(ex.message, ex);
// });

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = { logger };
