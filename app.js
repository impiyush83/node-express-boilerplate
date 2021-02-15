const createError = require('http-errors');
const express = require('express');
const logger = require('./core/libs/logger');
const responseHandler = require('./core/libs/response-handler');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(200, 'OK');
});

app.use('/v1', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// The `next` var needs to be left below to ensure express picks this function as error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error('Error caught by error handler: ', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  responseHandler.handleError(err, res);
});

module.exports = app;
