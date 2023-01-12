const Bike = require("../../models/BikeModel");
const bikes = require("./testBikes");

async function populate() {
    await Bike.collection.drop();
    await Bike.insertMany(
        {
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
            store: "trekbikes.com",
        },
        {
            msrp: 20,
            spec_level: "A",
            category: "B",
            weight: "C",
            fork: "D",
            wheels: "E",
            wheel_size: "F",
            clearance: "G",
            brakes: "H",
            groupset: "I",
            drivetrain: "J",
            suspension: "K",
            front_travel: "L",
            seatpost: "M",
            store: "N",
        }
    );
}

populate();
