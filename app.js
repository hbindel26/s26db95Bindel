var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account'); // Keep this here

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var tiresRouter = require('./routes/tires');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
require('dotenv').config(); 
const mongoose = require('mongoose');


const connectionString = process.env.MONGO_CON;

if (!connectionString) {
  console.error("Critical Error: MONGO_CON is undefined in .env file!");
}else {
  mongoose.connect(connectionString)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
    
    recreateDB();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}

var Tires = require('./models/tires');

async function recreateDB() {
  try {
    await Tires.deleteMany();
    console.log("Old data cleared.");

    let instance1 = new Tires({ tire_type: "All-Season", size: "225/50R17", cost: 120.99 });
    let instance2 = new Tires({ tire_type: "Winter", size: '215/55R16', cost: 140.50 });
    let instance3 = new Tires({ tire_type: "Performance", size: '245/40R18', cost: 189.00 });

    await Promise.all([instance1.save(), instance2.save(), instance3.save()]);
    console.log("Database reseeded successfully!");
  } catch (err) {
    console.error("Error during reseeding:", err);
  }
}
let reseed = true;
if (reseed) { recreateDB(); }
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/tires', tiresRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);
// passport config
// Use the existing connection
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());




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
