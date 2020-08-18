// note and ticket user_id check
// getuser _id from BE
// check it's user type
// staff or admin (2 | 3) for notes
// users for tickets (1)


// only note has ticket_id
// param will be ticket
// if not param = user id
// if(req.body.ticket_id){
//     const id = req.body.ticket_id

//     const ticket = await get


// }

// roles 

const { getTicketById } = require("../tickets/tickets.model.js");

const { getNoteByNoteId } = require("../notes/notes.model.js");
const { getUserById } = require("../users/users.model.js");


module.exports = {
    userValidator
}

// when id is before resource
async function userValidator (req, res, next) {
    const { id } = req.params;
    let userCheck;

    userCheck = await getUserById(id)

    if(!userCheck) return res.status(404).json({ errorMessages: `User: ${id} does not exist`, MW: "userValidator"})

    next()
}

