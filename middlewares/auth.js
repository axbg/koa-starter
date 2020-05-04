const authenticated = (ctx, next) => {
    if (ctx.session.passport.user) {
        next();
    } else {
        ctx.status = 401;
        ctx.body = { message: "Not authenticated" };
    }
};

module.exports = {
    authenticated
};