const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
});

StoreSchema.set("validateBeforeSave", true);
module.exports = mongoose.model("Store", StoreSchema);
