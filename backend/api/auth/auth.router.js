const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Secret = require("../../config/secret.js");
const router = require("express").Router();

const UsersDB = require("./auth.model.js");

router.get("/users", (req, res) => {
  UsersDB.getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.post("/register", (req, res) => {
  let { first_name, last_name, password, email, role } = req.body;
  let hash = bcrypt.hashSync(password, 12);

  password = hash;

  UsersDB.registerUser({ first_name, last_name, password, email })
    .then((user) => {
      UsersDB.addUserRole(user.id, role)
        .then((roles) => {
          console.log("roles:", roles);

          res.status(201).json({first_name, last_name, password, email, roles});
        })

        .catch(({ name, code, message, stack }) => {
          res.status(500).json({ name, code, message, stack });
        });

    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

/*

/POST register

/POST login




*/

module.exports = router;
