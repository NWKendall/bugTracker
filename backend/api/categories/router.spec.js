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
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON formatted body", async function () {
      const res = await request(server).get("/api/categories");
      expect(res.type).toMatch(/json/);        
    });

    it("should return array of categories", async function () {
      const res = await request(server).get("/api/categories");
      expect(Array.isArray(res.body)).toBe(true);        
    });
  });
});
