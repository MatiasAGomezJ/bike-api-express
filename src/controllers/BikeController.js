const BikeService = require("../service/BikeService");

async function listBikes(req, res) {
    const filter = req.query;

    try {
        const bikes = await BikeService.listBikes(filter);

        bikes ? res.status(200).send(bikes) : res.status(400).send({ msg: "Error al obtener las bicicletas" });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getBikeById(req, res) {
    const bikeId = req.params.id;
    try {
        const bike = await BikeService.getBikeById(bikeId);

        bike ? res.status(200).send(bike) : res.status(400).send({ msg: "Error al obtener la bicicleta" });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function createBike(req, res) {
    const body = req.body;

    try {
        const savedBike = await BikeService.createBike(body);

        savedBike ? res.status(201).send({ bike: savedBike }) : res.status(400).send({ msg: "No se ha guardado la bicicleta" });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateBike(req, res) {
    const bikeId = req.params.id;
    const body = req.body;

    try {
        const updatedBike = await BikeService.updateBike(bikeId, body);

        updatedBike ? res.status(200).send({ bike: updatedBike }) : res.status(400).send({ msg: "No se ha actualizado la bicicleta" });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteBike(req, res) {
    const bikeId = req.params.id;

    try {
        const deletedBike = await BikeService.deleteBike(bikeId);

        deletedBike ? res.status(200).send({ bike: deletedBike }) : res.status(400).send({ msg: "No se ha borrado la bicicleta" });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    listBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike,
};
