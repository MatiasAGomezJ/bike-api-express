const DB = require("../repository/repository");

module.exports = {
    listBikes: async (filter) => {
        return await DB.getBikes(filter);
    },
    getBikeById: async (bikeId) => {
        return await DB.getBikeById(bikeId);
    },
    createBike: async (body) => {
        return await DB.createBike(body);
    },
    updateBike: async (bikeId, body) => {
        return await DB.updateBike(bikeId, body)
    },
    deleteBike: async (bikeId) => {
        return await DB.deleteBike(bikeId);
    }
}