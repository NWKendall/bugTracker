const router = require("express").Router();
const NotesDB = require("./notes.model.js");

const { ticketValidator } = require("../middleware/tickets.mw.js");
const {
  noteValidator,
  createNoteValidator,
} = require("../middleware/notes.mw.js");

/*
Middleware needs to:
  check if note exists
  check for ticket id  
*/

// GET all notes for all tickets
router.get("/notes", (req, res) => {
  NotesDB.getAllNotes()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// GET specific note
router.get("/notes/:id", noteValidator, (req, res) => {
  const { id } = req.params;
  
  NotesDB.getNoteByNoteId(id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// GET all notes per ticket
router.get("/:id/notes", ticketValidator, (req, res) => {
  const { id } = req.params;

  NotesDB.getNotesByTicketId(id)
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// POST note to ticket id 
router.post("/:id/notes", createNoteValidator, (req, res) => {
  const { id } = req.params;
  const user_id = req.decodedToken.subject;
  const newNote = { ...req.body, ticket_id: id, user_id: user_id };

  NotesDB.addNote(newNote)
    .then((note) => {
      res.status(200).json(note);
    })

    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// PUT specific note
router.put("/notes/:id", noteValidator, (req, res) => {
  req.body.modified_at = new Date();
  const { id } = req.params;
  const changes = req.body;

  NotesDB.editNote(id, changes)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// DELETE specific note
router.delete("/notes/:id", noteValidator, (req, res) => {
  const { id } = req.params;
  NotesDB.deleteNote(id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

module.exports = router;
