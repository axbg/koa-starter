const winston = require('winston');
require('winston-daily-rotate-file');
const log4js = require('log4js');
const config = require('../config');

const fileRotateTransport = new (winston.transports.DailyRotateFile)({
  filename: '%DATE%.log',
  dirname: 'logs/access',
  datePattern: 'YYYY-MM-DD',
  utc: true,
  maxSize: '20m',
});

const transports = [fileRotateTransport];
config.DEV && transports.push(new winston.transports.Console({level: 'debug', colorize: true}));

const accessLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: transports,
  exitOnError: false,
});

log4js.configure({
  appenders: {
    errors: {
      type: 'datefile', filename: 'logs/errors/errors.log',
    },
  },
  categories: {default: {appenders: ['errors'], level: 'error'}},
});

const errorLogger = log4js.getLogger('errors');

module.exports = {
  write: (text) => {
    accessLogger.info(text);
  },
  errorLogger,
};
