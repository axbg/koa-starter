const authenticated = async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user._id) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = {message: 'Unauthorized'};
  }
};

module.exports = {
  authenticated,
};
