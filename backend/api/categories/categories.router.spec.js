const db = require("../../database/connection.js");
const request = require("supertest");
const server = require("../server.js");

describe("Categories Test", function () {

  // beforeAll(async () => {
  //   await db("categories").del();
  // });

  describe("GET /", () => {

    it("should return status 200 OK", () => {
      return request(server)
        .get("/api/categories")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON formatted body", async () => {
      const res = await request(server).get("/api/categories");
      expect(res.type).toMatch(/json/);
    });

    it("should return array of categories", async () => {
      const res = await request(server).get("/api/categories");
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("Checks for amount of entries in categories database before POST", async function () {
      const testDB = await db("categories");

      await expect(testDB).toHaveLength(0);
    });

  });

  // POST
  let postId;

  describe("POST / ", () => {

    const testPost = { category_name: "Test1" };
    it("Should successfully return status 201 OK", async () => {
      const statusCode = 201;
      const response = await request(server)
        .post("/api/categories")
        .send(testPost);
        postId = await response.body.id

      await expect(response.status).toEqual(statusCode);
    });

    it("Checks for amount of entries in categories database", async function () {
      const testDB = await db("categories");

      await expect(testDB).toHaveLength(1);
    });

  });

  // PUT & GET/:id
  describe("PUT / ", () => {
    const testPut = { category_name: "UPDATED" };

    it("Should successfully return status 204 OK", async () => {
      const statusCode = 204;
      const response = await request(server)
        .put(`/api/categories/${postId}`)
        .send(testPut);

      await expect(response.status).toEqual(statusCode);
    });

    it("Checks updated category_name of PUT request", async () => {
      const response = await request(server).get(`/api/categories/${postId}`);
      await expect(response.body.category_name).toBe(testPut.category_name);
    });

    it("Checks for amount of entries in categories database after updating", async function () {
      const testDB = await db("categories");
      await expect(testDB).toHaveLength(1);
    });

  });
  // DELETE
  describe("DEL / ", () => {

    it("Should successfully return status 200 OK", async () => {
      const statusCode = 200;
      const response = await request(server)
        .delete(`/api/categories/${postId}`)

      await expect(response.status).toEqual(statusCode);
    });

    it("Checks amount of entries is 0 in categories database after deleting", async function () {
      const testDB = await db("categories");
      await expect(testDB).toHaveLength(0);
    });

  });


});
