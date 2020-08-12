const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken.js");
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
      const id = user.id;
      UsersDB.addUserRole(user.id, role)
        .then((roles) => {
          console.log("roles:", roles);

          res
            .status(201)
            .json({ id, first_name, last_name, password, email, roles });
        })

        .catch(({ name, code, message, stack }) => {
          res.status(500).json({ name, code, message, stack });
        });
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  UsersDB.getUser({ email })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.first_name}!`, token });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

module.exports = router;
