const { expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
// require("../src/repository/poblate");
const testBike = require("./testBike");

test("POST /api/bike", () => {
    // const response = await request(app).post("/api/bike").body(testBike).send();
    // expect(response.statusCode).toBe(201);
    // expect(response.header["content-type"]).toContain("application/json");
    // console.log(response.body);

    request(app)
        .post("/api/bike")
        .expect("content-type", "/json/")
        .expect("status", 200);
});

// test("responds with json", async () => {
//     request(app).get("/user").set("Accept", "application/json").expect("Content-Type", /json/).expect(200);
// });
