var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var BikesRouter = require("./src/routes/BikeRouter");
var StoreRouter = require("./src/routes/StoreRouter");
var StockRouter = require("./src/routes/StockRouter");

var app = express();

var db = require("./src/repository/initDB");
db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/bike", BikesRouter);
app.use("/api/store", StoreRouter);
app.use("/api/stock", StockRouter);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/bikes", (req, res) => {
    res.sendFile(__dirname + "/public/bikes.html");
});


module.exports = app;
