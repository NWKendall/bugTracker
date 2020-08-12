const db = require("../../database/connection.js");
const { getTicketById } = require("../tickets/tickets.model.js");

module.exports = {
  getAllNotes,
  getNotesByTicketId,
  getNoteByNoteId,
  getTicketById,
  addNote,
  editNote,
  deleteNote
};

function getAllNotes() {
  return db("notes");
}

function getNoteByNoteId(id) {
    return db("notes").where({ id }).first();
}

async function getNotesByTicketId(id) {
    console.log(2, {id})
  return db("notes").where("ticket_id", id);
}

async function addNote(note){
    console.log("add", note)
    await db("notes").insert(note);
    return getNotesByTicketId(note.ticket_id);
}

async function editNote(id, changes) {
    await db("notes").where({id}).update(changes)

    return getNoteByNoteId(id)
}

async function deleteNote(id){
    await db("notes").where({id}).delete()

    return `Successfully Deleted Note# ${id}`

}