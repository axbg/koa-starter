const Router = require('koa-router');
const config = require('../config');
const koaSwagger = require('koa2-swagger-ui');
const spec = require('../utils/docs')

const authenticationMiddleware = require('../middlewares').authentication.authenticated;

const authenticationRouter = require('./authentication');

const router = new Router({ prefix: "/api" });

router.get("/", (ctx) => {
    ctx.status = 200;
    ctx.body = { message: "koa starter - hello endpoint" };
});

if (config.ENABLE_SWAGGER) {
    router.get("/docs", koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
}

//public routes - register your public routes here
router.use("/authentication", authenticationRouter.routes());

router.use(authenticationMiddleware);

//protected routes - register your protected routes here

module.exports = router;