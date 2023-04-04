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
    res.sendFile("/");
});
app.get("/bike", (req, res) => {
    res.sendFile("/bikes");
});
app.get("/bike/update", (req, res) => {
    res.sendFile(__dirname + "/public/bike/update.html");
});
app.get("/bike/create", (req, res) => {
    res.sendFile(__dirname + "/public/bike/create.html");
});
app.get("/bike/delete", (req, res) => {
    res.sendFile(__dirname + "/public/bike/delete.html");
});

app.get("/store", (req, res) => {
    res.sendFile("/stores");
});
app.get("/store/update", (req, res) => {
    res.sendFile(__dirname + "/public/store/update.html");
});
app.get("/store/create", (req, res) => {
    res.sendFile(__dirname + "/public/store/create.html");
});
app.get("/store/delete", (req, res) => {
    res.sendFile(__dirname + "/public/store/delete.html");
});

module.exports = app;
