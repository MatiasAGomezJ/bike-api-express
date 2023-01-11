var express = require("express");
var router = express.Router();

const BikeController = require("../controllers/BikeController");

router.get("/", BikeController.listBikes);

module.exports = router;
