const router = require("express").Router();
const TicketsDB = require("./tickets.model.js");
const { ticketValidator, createTicketValidator, editTicketValidator, statusValidator } = require("../middleware/tickets.mw.js");

const { userValidator } = require("../middleware/users.mw.js");


// GET all Tickets across users open and closed
router.get("/tickets", (req, res) => {
  TicketsDB.getAllTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// GET all closed Tickets across users
router.get("/tickets/closed", (req, res) => {
  TicketsDB.getAllClosedTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// GET all open Tickets across users
router.get("/tickets/open", (req, res) => {
  TicketsDB.getAllOpenTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});


// ADD Ticket per user
router.post("/tickets", createTicketValidator, (req, res) => {
  const id = parseInt(req.decodedToken.subject)
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
  const id = parseInt(req.params.id);
  TicketsDB.getAllUserTickets(id)
  .then((tickets) => {
    res.status(200).json(tickets);
  })
  .catch(({ name, message, stack, code }) => {
    res.status(500).json({ name, message, stack, code });
  });
});

// GET ticket by ticket ID
router.get("/tickets/:id", ticketValidator, (req, res) => {
  const id = parseInt(req.params.id);

  TicketsDB.getTicketById(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// UPDATE ticket by ticket ID
router.put("/tickets/:id", ticketValidator, editTicketValidator,  (req, res) => {
  const id = parseInt(req.params.id);
  const changes = { ...req.body, id };

  TicketsDB.editTicket(id, changes)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.put("/tickets/:id/closed", ticketValidator, statusValidator, (req, res) => {
  const id = parseInt(req.params.id);
  TicketsDB.closeATicket(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});


router.put("/tickets/:id/open", ticketValidator, statusValidator, (req, res) => {
  const id = parseInt(req.params.id);
  TicketsDB.openATicket(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

// DELETE ticket
router.delete("/tickets/:id", ticketValidator, (req, res) => {
  const id = parseInt(req.params.id);

  TicketsDB.deleteTicket(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

module.exports = router;
