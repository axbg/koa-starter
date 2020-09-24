const winston = require('winston');
const {combine, timestamp, json} = winston.format;
const config = require('../config');

require('winston-daily-rotate-file');

const removeErrors = winston.format((info, opts) => {
  return info.level === 'error' ? false : info;
});

const accessTransport = new winston.transports.DailyRotateFile({
  level: 'debug',
  filename: '%DATE%.log',
  dirname: 'logs/access',
  datePattern: 'YYYY-MM-DD',
  format: combine(removeErrors(), timestamp(), json()),
  utc: true,
  maxSize: '20m',
});

const errorTransport = new winston.transports.DailyRotateFile({
  level: 'warn',
  filename: '%DATE%.log',
  dirname: 'logs/error',
  datePattern: 'YYYY-MM-DD',
  format: combine(timestamp(), json()),
  utc: true,
  maxSize: '20m',
});

const transports = [accessTransport, errorTransport];

config.DEV &&
  transports.push(
      new winston.transports.Console({level: 'debug', colorize: true}),
  );

const winstonLogger = new winston.createLogger({
  transports: transports,
  exitOnError: false,
});

winstonLogger.stream = {
  write: (text) => {
    winstonLogger.debug(text);
  },
};

module.exports = winstonLogger;
