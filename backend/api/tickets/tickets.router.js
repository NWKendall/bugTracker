const router = require("express").Router();
const TicketsDB = require("./tickets.model.js");

// GET all Tickets across users
router.get("/tickets", (req, res) => {
  TicketsDB.getAllTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// ADD Ticket per user
router.post("/:id/tickets", (req, res) => {
  const { id } = req.params;
  const newTicket = { ...req.body, user_id: id };

  TicketsDB.addTicket(newTicket)
    .then((ticket) => {
      res.status(201).json(ticket);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack });
    });
});

// GET all tickets per user, id = user_id
router.get("/:id/tickets", (req, res) => {
  const { id } = req.params;
  TicketsDB.getAllUserTickets(id)
    .then((tickets) => {
      console.log(4, { tickets });
      res.status(200).json(tickets);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// GET ticket by ticket ID
router.get("/tickets/:id", (req, res) => {
  const { id } = req.params;

  TicketsDB.getTicketById(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// UPDATE ticket by ticket ID
router.put("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const changes = { ...req.body, id };

  TicketsDB.editTicket(id, changes)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// DELETE ticket
router.delete("/tickets/:id", (req, res) => {
  const { id } = req.params;

  TicketsDB.deleteTicket(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

module.exports = router;
