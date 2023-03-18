var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
const { db } = require("./config/database");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const dburi = process.env.MONGODB_URI;
var cors = require("cors");

const middleware = require("./middleware");
const todosRouter = require("./routes/todos");
const moviesRouter = require("./routes/movies");
const castsRouter = require("./routes/casts");
const usersRouter = require("./routes/users");

var app = express();
app.use(cors());
//connecting to mongodb database
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

//connecting to mongodb atlas

mongoose
  .connect(dburi)
  .then((result) => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

//writing middleware
app.use(middleware.requestTime);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/todos", todosRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/casts", castsRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
