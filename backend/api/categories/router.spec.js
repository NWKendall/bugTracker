const request = require("supertest");

const server = require("../server.js");

describe("Categories Test", function () {
  it("should run tests", function () {
    expect(true).toBe(true);
  });

  describe("GET /", function () {
    it("should return status 200 OK", function () {
      return request(server)
        .get("/api/categories")
        .then((r) => {
          expect(r.status).toBe(200);
        });
    });

    it("should return array of categories", function () {
      return request(server)
        .get("/api/categories")
        .then((r) => {
          expect(Array.isArray(r)).toBe(true);
        });
    });
  });
});
