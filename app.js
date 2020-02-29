const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const weekRouter = require('./routes/week');
const timeblockRouter = require('./routes/timeblock');

const app = express();
const port = 3003;

// View engine setup
// TODO: remove after React
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*
Middleware functions
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization'
    ]
  })
);


app.use('/', indexRouter);
app.use('/week', weekRouter);
app.use('/timeblock', timeblockRouter)
app.use('/users', usersRouter);  // TODO: Remove this?

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
