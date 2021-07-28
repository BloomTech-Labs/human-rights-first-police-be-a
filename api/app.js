const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
const RedditHelper = require('./incidents/incidentsModel');
const TwitterHelper = require('./twitter_incidents/twitterIncidentsModel');

const cron = require('node-cron');

if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const profileRouter = require('./profile/profileRouter');
const dataRouter = require('./util/dataRouter');
const adminIncidentsRouter = require('./allIncidents/adminIncidentsRouter');
const newIncidentsRouter = require('./allIncidents/allincidentsRouter');

//###[ Models ]###
const { dsUpdateFetch, dsTwitterUpdateFetch } = require('./dsService/dsUtil');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());
app.options('*', cors());
app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    exposedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Connection',
      'Content-Length',
      'Strict-Transport-Security',
      'X-Content-Type-Options',
      'X-DNS-Prefetch-Control',
      'X-Download-Options',
      'X-XSS-Protection',
      'X-Frame-Options',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Connection',
      'Content-Length',
      'Strict-Transport-Security',
      'X-Content-Type-Options',
      'X-DNS-Prefetch-Control',
      'X-Download-Options',
      'X-XSS-Protection',
      'X-Frame-Options',
    ],
    origin: 'https://a.humanrightsfirst.dev',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use(['/profile', '/profiles'], profileRouter);
app.use('/incidents', newIncidentsRouter);
app.use('/data', dataRouter);
app.use('/dashboard', adminIncidentsRouter);

// cron job to retrieve data from DS API
cron.schedule(' 0 23 * * *', async function () {
  try {
    const [lastId] = await RedditHelper.getLastRedditID();
    const [lastTwitterId] = await TwitterHelper.getLastID();
    dsTwitterUpdateFetch(lastTwitterId.max);
    dsUpdateFetch(lastId.max);
    console.log("You've got mail");
  } catch (error) {
    console.log('Unable to get last id', error.message);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
