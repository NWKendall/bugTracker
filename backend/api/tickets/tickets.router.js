const router = require("express").Router();
const TicketsDB = require("./tickets.model.js");
const { ticketValidator, createTicketValidator } = require("../middleware/tickets.mw.js");

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

router.get("/tickets/closed", (req, res) => {
  TicketsDB.getAllClosedTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

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
  const id = req.decodedToken.subject
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
router.get("/:id/tickets", userValidator, (req, res) => {
  const { id } = req.params;
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
router.put("/tickets/:id", ticketValidator, (req, res) => {
  req.body.modified_at = new Date()
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

router.put("/tickets/:id/closed", ticketValidator, (req, res) => {
  const { id } = req.params;
  TicketsDB.closeATicket(id)
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});


router.put("/tickets/:id/open", ticketValidator, (req, res) => {
  const { id } = req.params;
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
