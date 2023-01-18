const mongoose = require("mongoose");

ids = {
    bikeId1: mongoose.Types.ObjectId("63c5ec25fcdeaf6e5dde9918"),
    bikeId2: mongoose.Types.ObjectId("63c5ec25fcdeaf6e5dde9919"),
    storeId1: mongoose.Types.ObjectId("63c5ec25fcdeaf6e5dde991a"),
    storeId2: mongoose.Types.ObjectId("63c5ec25fcdeaf6e5dde991b"),
};

module.exports = {
    bikes: [
        {
            _id: ids.bikeId1,
            msrp: 6999,
            spec_level: "High-End",
            category: "Jamaicana",
            weight: "18.2 lbs",
            frame: "Carbon",
            fork: "Carbon",
            wheels: "Carbon",
            wheel_size: "700c",
            clearance: "28c",
            brakes: "Hydraulic Disc",
            groupset: "Ultegra Di2",
            drivetrain: "2 x 12 Electronic",
            suspension: "Rigid",
            front_travel: "-",
            seatpost: "Rigid",
        },
        {
            _id: ids.bikeId2,
            msrp: 20,
            spec_level: "A",
            category: "B",
            weight: "C",
            frame: "D",
            fork: "E",
            wheels: "F",
            wheel_size: "G",
            clearance: "H",
            brakes: "I",
            groupset: "J",
            drivetrain: "K",
            suspension: "L",
            front_travel: "M",
            seatpost: "N",
        },
    ],
    stores: [
        {
            _id: ids.storeId1,
            name: "Anacardo Street",
        },
        {
            _id: ids.storeId2,
            name: "Osmosis Bikes",
        },
    ],
    stock: [
        {
            storeId: ids.storeId1,
            bikeId: ids.bikeId1,
            rentable: true,
        },
        {
            storeId: ids.storeId2,
            bikeId: ids.bikeId2,
            rentable: false,
        },
    ],
};
