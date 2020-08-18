const router = require("express").Router();
const NotesDB = require("./notes.model.js");
const { ticketValidator } = require("../middleware/tickets.mw.js");
const { noteValidator } = require("../middleware/notes.mw.js");

/*
Middleware needs to:
  check if note exists
  check for ticket id  
  validate staff or admin role
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
router.get("/:id/notes", (req, res) => {
  const { id } = req.params;

  NotesDB.getNotesByTicketId(id)
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// Post note to ticket id
router.post("/:id/notes", (req, res) => {
  const { id } = req.params;
  const newNote = { ...req.body, ticket_id: Number(id) };

  NotesDB.getTicketById(id)
    .then((ticket) => {
      // this is ID of ticket maker, not helper
      // need to set helper id from user (not URL)
      newNote.user_id = ticket.user_id;
      NotesDB.addNote(newNote).then((note) => {
        res.status(200).json(note);
      });
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// PUT specific note
router.put("/notes/:id", noteValidator, (req, res) => {
  req.body.modified_at = new Date()
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
router.delete("/notes/:id", (req, res) => {
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
