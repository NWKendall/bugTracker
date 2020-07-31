const express = require("express");
const middleware = require("./middlewareConfig.js");

// routers import
const rolesRouter = require("./roles/router.js")
const usersRouter = require("./users/router.js");
const ticketsRouter = require("./tickets/router.js");
const categoriesRouter = require("./categories/router.js");
const notesRouter = require("./notes/router.js");

// middleware
const server = express();
middleware(server)

// routes utilization
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});
server.use("/roles", rolesRouter)
server.use("/users", usersRouter)
server.use("/tickets", ticketsRouter)
server.use("/categories", categoriesRouter)
server.use("/notes", notesRouter)

module.exports = server;
