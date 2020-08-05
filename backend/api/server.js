const express = require("express");
const middleware = require("./middlewareConfig.js");

// routers import
const authRouter = require("./auth/auth.router.js");
const rolesRouter = require("./roles/roles.router.js")
const usersRouter = require("./users/users.router.js");
const ticketsRouter = require("./tickets/tickets.router.js");
const categoriesRouter = require("./categories/categories.router.js");
const notesRouter = require("./notes/notes.router.js");

// apply middleware
const server = express();
middleware(server)

// routes utilization
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});
server.use("/api/auth", authRouter);
server.use("/api/roles", rolesRouter);
server.use("/api/users", usersRouter);
server.use("/api/tickets", ticketsRouter);
server.use("/api/categories", categoriesRouter);
server.use("/api/notes", notesRouter);

module.exports = server;
