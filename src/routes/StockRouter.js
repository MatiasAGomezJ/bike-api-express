var express = require("express");
var router = express.Router();

const StockController = require("../controllers/StockController");

router.get("/", StockController.listStock);
router.get("/:id", StockController.getStockItemById);
router.post("/", StockController.createStockItem);
router.put("/:id", StockController.updateStockItem);
router.delete("/:id", StockController.deleteStockItem);

module.exports = router;
