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

const connectDB = require('./config/db');
require('dotenv').config();

// connect Mongo database
connectDB();

// --- FIX: enable layout BEFORE routes ---
app.use(expressLayouts);
app.set('layout', 'layout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES AFTER LAYOUT ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);

// error handlers...
