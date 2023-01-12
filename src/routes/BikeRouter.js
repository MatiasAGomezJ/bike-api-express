var express = require("express");
var router = express.Router();

const BikeController = require("../controllers/BikeController");

router.get("/", BikeController.listBikes);
router.get("/:id", BikeController.getBikeById);
router.post("/", BikeController.createBike);

module.exports = router;
