const service = require('../services').authentication;

const logout = async (ctx) => {
    ctx.status = 200;
};

const removeAccount = async (ctx) => {
    ctx.status = 200;
}

module.exports = {
    logout,
    removeAccount
};