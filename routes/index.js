const Router = require('koa-router');
const properties = require('../properties');
const koaSwagger = require('koa2-swagger-ui');
const spec = require('../configurations/docs');

const authenticationMiddleware = require('../middlewares').authentication.authenticated;

const userRouter = require('./user');

const router = new Router({prefix: '/api'});

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = {message: 'koa starter - hello endpoint'};
});

if (properties.ENABLE_SWAGGER) {
  router.get('/docs', koaSwagger({routePrefix: false, swaggerOptions: {spec}}));
}

// public routes - register your public routes here
router.use('/user', userRouter.routes());

router.use(authenticationMiddleware);

// protected routes - register your protected routes here
module.exports = router;
