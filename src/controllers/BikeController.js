const Bike = require("../models/BikeModel");

async function listBikes(req, res) {
    const filter = req.query;

    try {
        const bikes = await Bike.find().where(filter);

        if (!bikes) {
            res.status(400).send({ msg: "Error al obtener las bicicletas" });
        } else {
            res.status(200).send(bikes);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    listBikes,
};
