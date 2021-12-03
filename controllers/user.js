const service = require('../services').user;

const {throwError} = require('../types/error');

const login = async (ctx) => {
  ctx.request.body.email || throwError('Missing parameter: email', 400);
  ctx.request.body.password || throwError('Missing parameter: password', 400);

  const result = await service.checkAuthentication(ctx.request.body.email, ctx.request.body.password);

  ctx.session = {passport: {user: {_id: result}}};
  ctx.status = result ? 200 : 400;
  ctx.body = {message: (result ? 'Logged in' : 'Invalid credentials')};
};

const logout = async (ctx) => {
  ctx.session = null;
  ctx.body = {message: 'Logged out'};
};

module.exports = {
  login,
  logout,
};
