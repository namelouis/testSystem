var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)

var index = require('./routes/index');
var users = require('./routes/users');

var sessionConfig = require('./common/config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:7880');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain)  //跨域请求

// app.use(cors({
//   origin:'*',
//   methods:['GET','POST'],
//   allowedHeaders:['Content-Type','Authorization'],
// }))

// app.use(session({
//     secret: sessionConfig.cookieSecret,    //cookie签名
//     key:sessionConfig.dbName,
//     resave: true,
//     saveUninitialized: false,
//     store:new mongoStore({url:'mongodb://localhost:27017/session'}),
//     // store: new mongoStore({
//     //   db: sessionConfig.dbName
//     // }),
//     cookie:{
//       maxAge :1000 * 60 * 60 * 3,
//       secure: false
//     }
// }))

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
