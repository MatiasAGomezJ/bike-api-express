const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DispoSchema = new Schema({
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
    rentable: { type: Boolean, required: true },
});

module.exports = mongoose.model("Dispo", DispoSchema);
