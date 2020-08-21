const {
  getNoteByNoteId,
  getNotesByTicketId,
} = require("../notes/notes.model.js");
const { getTicketById } = require("../tickets/tickets.model.js");

module.exports = {
  noteValidator,
  notesValidator,
  createNoteValidator,
  editNoteValidator,
};

// checks to see note exists
async function noteValidator(req, res, next) {
  const note_id = parseInt(req.params.id);
  const noteCheck = await getNoteByNoteId(note_id);
  if (!noteCheck || !noteCheck.note)
    return res
      .status(404)
      .json({ message: `Note ID# ${note_id} does not exist.` });

  next();
}

async function notesValidator(req, res, next) {
  const ticket_id = parseInt(req.params.id);
  const noteCheck = await getNotesByTicketId(ticket_id);

  if (!noteCheck.length)
    return res
      .status(404)
      .json({ message: `No notes have been created for ticket ${ticket_id}.` });

  if (noteCheck.length == 1) {
    if (ticket_id != noteCheck.ticket_id)
      return res.status(404).json({
        message: `The note got ticket: ${ticket_id} has an incorrect ticket ID# !!`,
      });
  }

  if (noteCheck.length > 1) {
    const noteErrors = [];
    noteCheck.map((note) => {
      if (note.ticket_id != ticket_id) noteErrors.push(note.ticket_id);
    });

    if (noteErrors.length)
      return res.status(404).json({
        message: `The following notes ticket_id # do not match ticket_id ${ticket_id}:`,
        noteErrors,
      });
  }

  next();
}

async function createNoteValidator(req, res, next) {
  const { id } = req.params;
  const { subject, role } = req.decodedToken.subject;
  const ticket = await getTicketById(id);

  if (role != "admin" && ticket.user_id === subject)
    return res.status(400).json({
      errorMessages: "Staff user must solve tickets posted by other users!",
      MW: "createNoteValidator",
    });

  if (!req.body.note)
    return res.status(400).json({
      errorMessages: "Note field is missing",
      MW: "createNoteValidator",
    });

  next();
}

async function editNoteValidator(req, res, next) {
  const { id } = req.params;
  const changes = req.body;
  const originalNote = await getNoteByNoteId(id);

  if (changes.note === originalNote.note)
    return res
      .status(400)
      .json({
        errorMessages:
          "Changes must be different from original note or it's previous version.",
        MW: "editNoteValidator",
      });

  next();
}
