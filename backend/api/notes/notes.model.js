const db = require("../../database/connection.js");
const { getTicketById, editTicket } = require("../tickets/tickets.model.js");

module.exports = {
  getAllNotes,
  getNotesByTicketId,
  getNoteByNoteId,
  getTicketById,
  editTicket,
  addNote,
  editNote,
  deleteNote,
};

function getAllNotes() {
  return db("notes");
}

function getNoteByNoteId(id) {
  return db("notes").where({ id }).first();
}

async function getNotesByTicketId(id) {
  const notes = await db("notes").where("ticket_id", id);

  return notes;
}

async function addNote(note) {
  await db("notes").insert(note);

  const ticket_id = note.ticket_id;
  const allNotes = await getNotesByTicketId(ticket_id);

  if (allNotes.length == 1)
    await db("tickets").where("id", ticket_id).update({ started: new Date() });

  const newNote = allNotes.length -1  

  return allNotes[newNote];
}

async function editNote(id, changes) {
  await db("notes").where({ id }).update(changes);

  return getNoteByNoteId(id);
}

async function deleteNote(id) {
  await db("notes").where({ id }).delete();

  return `Successfully Deleted Note# ${id}`;
}
