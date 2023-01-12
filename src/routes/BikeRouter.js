var express = require("express");
var router = express.Router();

const BikeController = require("../controllers/BikeController");

router.get("/", BikeController.listBikes);
router.get("/:id", BikeController.getBikeById);
router.post("/", BikeController.createBike);
router.put("/:id", BikeController.updateBike);
router.delete("/:id", BikeController.deleteBike);

module.exports = router;
