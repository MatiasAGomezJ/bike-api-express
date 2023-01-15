const Bike = require("../../models/BikeModel");

function mapInto(model, body) {
    const modelItem = new model();

    for (const item in body) {
        modelItem[item] = body[item];
    }

    return modelItem;
}

module.exports = {
    listBikes: async (filter) => {
        return await Bike.find().where(filter);
    },
    getBikeById: async (bikeId) => {
        return await Bike.findById(bikeId);
    },
    createBike: async (body) => {
        bike = mapInto(Bike, body);
        return await bike.save();
    },
    updateBike: async (bikeId, body) => {
        return await Bike.findByIdAndUpdate(bikeId, body);
    },
    deleteBike: async (bikeId) => {
        return await Bike.findByIdAndDelete(bikeId);
    },
};
