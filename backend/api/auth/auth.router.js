const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UsersDB = require("./auth.model.js");
const generateToken = require("./generateToken.js");

router.get("/working", (req, res) => {
  // const { id } = req.params;
  console.log("XXX")
  const email = "nic@test.com"
  UsersDB.getUserByEmail(email).then((user) =>
    res
      .status(200)
      .json(user)
      .catch((err) => res.status(500).json(err))
  );
});

router.post("/register", validateRegister, (req, res) => {
  let { first_name, last_name, password, email, role } = req.body;
  let hash = bcrypt.hashSync(password, 12);
  password = hash;

  UsersDB.registerUser({ first_name, last_name, password, email })
    .then((user) => {
      const id = user.id;
      UsersDB.addUserRole(user.id, role)
        .then((roles) => {
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

async function validateRegister(req, res, next) {
  const { email, password, role_id, first_name, last_name } = req.body;
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailDuplicate = await UsersDB.getUserByEmail(email)
  const errorMessages = []

  for( const [key, value] of Object.entries(req.body )) {
    if(!value) errorMessages.push(`${key} field is missing it's value. `)

    if (key === "email") {
      if (!value) errorMessages.push(`No email provided.`);
      if (!emailRegEx.test(value)) errorMessages.push("Please provide a valid email address")
      if (emailDuplicate) errorMessages.push("Email address is already being used. Please try another.")
    }

    if (key === "password") {
      if (!value) errorMessages.push(`No password provided.`);
      if (!passwordRegEx.test(value)) errorMessages.push("Password must contain: 8 characters minimum, one uppercase, one lowercase, 1 digit and 1 special character")
    }
  }

  if (errorMessages.length) return res.status(400).json({errorMessages})

  next();
}
