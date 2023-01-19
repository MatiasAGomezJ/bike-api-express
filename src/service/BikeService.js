const DB = require("../repository/repository");
const Bike = require("../models/BikeModel");
const StockService = require("./StockService");

module.exports = {
    listBikes: async (filter) => {
        return await DB.list(Bike, filter);
    },
    getBikeById: async (bikeId) => {
        return await DB.getById(Bike, bikeId);
    },
    createBike: async (body) => {
        return await DB.create(Bike, body);
    },
    updateBike: async (bikeId, body) => {
        return await DB.update(Bike, bikeId, body);
    },
    deleteBike: async (bikeId) => {
        const removedBike = await DB.delete(Bike, bikeId);
        await StockService.deleteStockItems({ bikeId: bikeId });
        return removedBike;
    },
};
