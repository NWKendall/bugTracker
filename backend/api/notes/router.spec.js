const request = require("supertest");

const server = require("../server.js");
const { expectCt } = require("helmet");

describe("Notes Test", function () {
  it("should run tests", function () {
    expect(true).toBe(true);
  });

  describe("GET /", function () {
    it("should return status 200 OK", function () {
      return request(server)
        .get("/api/notes")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return notes as the router value", async function () {
      const res = await request(server).get("/api/notes");
      expect(res.body.router).toBe("notes");
      expect(res.type).toMatch(/json/)
    });
  });
});
