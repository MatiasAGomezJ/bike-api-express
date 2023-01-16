const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DispoSchema = new Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model("Dispo", DispoSchema);
