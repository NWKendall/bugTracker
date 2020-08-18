const {
  getNoteByNoteId,
} = require("../notes/notes.model.js");

module.exports = {
  noteValidator,
};

async function noteValidator(req, res, next) {
  const { id } = req.params;
  const { note } = req.body;
  const noteCheck = await getNoteByNoteId(id);

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

