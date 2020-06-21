const config = require('../config');
const KoaError = require('../utils/error');
const errorLogger = require('../utils/logger').errorLogger;

const globalErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    errorLogger.error(err);
    config.DEV && console.log(err.stack);
    if (err instanceof KoaError) {
      ctx.status = err.code;
      ctx.body = {message: err.message};
    } else {
      ctx.status = 500;
      ctx.body = {message: config.DEV ? ctx.message : 'Something very nasty happened'};
    }
  }
};

module.exports = {
  globalErrorHandler,
};
