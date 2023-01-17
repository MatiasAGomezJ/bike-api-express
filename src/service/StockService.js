const DB = require("../repository/repository");
const Stock = require("../models/StockModel");

module.exports = {
    listStock: async (filter) => {
        return await DB.list(Stock, filter);
    },
    getStockItemById: async (stockId) => {
        return await DB.getById(Stock, stockId);
    },
    createStockItem: async (body) => {
        return await DB.create(Stock, body);
    },
    updateStockItem: async (stockId, body) => {
        return await DB.update(Stock, stockId, body);
    },
    deleteStockItem: async (stockId) => {
        return await DB.delete(Stock, stockId);
    },
    deleteStockItems: async (filter) => {
        return await DB.deleteMany(Stock, filter);
    }
};
