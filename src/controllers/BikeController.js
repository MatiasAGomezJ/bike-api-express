const BikeService = require("../service/BikeService");

module.exports = {
    listBikes: async (req, res) => {
        const filter = req.query;
        const bikes = await BikeService.listBikes(filter);
        bikes ? res.status(200).send(bikes) : res.status(400).send({ msg: "Error al obtener las bicicletas" });
    },
    getBikeById: async (req, res) => {
        const bikeId = req.params.id;
        const bike = await BikeService.getBikeById(bikeId);
        bike ? res.status(200).send(bike) : res.status(400).send({ msg: "Error al obtener la bicicleta" });
    },
    createBike: async (req, res) => {
        const body = req.body;
        const savedBike = await BikeService.createBike(body);
        savedBike ? res.status(201).send({ bike: savedBike }) : res.status(400).send({ msg: "No se ha guardado la bicicleta" });
    },
    updateBike: async (req, res) => {
        const bikeId = req.params.id;
        const body = req.body;
        const updatedBike = await BikeService.updateBike(bikeId, body);
        const bike = await BikeService.getBikeById(bikeId);
        updatedBike ? res.status(200).send({ bike: bike }) : res.status(400).send({ msg: "No se ha actualizado la bicicleta" });
    },
    deleteBike: async (req, res) => {
        const bikeId = req.params.id;
        const deletedBike = await BikeService.deleteBike(bikeId);
        deletedBike ? res.status(200).send({ bike: deletedBike }) : res.status(400).send({ msg: "No se ha borrado la bicicleta" });
    },
};
