const Bike = require("../../models/BikeModel");

module.exports = {
    getBikes: async (filter) => {
        return await Bike.find().where(filter);
    },
    getBikeById: async (bikeId) => {
        return await Bike.findById(bikeId);
    },
    createBike: async (bike) => {
        return await bike.save();
    },
    updateBike: async (bikeId, body) => {
        return await Bike.findByIdAndUpdate(bikeId, body);
    },
    deleteBike: async (bikeId) => {
        await Bike.findByIdAndDelete(bikeId);
    },
};
