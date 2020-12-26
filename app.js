var createError = require('http-errors');
const cors = require('cors');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var express = require('express');
const connectDB = require('./connection');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/books');
const multer = require('multer');
var app = express();

require('./passportConfig')(passport);

connectDB();
const Port = process.env.PORT || 5000;

//app.listen(Port, () => console.log('Server Started', Port));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(multer({dest:'./public/images'}).single('photo'));//only this works
app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
/*app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
})
//require('./passportConfig')(passport);

app.use('/', express.static(path.join(__dirname,'client','build')));
app.use('/users', usersRouter);
app.use('/books', bookRouter);

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


if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname,'client','build')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'));

  })
}

app.listen(Port, () => console.log('Server Started', Port));

module.exports = app;
