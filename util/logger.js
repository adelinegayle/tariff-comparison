const { createLogger, transports } = require("winston");

const logConfiguration = {
  transports: [new transports.Console()],
};

module.exports = createLogger(logConfiguration);
