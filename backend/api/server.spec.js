require("dotenv").config();

describe("Server", function() {
    describe("Environment", function() {
        it("should be using testing environment", function() {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });
});