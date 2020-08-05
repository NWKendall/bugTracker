const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Secret = require("../../config/secret.js")
const router = require("express").Router();

const UsersDB = require("./auth.model.js");


router.get("/users", (req, res) => {
    UsersDB.getAllUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(({name, code, message, stack}) => {
        res.status(500).json(({name, code, message, stack}))
    })
})

router.post("/register", (req, res) => {


    


    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;

    UsersDB.registerUser(newUser).then(user => {
        res.status(201).json(user)
    }).catch(({name, code, message, stack}) => {
        res.status(500).json(({name, code, message, stack}))
    })

})

/*

/POST register

/POST login




*/

module.exports = router