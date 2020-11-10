const assert = require("chai").assert;
const request = require("supertest");

const app = require("../index");
const agent = request.agent(app);

before((done) => {
  app.on("serverReady", () => {
    done();
  });
});

describe("Test movie routes: /movie", () => {
  const baseRoute = "/movie";
  describe("GET /", () => {
    it("It responds with JSON", (done) => {
      request(app)
        .get(baseRoute)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done());
    });
  });
});
