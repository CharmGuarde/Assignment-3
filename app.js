var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionsRouter = require('./routes/transactions');

var app = express();

// Load environment variables
require('dotenv').config();

// Connect MongoDB
const connectDB = require('./config/db');
connectDB();

/* -------------------------------------------------
   SESSION + PASSPORT SETUP
---------------------------------------------------*/
const session = require("express-session");
const passport = require("./config/passport"); // <== you will edit this file later

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* -------------------------------------------------
   AUTH ROUTES (GitHub + Google)
---------------------------------------------------*/
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

/* -------------------------------------------------
   EXPRESS LAYOUTS CONFIG
---------------------------------------------------*/
app.use(expressLayouts);
app.set("layout", "layout");

/* -------------------------------------------------
   VIEW ENGINE
---------------------------------------------------*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* -------------------------------------------------
   MIDDLEWARE
---------------------------------------------------*/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* -------------------------------------------------
   MAIN ROUTES
---------------------------------------------------*/
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

/* -------------------------------------------------
   ERROR HANDLING
---------------------------------------------------*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
