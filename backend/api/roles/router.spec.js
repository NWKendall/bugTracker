const request = require("supertest");

const server = require("../server.js");

describe("Roles Test", function () {
  it("should run tests", function () {
    expect(true).toBe(true);
  });

  describe("GET /", function () {
    it("should return status 200 OK", function () {
      return request(server)
        .get("/api/roles")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return roles as the router value", function () {
      return request(server)
        .get("/api/roles")
        .then((res) => {
          expect(res.body.router).toBe("roles");
        });
    });
  });
});
