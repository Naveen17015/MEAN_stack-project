var createError = require('http-errors');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/EmployeeDB';
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const register = require("./routes/register");
const signup = require("./routes/signup");
const about = require("./routes/about");
const service = require("./routes/service");
const home = require("./routes/index");
const reset = require("./routes/reset");
var app = express();

MongoClient.connect(url, function(err, db) {
console.log("Database is Connected");
db.collection('Employee').inserOne({
  Employeeid :4,
  EmployeeName :"NewEmployee"
}
);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
app.use('/service', service);
app.use('/home', home);
app.use('/reset', reset);
app.use('/register', register);


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
