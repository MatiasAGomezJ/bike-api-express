const DB = require("../repository/repository");
const Stock = require("../models/StockModel");
const Bike = require("../models/BikeModel");
const Store = require("../models/StoreModel");

async function myPopulate(items) {
    if (!Array.isArray(items))
        items = [items];    
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.bikeId = await DB.getById(Bike, item.bikeId);
        item.storeId = await DB.getById(Store, item.storeId);
    }
    return items;
}

module.exports = {
    listStock: async (filter) => {
        return await myPopulate(await DB.list(Stock, filter));
    },
    getStockItemById: async (stockId) => {
        return await myPopulate(await DB.getById(Stock, stockId));
    },
    createStockItem: async (body) => {
        return await myPopulate(await DB.create(Stock, body));
    },
    updateStockItem: async (stockId, body) => {
        return await myPopulate(await DB.update(Stock, stockId, body));
    },
    deleteStockItem: async (stockId) => {
        return await myPopulate(await DB.delete(Stock, stockId));
    },
    deleteStockItems: async (filter) => {
        return await myPopulate(await DB.deleteMany(Stock, filter));
    }
};
