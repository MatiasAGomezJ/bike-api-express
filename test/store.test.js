const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");
const db = require("../src/repository/initDB");
const Polutator = require("../src/repository/populate");
const items = require("../src/repository/mongoDB/items");
const testStores = require("./testStores");

beforeAll(async () => {
    await db.connect();
    await Polutator.populate();
}, 10000);

afterAll(async () => {
    await db.disconnect();
});

describe("GET tests", () => {
    test("GET all stores", async () => {
        const response = await request(app).get("/api/store");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.type).toMatch("json");
    });

    test("GET store with params", async () => {
        const response = await request(app).get("/api/store?name=Anacardo%20Street");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject(items.stores[0]);
    });

    test("GET store by id", async () => {
        const storeId = items.stores[0]._id.valueOf();
        const response = await request(app).get(`/api/store/${storeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(items.stores[0]);
    });

    test("GET store with invalid id", async () => {
        const response = await request(app).get("/api/store/63c5ec25fcdeaf6e5dde991c");
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "Error al obtener la tienda" });
    });
});

describe("POST tests", () => {
    test("POST store", async () => {
        const response = await request(app).get("/api/store");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const response2 = await request(app).post("/api/store").send(testStores[0]);
        expect(response2.statusCode).toBe(201);
        expect(response2.body.store).toMatchObject(testStores[0]);

        const response3 = await request(app).get("/api/store");
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toMatchObject(expect.arrayContaining([expect.objectContaining(testStores[0])]));
        expect(response3.body.length).toBe(itemCountBefore + 1);
    });

    test("POST store with invalid body", async () => {
        const response = await request(app).get("/api/store");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemCountBefore = response.body.length;

        const response2 = await request(app).post("/api/store").send({ cangrejo: 14 });
        expect(response2.statusCode).toBe(400);
        expect(response2.body).toMatchObject({ msg: "No se ha guardado la tienda" });

        const response3 = await request(app).get("/api/store");
        expect(response3.statusCode).toBe(200);
        expect(response3.type).toMatch("json");
        expect(response3.body.length).toBe(itemCountBefore);
    });
});

describe("PUT tests", () => {
    test("PUT store", async () => {
        const storeId = items.stores[0]._id.valueOf();
        const response = await request(app).get(`/api/store/${storeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemBefore = response.body;

        const response2 = await request(app).put(`/api/store/${storeId}`).send(testStores[1]);
        expect(response2.statusCode).toBe(200);
        expect(response2.body.store).toMatchObject(testStores[1]);

        const response3 = await request(app).get(`/api/store/${storeId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).not.toMatchObject(itemBefore);
    });

    test("PUT store with invalid id", async () => {
        const response = await request(app).put("/api/store/63c5ec25fcdeaf6e5dde991c").send(testStores[1]);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "No se ha actualizado la tienda" });
    });

    test("PUT store with invalid body", async () => {
        const storeId = items.stores[0]._id.valueOf();
        const response = await request(app).get(`/api/store/${storeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const itemBefore = response.body;

        const response2 = await request(app).put(`/api/store/${storeId}`).send({ salamandra: 25 });
        expect(response2.statusCode).toBe(400);
        expect(response2.body).toMatchObject({ msg: "No se ha actualizado la tienda" });

        const response3 = await request(app).get(`/api/store/${storeId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toMatchObject(itemBefore);
    });
});

describe("DELETE tests", () => {
    test("DELETE store", async () => {
        const response = await request(app).get("/api/store/");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch("json");
        const storeCountBefore = response.body.length;

        const response2 = await request(app).get("/api/stock/");
        expect(response2.statusCode).toBe(200);
        expect(response2.type).toMatch("json");
        const stockItemsCountBefore = response.body.length;

        const storeId = items.stores[0]._id.valueOf();
        const response3 = await request(app).delete(`/api/store/${storeId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body.store._id).toBe(storeId);

        const response4 = await request(app).get("/api/store");
        expect(response4.statusCode).toBe(200);
        expect(response4.body.length).toBe(storeCountBefore - 1);
        expect(response4.type).toMatch("json");
        
        const response5 = await request(app).get("/api/stock/");
        expect(response5.statusCode).toBe(200);
        expect(response5.type).toMatch("json");
        expect(response5.body.length).toBeLessThan(stockItemsCountBefore);
    });

    test("DELETE store with invalid id", async () => {
        const response = await request(app).delete("/api/store/63c5ec25fcdeaf6e5dde991c");
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({ msg: "No se ha borrado la tienda" });
    });
});
