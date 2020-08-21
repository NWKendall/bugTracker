const router = require("express").Router()

const usersRouter = require("./users/users.router.js");
const rolesRouter = require("./roles/roles.router.js")
const ticketsRouter = require("./tickets/tickets.router.js");
const categoriesRouter = require("./categories/categories.router.js");
const notesRouter = require("./notes/notes.router.js");



router.use("/roles", rolesRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/", ticketsRouter, notesRouter);

module.exports = router