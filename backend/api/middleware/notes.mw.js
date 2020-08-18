const {
  getNoteByNoteId,
} = require("../notes/notes.model.js");

module.exports = {
  noteValidator,
  createNoteValidator
};

// get single and put requests
async function noteValidator(req, res, next) {
  const { id } = req.params;
  const { note } = req.body;
  const noteCheck = await getNoteByNoteId(id);
  const ticket_id = noteCheck.ticket_id;

  console.log({ ticket_id })
  if (id) {
    if (!noteCheck) {
      res.status(404).json({ message: `Note ID# ${id} does not exist.` });
    } else if (note == "") {
      res.status(404).json({ message: `Please write a note for ID# ${id}!` });
    } else {
      next();
    }
  }
}


async function createNoteValidator(req, res, next) {

  if(!req.body.note) return res.status(400).json({ errorMessages: "Note field is missing", MW: "createNoteValidator" });

  next();
}
