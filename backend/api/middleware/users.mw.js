// note and ticket user_id check
// getuser _id from BE
// check it's user type
// staff or admin (2 | 3) for notes
// users for tickets (1)


const { getUserById } = require("../users/users.model.js");


module.exports = {
    userValidator
}

// for when id is before resource (user direct)
async function userValidator (req, res, next) {
    const id = req.decodedToken.subject
    console.log(id)
    const userCheck = await getUserById(id)

    if(!userCheck) return res.status(404).json({ errorMessages: `User: ${id} does not exist`, MW: "userValidator"})

    next()
}

