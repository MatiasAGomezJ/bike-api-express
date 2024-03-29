const Bike = require("../../models/BikeModel");
const Store = require("../../models/StoreModel");
const Stock = require("../../models/StockModel");
const items = require("./items");

async function populate() {
    await Bike.collection.drop();
    await Bike.insertMany(items.bikes);
    console.log("Bikes pupolated");
    await Store.collection.drop();
    await Store.insertMany(items.stores);
    console.log("Stores pupolated");
    await Stock.collection.drop();
    await Stock.insertMany(items.stock);
    console.log("Stock pupolated");
}

module.exports = {
    populate: populate,
};
