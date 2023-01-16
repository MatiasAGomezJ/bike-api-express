const DB = require("../repository/repository");
const Store = require("../models/StoreModel");

module.exports = {
    listStore: async (filter) => {
        return await DB.list(Store, filter);
    },
    getStoreById: async (bikeId) => {
        return await DB.storeById(Store, bikeId);
    },
    createStore: async (body) => {
        return await DB.create(Store, body);
    },
    updateStore: async (bikeId, body) => {
        return await DB.update(Store, bikeId, body);
    },
    deleteStore: async (bikeId) => {
        return await DB.delete(Store, bikeId);
    },
};
