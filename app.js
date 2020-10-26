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

const app = new Koa();

console.log(properties);

properties.ALLOW_CORS && app.use(cors());

app.use(morgan('combined', { stream: logger.stream }));

app.keys = properties.COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(properties.SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

// uncomment to enable database connection
// connectDatabase();

app.listen(properties.PORT, () => {
  console.log('koa starter - running on http://localhost:' + properties.PORT);
});
