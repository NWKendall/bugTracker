const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../../config/secret.js");

function generateToken(user){
    const payload = {
        subject: user.id,
        first_name: user.first_name,
        role: user.roles
    }

    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, JWTSecret, options)
}

module.exports = generateToken

// Explore more opions from JWT