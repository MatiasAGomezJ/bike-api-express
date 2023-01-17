const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BikeSchema = new Schema({
    msrp: { type: Number, required: true },
    spec_level: { type: String, required: true },
    category: { type: String, required: true },
    weight: { type: String, required: true },
    frame: { type: String, required: true },
    fork: { type: String, required: true },
    wheels: { type: String, required: true },
    wheel_size: { type: String, required: true },
    clearance: { type: String, required: true },
    brakes: { type: String, required: true },
    groupset: { type: String, required: true },
    drivetrain: { type: String, required: true },
    suspension: { type: String, required: true },
    front_travel: { type: String, required: true },
    seatpost: { type: String, required: true },
});

module.exports = mongoose.model("Bike", BikeSchema);
