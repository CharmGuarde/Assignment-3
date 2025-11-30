var createError = require('http-errors'); // used for error handling 
var express = require('express'); // web framework for Node.js
var path = require('path'); // provides utilities for working with file and directory paths
var cookieParser = require('cookie-parser'); // middleware to parse cookies
var logger = require('morgan'); // HTTP request logger middleware 
var expressLayouts = require('express-ejs-layouts'); // layout support for EJS templates

var indexRouter = require('./routes/index'); // main routes
var usersRouter = require('./routes/users'); // user-related routes 
var transactionsRouter = require('./routes/transactions'); // transaction-related routes

var app = express(); // create an Express application instance

const connectDB = require('./config/db'); // import the database connection function
require('dotenv').config(); // load environment variables from .env file

// connect Mongo database
connectDB();


const session = require("express-session");
const passport = require("./config/passport");

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// --- EXPRESS LAYOUTS SETUP ---
app.use(expressLayouts); // use express-ejs-layouts middleware 
app.set('layout', 'layout'); // set default layout file


app.set('views', path.join(__dirname, 'views')); // set views directory
app.set('view engine', 'ejs'); // set EJS as the view engine

app.use(logger('dev')); // use morgan logger in 'dev' format
app.use(express.json()); // parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // parse URL-encoded requests
app.use(cookieParser()); // use cookie parser middleware
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from 'public' directory


app.use('/', indexRouter); // use index router for root path
app.use('/users', usersRouter); // use users router for '/users' path
app.use('/transactions', transactionsRouter); // use transactions router for '/transactions' path

// error handlers...
// catch 404 and forward to error handler
app.use(function(req, res, next) { // middleware to catch 404 errors 
  next(createError(404)); // forward to error handler
});

// error handler
app.use(function(err, req, res, next) { // error handling middleware
  res.locals.message = err.message; // set error message
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // set error details in development mode

  // render the error page

  res.status(err.status || 500); // set response status
  res.render('error'); // render 'error' view
});

module.exports = app; // export the Express application instance

