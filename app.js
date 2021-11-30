require('dotenv').config();

const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');
const morgan = require('koa-morgan');

const properties = require('./properties');
const logger = require('./configurations/logger');
const passport = require('./configurations/security');
const middleware = require('./middlewares');
const router = require('./routes');
const connectDatabase = require('./models').connect;
const bindWebSocket = require('./websockets').bindWebSocket;

const app = new Koa();

!properties.PROD && console.log(properties);

properties.ALLOW_CORS && app.use(cors());

app.use(morgan('combined', {stream: logger.stream}));

app.keys = properties.COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(properties.SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

connectDatabase();

app.use(router.routes());
app.use(router.allowedMethods());

properties.ALLOW_CORS && bindWebSocket(app);

app.listen(properties.PORT, () => {
  console.log('koa starter - running on http://localhost:' + properties.PORT);
});
