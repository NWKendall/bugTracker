const express = require("express");
const middleware = require("./middlewareConfig.js");

// routers import
const rolesRouter = require("./roles/router.js")
const usersRouter = require("./users/router.js");
const ticketsRouter = require("./tickets/router.js");
const categoriesRouter = require("./categories/router.js");
const notesRouter = require("./notes/router.js");

// apply middleware
const server = express();
middleware(server)

// routes utilization
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});
server.use("/api/roles", rolesRouter)
server.use("/api/users", usersRouter)
server.use("/api/tickets", ticketsRouter)
server.use("/api/categories", categoriesRouter)
server.use("/api/notes", notesRouter)

module.exports = server;
