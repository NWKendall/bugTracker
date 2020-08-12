const db = require("../../database/connection.js");
const { getNoteByNoteId, getNotesByTicketId, getTicketById } = require("./notes.model.js");

module.exports = {
    noteValidator,
    ticketValidator
}

async function noteValidator(req, res, next){
    const { id } = req.params;

    const { note } = req.body;

    const noteCheck = await getNoteByNoteId(id)
    console.log({noteCheck})
    if(id){
        if(!noteCheck){
            res.status(404).json({ message: `Note ID# ${id} does not exist.` })
        } else if(!note || note == "") {
            res.status(404).json({ message: `Please write a note for ID# ${id}!` })
        } else {
            next()
        }
    }
}   


async function ticketValidator(req, res, next){
    const { id } = req.params;

    const { subject, category, description } = req.body;

    const ticketCheck = await getTicketById(id)
    console.log("TC", {ticketCheck})
    if(id){
        if(!ticketCheck){
            res.status(404).json({ message: `Ticket ID# ${id} does not exist.` })
        } else if(!subject || subject == "" || !category || category == "" || !description || description == ""){
            res.status(404).json({ message: `Ticket ID# ${id} is missing a Subject, Category or Description field. Please complete ALL fields.` })
        
        
        
        
        } else {
            next()
        }
    }
}