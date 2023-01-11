const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BikeSchema = new Schema({
    msrp: { type: Number },
    spec_level: { type: String },
    category: { type: String },
    weight: { type: String },
    frame: { type: String },
    fork: { type: String },
    wheels: { type: String },
    wheel_size: { type: String },
    clearance: { type: String },
    brakes: { type: String },
    groupset: { type: String },
    drivetrain: { type: String },
    suspension: { type: String },
    front_travel: { type: String },
    seatpost: { type: String },
    store: { type: String },
});

module.exports = mongoose.model("Bike", BikeSchema);
