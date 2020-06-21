const service = require('../services').authentication;

const logout = async (ctx) => {
    ctx.session = null;
    ctx.body = { message: "Logged out" };
};

module.exports = {
    logout
};