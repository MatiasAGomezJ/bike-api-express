const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");
const db = require("../src/repository/initDB");
const testItems = require("../src/repository/mongoDB/testItems");
const testBikes = require("./testBike");

afterAll(() => {
    db.disconnect();
});

describe("GET tests", () => {
    test("GET all bikes", async () => {
        const response = await request(app).get("/api/bike");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.type).toMatch("json");
    });

    test("GET bike with params", async () => {
        const response = await request(app).get("/api/bike?category=B");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject(testItems.bikes[1]);
        expect(response.type).toMatch("json");
    });

    test("GET bike by id", async () => {
        const bikeId = testItems.bikes[0]._id.valueOf();
        const response = await request(app).get(`/api/bike/${bikeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(testItems.bikes[0]);
        expect(response.type).toMatch("json");
    });

    test("GET bike with invalid id", async () => {
        const response = await request(app).get("/api/bike/63c5ec25fcdeaf6e5dde991a");
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "Error al obtener la bicicleta" });
        expect(response.type).toMatch("json");
    });
});

describe("POST tests", () => {
    test("POST bike", async () => {
        const response = await request(app).get("/api/bike");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const response2 = await request(app).post("/api/bike").send(testBikes[0]);
        expect(response2.statusCode).toBe(201);
        expect(response2.body.bike).toMatchObject(testBikes[0]);
        expect(response2.type).toMatch("json");

        const response3 = await request(app).get("/api/bike");
        expect(response3.statusCode).toBe(200);
        expect(response3.body.length).toBe(itemCountBefore + 1);
        expect(response3.body).toMatchObject(expect.arrayContaining([expect.objectContaining(testBikes[0])]));
        expect(response3.type).toMatch("json");
    });

    // test("POST bike with invalid data", async () => {
    //     const response = await request(app).get("/api/bike");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.type).toMatch("json");
    //     const itemCountBefore = response.body.length;

    //     const response2 = await request(app).post("/api/bike").send({ name: "Bike 1", almería: "A"});
    //     expect(response2.statusCode).toBe(400);
    //     expect(response2.body).toMatchObject({ msg: "No se ha guardado la bicicleta" });
    //     expect(response2.type).toMatch("json");

    //     const response3 = await request(app).get("/api/bike");
    //     expect(response3.statusCode).toBe(200);
    //     expect(response3.body.length).toBe(itemCountBefore);
    //     expect(response3.type).toMatch("json");
    // });
});

describe("PUT tests", () => {
    test("PUT bike", async () => {
        const response = await request(app).get("/api/bike");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const bikeId = testItems.bikes[0]._id.valueOf();
        const response2 = await request(app).put(`/api/bike/${bikeId}`).send(testBikes[1]);
        expect(response2.statusCode).toBe(200);
        expect(response2.type).toMatch("json");

        const response3 = await request(app).get("/api/bike");
        expect(response3.statusCode).toBe(200);
        expect(response3.body.length).toBe(itemCountBefore);
        expect(response3.body).toMatchObject(expect.arrayContaining([expect.objectContaining(testBikes[1])]));
        expect(response3.type).toMatch("json");
    });

    test("PUT bike with invalid id", async () => {
        const response = await request(app).put("/api/bike/63c5ec25fcdeaf6e5dde991a").send(testBikes[1]);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "No se ha actualizado la bicicleta" });
        expect(response.type).toMatch("json");
    });
});

describe("DELETE tests", () => {
    test("DELETE bike", async () => {
        const response = await request(app).get("/api/bike");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const bikeId = testItems.bikes[0]._id.valueOf();
        const response2 = await request(app).delete(`/api/bike/${bikeId}`);
        expect(response2.statusCode).toBe(200);
        expect(response2.body.bike._id).toBe(bikeId);
        expect(response2.type).toMatch("json");

        const response3 = await request(app).get("/api/bike");
        expect(response3.statusCode).toBe(200);
        expect(response3.body.length).toBe(itemCountBefore - 1);
        expect(response3.type).toMatch("json");
    });

    test("DELETE bike with invalid id", async () => {
        const response = await request(app).delete("/api/bike/63c5ec25fcdeaf6e5dde991a");
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "No se ha borrado la bicicleta" });
        expect(response.type).toMatch("json");
    });
});