const jwt = require("jsonwebtoken");
const Secret = require("../../config/secret.js");

function generateToken(user){
    const payload = {
        subject: user.id,
        first_name: user.first_name
    }

    const jwtSecret = Secret.JWTSecret

    const options = {
        expiresIn: "8h"
    }

    return jwt.sign(payload, jwtSecret, options)
}


module.exports = generateToken