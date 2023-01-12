const { expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
// require("../src/repository/poblate");

test("POST /api/bike", async () => {
    const response = await request(app).get("/api/bike").send();
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toContain("application/json");
    expect(response.body.id).toBeDefined();
});

// test("responds with json", async () => {
//     request(app).get("/user").set("Accept", "application/json").expect("Content-Type", /json/).expect(200);
// });
