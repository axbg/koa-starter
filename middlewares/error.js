const {PROD} = require('../properties');
const {KoaError} = require('../types/error');
const errorLogger = require('../configurations/logger');

const globalErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    errorLogger.error(err);
    !PROD && console.log(err.stack);
    if (err instanceof KoaError) {
      ctx.status = err.code;
      ctx.body = {message: err.message};
    } else {
      ctx.status = 500;
      ctx.body = {message: !PROD ? ctx.message : 'Something very nasty happened'};
    }
  }
};

module.exports = {
  globalErrorHandler,
};
