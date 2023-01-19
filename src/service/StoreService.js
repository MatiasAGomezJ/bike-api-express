const DB = require("../repository/repository");
const Store = require("../models/StoreModel");
const StockService = require("./StockService");

module.exports = {
    listStores: async (filter) => {
        return await DB.list(Store, filter);
    },
    getStoreById: async (storeId) => {
        return await DB.getById(Store, storeId);
    },
    createStore: async (body) => {
        return await DB.create(Store, body);
    },
    updateStore: async (storeId, body) => {
        return await DB.update(Store, storeId, body);
    },
    deleteStore: async (storeId) => {
        const removedStore = await DB.delete(Store, storeId);
        await StockService.deleteStockItems({ storeId: storeId });
        return removedStore
    },
};
