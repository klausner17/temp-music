import winston from "winston";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

var logDir = 'logs';

if (!existsSync(logDir)) {
  mkdirSync( logDir );
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({filename: join(logDir, '/error.log'), level: 'error'})
    ]
  });

export default logger;