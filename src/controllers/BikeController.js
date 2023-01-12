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

async function createBike(req, res) {
    const body = req.body;

    bike = mapIntoBike(body);

    try {
        const savedBike = await bike.save();

        if (!savedBike) {
            res.status(400).send({ msg: "No se ha guardado la bicicleta" });
        } else {
            res.status(201).send({ bike: savedBike });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    listBikes,
    createBike,
};
