var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var transactionsRouter = require("./routes/transactions");

var app = express();

// Load environment variables
require("dotenv").config();

// Connect MongoDB
const connectDB = require("./config/db");
connectDB();

/* -------------------------------------------------
   SESSION + PASSPORT SETUP
---------------------------------------------------*/
const session = require("express-session");
const passport = require("passport");      // <-- IMPORTANT
require("./config/passport");              // <-- Loads strategies

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
   AUTH ROUTES
---------------------------------------------------*/
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

/* -------------------------------------------------
   Protect CRUD actions (POST/PUT/PATCH/DELETE)
---------------------------------------------------*/
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/login");
}

/* -------------------------------------------------
   EXPRESS LAYOUTS
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
   ROUTES
---------------------------------------------------*/
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Protect only the modifying requests in /transactions
app.use(
  "/transactions",
  (req, res, next) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      return ensureAuth(req, res, next);
    }
    next();
  },
  transactionsRouter
);

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

/* -------------------------------------------------
   ERROR HANDLING
---------------------------------------------------*/
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
