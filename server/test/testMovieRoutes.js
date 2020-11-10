const assert = require("chai").assert;
const expect = require("chai").expect;
const request = require("supertest");

const app = require("../index");

before(function (done) {
  this.timeout(5000);
  app.on("serverReady", function () {
    console.log("Tests will now run" + "\n");
    done();
  });
});

describe("Route tests: '/movie'", function () {
  this.timeout(5000);
  const baseRoute = "/movie";
  describe("GET: '/'", () => {
    it("It responds with JSON", function (done) {
      request(app)
        .get(baseRoute)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done());
    });

    it("There is a field called movies", function (done) {
      request(app)
        .get(baseRoute)
        .set("Accept", "application/json")
        .then((response) => {
          expect(response.body).to.have.property("movies");
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    it("There are exactly twelve movies", function (done) {
      request(app)
        .get(baseRoute)
        .set("Accept", "application/json")
        .then((response) => {
          assert.lengthOf(response.body.movies, 12);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    describe("With parameters", function () {
      let paramsObject = {};

      beforeEach(function () {
        paramsObject = { q: "The", page: 1 };
      });

      it("Title contains 'the' when the query is 'the'", function (done) {
        request(app)
          .get(baseRoute)
          .query(paramsObject)
          .set("Accept", "application/json")
          .then((response) => {
            expect(response.body.movies[0].title.toLowerCase()).to.contain(
              "the"
            );
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("Returns page 2 when the query is specifies page 2", function (done) {
        paramsObject.page = 2;
        request(app)
          .get(baseRoute)
          .query(paramsObject)
          .set("Accept", "application/json")
          .then((response) => {
            expect(response.body.currentPage).to.equal(2);
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
    });
  });
});
