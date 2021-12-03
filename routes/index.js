const Router = require('koa-router');
const {ENABLE_SWAGGER} = require('../properties');
const koaSwagger = require('koa2-swagger-ui');
const spec = require('../configurations/docs');

const {authenticated}= require('../middlewares').authentication;

const userRouter = require('./user');

const router = new Router({prefix: '/api'});

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = {message: 'koa starter - hello endpoint'};
});

if (ENABLE_SWAGGER) {
  router.get('/docs', koaSwagger({routePrefix: false, swaggerOptions: {spec}}));
}

// public routes - register your public routers here
router.use('/user', userRouter.routes());

router.use(authenticated);

// protected routes - you can register your protected routers here
router.get('/authenticated', (ctx) => {
  ctx.status = 200;
  ctx.body = {message: 'koa-starter - authenticated endpoint'};
});

module.exports = router;
