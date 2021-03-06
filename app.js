var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var esiMiddleware = require('nodesi').middleware;
var compression = require('compression');

var indexRouter = require('./routes/index');
var plpRouter = require('./routes/plp');
var pdpRouter = require('./routes/pdp');
var cartRouter = require('./routes/cart');

var app = express();

// compress all responses
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(esiMiddleware({
  cache: false,
}));

app.use('/', indexRouter); // home page
app.use('/plp', plpRouter); // product listing
app.use('/pdp', pdpRouter); // product details
app.use('/cart', cartRouter); // cart details

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
