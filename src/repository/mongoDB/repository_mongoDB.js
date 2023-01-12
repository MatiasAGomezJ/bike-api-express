const Bike = require("../../models/BikeModel");

module.exports = {
    findAll: async (filter) => {
        return await Bike.find();
    }
}

