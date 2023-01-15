const Bike = require("../../models/BikeModel");

function mapIntoBike(body) {
    const bike = new Bike();

    for (const item in body) {
        bike[item] = body[item];
    }

    return bike;
}

module.exports = {
    getBikes: async (filter) => {
        return await Bike.find().where(filter);
    },
    getBikeById: async (bikeId) => {
        return await Bike.findById(bikeId);
    },
    createBike: async (body) => {
        bike = mapIntoBike(body);
        return await bike.save();
    },
    updateBike: async (bikeId, body) => {
        return await Bike.findByIdAndUpdate(bikeId, body);
    },
    deleteBike: async (bikeId) => {
        return await Bike.findByIdAndDelete(bikeId);
    },
};
