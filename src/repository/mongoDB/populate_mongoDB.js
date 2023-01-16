const db = require("../initDB");
db.connect();

const Bike = require("../../models/BikeModel");
const Store = require("../../models/StoreModel");
const Stock = require("../../models/StockModel");
const testItems = require("./testItems");

(async () => {
    await Bike.collection.drop();
    await Bike.insertMany(testItems.bikes);
    console.log("Bikes pupolated");
    await Store.collection.drop();
    await Store.insertMany(testItems.stores);
    console.log("Stores pupolated");
    await Stock.collection.drop();
    await Stock.insertMany(testItems.stock);
    console.log("Stock pupolated");
    db.disconnect();
})();
