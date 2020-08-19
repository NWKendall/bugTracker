const express = require("express");
const globalMiddlewareConfig = require("./middleware/middlewareConfig.js");
const authorizedMW = require("./middleware/authorized.mw.js");

// routers import
const apiRouter = require("./api.router.js");
const authRouter = require("./auth/auth.router.js");

// apply middleware
const server = express();
globalMiddlewareConfig(server)

// routes utilization
server.use("/api/auth", authRouter);
server.use("/api", authorizedMW, apiRouter)

module.exports = server;
