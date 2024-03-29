const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StockSchema = new Schema({
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
    rentable: { type: Boolean, required: true },
});

StockSchema.set("validateBeforeSave", true);
module.exports = mongoose.model("Stock", StockSchema);
