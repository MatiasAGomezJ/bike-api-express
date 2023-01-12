var mongoose = require("mongoose");

var mongoDB = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@sandbox.glkvp.mongodb.net/bike-app-${process.env.NODE_ENV}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
