const StockService = require("../service/StockService");

module.exports = {
    listStock: async (req, res) => {
        const filter = req.query;
        const stores = await StockService.listStock(filter);
        stores ? res.status(200).send(stores) : res.status(400).send({ msg: "Error al obtener las bicicletas" });
    },
    getStockItemById: async (req, res) => {
        const bikeId = req.params.id;
        const store = await StockService.getStockItemById(bikeId);
        store ? res.status(200).send(store) : res.status(400).send({ msg: "Error al obtener la bicicleta" });
    },
    createStockItem: async (req, res) => {
        const body = req.body;
        const savedStock = await StockService.createStockItem(body);
        savedStock ? res.status(201).send({ store: savedStock }) : res.status(400).send({ msg: "No se ha guardado la bicicleta" });
    },
    updateStockItem: async (req, res) => {
        const bikeId = req.params.id;
        const body = req.body;
        const updatedStock = await StockService.updateStockItem(bikeId, body);
        updatedStock ? res.status(200).send({ store: updatedStock }) : res.status(400).send({ msg: "No se ha actualizado la bicicleta" });
    },
    deleteStockItem: async (req, res) => {
        const bikeId = req.params.id;
        const deletedStock = await StockService.deleteStockItem(bikeId);
        deletedStock ? res.status(200).send({ store: deletedStock }) : res.status(400).send({ msg: "No se ha borrado la bicicleta" });
    },
};
