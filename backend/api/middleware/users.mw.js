const { getUserById } = require("../users/users.model.js");

module.exports = {
    userIdValidator,
    userValidator
}

// checks user exists and is authorized to access
async function userValidator (req, res, next) {

    let paramId;
    const tokenId = parseInt(req.decodedToken.subject);
    
    if(req.params.id) {
        paramId = parseInt(req.params.id);
        if (paramId != tokenId) 
            return res.status(401).json({ errorMessages: `You do not have permission to access this content`, MW: "userValidator"})
    }

    next()
}

async function userIdValidator (req, res, next) {

    const tokenId = parseInt(req.decodedToken.subject);
    const userCheck = await getUserById(tokenId)
    
    if(!userCheck) 
        return res.status(404).json({ errorMessages: `User: ${tokenId} does not exist`, MW: "userValidator"})

    next()
}
