const router = require("express").Router();
const UsersDB = require("./users.model.js");

// GET all Users (no roles)
router.get("/", (req, res) => {
  UsersDB.getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// GET User
router.get("/:id", (req, res) => {
  const { id } = req.params;
  UsersDB.getUserById(id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// UPDATE User
router.put("/:id", (req, res) => {
  req.body.modified_at = new Date();
  const { id } = req.params;
  const changes = { ...req.body, id };
  UsersDB.editUser(id, changes)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// DELETE User
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  UsersDB.removeUser(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});


module.exports = router;
