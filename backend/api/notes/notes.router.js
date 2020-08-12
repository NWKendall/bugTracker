const router = require("express").Router();
const NotesDB = require("./notes.model.js");

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
router.get("/notes/:id", (req, res) => {
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
  console.log(1, {id})

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
router.put("/notes/:id", (req, res) => {
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
