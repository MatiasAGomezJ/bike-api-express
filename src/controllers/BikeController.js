const Bike = require("../models/BikeModel");
const BikeService = require("../service/BikeService");

async function listBikes(req, res) {
    const filter = req.query;

    try {
        const bikes = await BikeService.listBikes(filter);

        if (!bikes) {
            res.status(400).send({ msg: "Error al obtener las bicicletas" });
        } else {
            res.status(200).send(bikes);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getBikeById(req, res) {
    const bikeId = req.params.id;
    try {
        const bike = await BikeService.getBikeById(bikeId);

        if (!bike) {
            res.status(400).send({ msg: "Error al obtener la bicicleta" });
        } else {
            res.status(200).send(bike);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function createBike(req, res) {
    const body = req.body;

    bike = mapIntoBike(body);

    try {
        const savedBike = await BikeService.createBike(bike);

        if (!savedBike) {
            res.status(400).send({ msg: "No se ha guardado la bicicleta" });
        } else {
            res.status(201).send({ bike: savedBike });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateBike(req, res) {
    const bikeId = req.params.id;

    const body = req.body;

    try {
        const updatedBike = await BikeService.updateBike(bikeId, body);

        if (!updatedBike) {
            res.status(400).send({ msg: "No se ha actualizado la bicicleta" });
        } else {
            res.status(200).send({ bike: updatedBike });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteBike(req, res) {
    const bikeId = req.params.id;

    try {
        const deletedBike = await BikeService.deleteBike(bikeId);

        if (!deletedBike) {
            res.status(400).send({ msg: "No se ha borrado la bicicleta" });
        } else {
            res.status(200).send({ bike: deletedBike });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

function mapIntoBike(body) {
    const bike = new Bike();

    for (const item in body) {
        bike[item] = body[item];
    }

    return bike;
}

module.exports = {
    listBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike,
};
