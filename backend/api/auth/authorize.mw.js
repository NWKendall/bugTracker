const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../../config/secret.js");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = req.body;
    // const secret = JWTSecret
    if(authorization){
        console.log(1,{authorization})
        jwt.verify(authorization, JWTSecret, (err, decodedToken) => {
            console.log(2,{authorization, JWTSecret})
            if(err) {
                res.status(401).json({ Error: err })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({ message: "No credentials provided" })
    }


}