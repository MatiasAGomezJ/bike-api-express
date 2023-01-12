const Bike = require("../../models/BikeModel");

module.exports = {
    getBikes: async (filter) => {
        return await Bike.find();
    },
    getBikeById: async (bikeId) => {
        return await Bike.findById(bikeId);
    }
}

