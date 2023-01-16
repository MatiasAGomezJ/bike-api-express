var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var BikesRouter = require("./src/routes/BikeRouter");
var StoreRouter = require("./src/routes/StoreRouter");
var StockRouter = require("./src/routes/StockRouter");

var app = express();

require("./src/repository/initDB");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/bike", BikesRouter);
app.use("/api/store", StoreRouter);
app.use("/api/stock", StockRouter);

module.exports = app;
