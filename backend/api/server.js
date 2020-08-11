const express = require("express");
const middleware = require("./middlewareConfig.js");
const authorizedMW = require("./auth/authorize.mw.js");

// routers import
const apiRouter = require("./api.router.js");
const authRouter = require("./auth/auth.router.js");

// apply middleware
const server = express();
middleware(server)

// routes utilization
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});
server.use("/api/auth", authRouter);
server.use("/api", authorizedMW, apiRouter)


module.exports = server;
