const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");
const db = require("../src/repository/initDB");
const Polutator = require("../src/repository/populate");
const items = require("../src/repository/mongoDB/items");
const testBikes = require("./testBikes");

beforeAll(async () => {
    await db.connect();
    await Polutator.populate();
}, 10000);

afterAll(async () => {
    await db.disconnect();
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
        expect(response.body[0]).toMatchObject(items.bikes[1]);
    });

    test("GET bike by id", async () => {
        const bikeId = items.bikes[0]._id.valueOf();
        const response = await request(app).get(`/api/bike/${bikeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(items.bikes[0]);
    });

    test("GET bike with invalid id", async () => {
        const response = await request(app).get("/api/bike/63c5ec25fcdeaf6e5dde991a");
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "Error al obtener la bicicleta" });
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

        const response3 = await request(app).get("/api/bike");
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toMatchObject(expect.arrayContaining([expect.objectContaining(testBikes[0])]));
        expect(response3.body.length).toBe(itemCountBefore + 1);
    });

    test("POST bike with invalid data", async () => {
        const response = await request(app).get("/api/bike");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const response2 = await request(app).post("/api/bike").send({ name: "Bike 1", almería: "A" });
        expect(response2.statusCode).toBe(400);
        expect(response2.body).toMatchObject({ msg: "No se ha guardado la bicicleta" });

        const response3 = await request(app).get("/api/bike");
        expect(response3.statusCode).toBe(200);
        expect(response3.type).toMatch("json");
        expect(response3.body.length).toBe(itemCountBefore);
    });
});

describe("PUT tests", () => {
    test("PUT bike", async () => {
        const bikeId = items.bikes[0]._id.valueOf();
        const response = await request(app).get(`/api/bike/${bikeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemBefore = response.body;

        const response2 = await request(app).put(`/api/bike/${bikeId}`).send(testBikes[1]);
        expect(response2.statusCode).toBe(200);
        expect(response2.body.bike).toMatchObject(testBikes[1]);

        const response3 = await request(app).get(`/api/bike/${bikeId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).not.toMatchObject(itemBefore);
    });

    test("PUT bike with invalid id", async () => {
        const response = await request(app).put("/api/bike/63c5ec25fcdeaf6e5dde991a").send(testBikes[1]);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "No se ha actualizado la bicicleta" });
    });

    test("PUT bike with invalid body", async () => {
        const bikeId = items.bikes[0]._id.valueOf();
        const response = await request(app).get(`/api/bike/${bikeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemBefore = response.body;

        const response2 = await request(app).put(`/api/bike/${bikeId}`).send({ camion: false, quien: "yo" });
        expect(response2.statusCode).toBe(400);
        expect(response2.body).toMatchObject({ msg: "No se ha actualizado la bicicleta" });

        const response3 = await request(app).get(`/api/bike/${bikeId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toMatchObject(itemBefore);
    });
});

describe("DELETE tests", () => {
    test("DELETE bike", async () => {
        const response = await request(app).get("/api/bike");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const response2 = await request(app).get("/api/stock/");
        expect(response2.statusCode).toBe(200);
        expect(response2.type).toMatch("json");
        const stockItemsCountBefore = response.body.length;
        
        const bikeId = items.bikes[0]._id.valueOf();
        const response3 = await request(app).delete(`/api/bike/${bikeId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body.bike._id).toBe(bikeId);

        const response4 = await request(app).get("/api/bike");
        expect(response4.statusCode).toBe(200);
        expect(response4.body.length).toBe(itemCountBefore - 1);
        expect(response4.type).toMatch("json");

        const response5 = await request(app).get("/api/stock/");
        expect(response5.statusCode).toBe(200);
        expect(response5.type).toMatch("json");
        expect(response5.body.length).toBeLessThan(stockItemsCountBefore);
    });

    test("DELETE bike with invalid id", async () => {
        const response = await request(app).delete("/api/bike/63c5ec25fcdeaf6e5dde991a");
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "No se ha borrado la bicicleta" });
    });
});
