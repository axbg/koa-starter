const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const morgan = require('koa-morgan');
const session = require('koa-session');

const config = require('./config');
const logger = require('./utils/logger');
const passport = require('./utils/security');
const middleware = require('./middlewares');
const router = require('./routes');
const connectDatabase = require('./models').connect;

const app = new Koa();

config.ALLOW_CORS && app.use(cors());

app.use(morgan('combined', {stream: logger.stream}));

app.keys = config.COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(config.SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

// uncomment to enable database connection
// connectDatabase();

app.listen(config.PORT, () => {
  console.log('koa starter - running on http://localhost:' + config.PORT);
});
