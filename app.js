require('dotenv').config();

const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');
const morgan = require('koa-morgan');

const logger = require('./configurations/logger');
const passport = require('./configurations/security');
const middleware = require('./middlewares');
const router = require('./routes');

const {connectDatabase} = require('./models');
const {bindWebSocket} = require('./websockets');

const {
  PROD,
  ALLOW_CORS,
  ENABLE_WEB_SOCKETS,
  COOKIE_KEYS,
  SESSION_CONFIG,
  PORT,
} = require('./properties');

const app = new Koa();

!PROD && console.log(require('./properties'));

ALLOW_CORS && app.use(cors());

app.use(morgan('combined', {stream: logger.stream}));

app.keys = COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

connectDatabase();

app.use(router.routes());
app.use(router.allowedMethods());

ENABLE_WEB_SOCKETS && bindWebSocket(app);

app.listen(PORT, () => {
  console.log('koa starter - running on http://localhost:' + PORT);
});
