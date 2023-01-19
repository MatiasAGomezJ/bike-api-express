const StockService = require("../service/StockService");
const StoreService = require("../service/StoreService");

module.exports = {
    listStores: async (req, res) => {
        const filter = req.query;
        const stores = await StoreService.listStores(filter);
        stores ? res.status(200).send(stores) : res.status(400).send({ msg: "Error al obtener las tiendas" });
    },
    getStoreById: async (req, res) => {
        const storeId = req.params.id;
        const store = await StoreService.getStoreById(storeId);
        store ? res.status(200).send(store) : res.status(400).send({ msg: "Error al obtener la tienda" });
    },
    createStore: async (req, res) => {
        const body = req.body;
        const savedStore = await StoreService.createStore(body);
        savedStore ? res.status(201).send({ store: savedStore }) : res.status(400).send({ msg: "No se ha guardado la tienda" });
    },
    updateStore: async (req, res) => {
        const storeId = req.params.id;
        const body = req.body;
        const updatedStore = await StoreService.updateStore(storeId, body);
        updatedStore ? res.status(200).send({ store: updatedStore }) : res.status(400).send({ msg: "No se ha actualizado la tienda" });
    },
    deleteStore: async (req, res) => {
        const storeId = req.params.id;
        const deletedStore = await StoreService.deleteStore(storeId);
        deletedStore ? res.status(200).send({ store: deletedStore }) : res.status(400).send({ msg: "No se ha borrado la tienda" });
    },
};
