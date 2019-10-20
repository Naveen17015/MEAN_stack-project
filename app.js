var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
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

var dbCon = mongodb.MongoClient.connect('mongodb://localhost:27017');
console.log('Database is Connected');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
app.use('/service', service);
app.use('/home', home);
app.use('/reset', reset);
app.use('/register', register);
app.use('/signup', signup);

app.post('/next', function(req, res){
  dbCon.then(function(db){
    delete req.body.uname;
    db.collection('Employee').insertOne(req.body)
  });
  res.send('Data received:\n' + JSON.stringify(req.body));
});

app.post('/success',function(req, res){
  dbCon.then(function(db){
    delete req.body.uname;
    db.collection('Employee').insertOne(req.body)
  });
  res.send('Data received:\n' + JSON.stringify(req.body));
  console.log(req.body);
});

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
