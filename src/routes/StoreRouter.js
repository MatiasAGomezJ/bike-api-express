var express = require("express");
var router = express.Router();

const StoreController = require("../controllers/StoreController");

router.get("/", StoreController.listStores);
router.get("/:id", StoreController.getStoreById);
router.post("/", StoreController.createStore);
router.put("/:id", StoreController.updateStore);
router.delete("/:id", StoreController.deleteStore);

module.exports = router;
