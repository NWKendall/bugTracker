const { getTicketById } = require("../tickets/tickets.model.js");

module.exports = {
  ticketValidator,
  createTicketValidator,
  editTicketValidator,
  statusValidator,
};

// good for edit
async function ticketValidator(req, res, next) {
  const id = parseInt(req.params.id);
  const ticketIdCheck = await getTicketById(id);

  if (!ticketIdCheck)
    return res.status(404).json({
      errorMessage: `Ticket ID# ${id} does not exist.`,
      MW: "ticketValidator",
    });

  next();
}

async function createTicketValidator(req, res, next) {
  const errorMessages = [];
  if (!req.pody)
    return res
      .status(400)
      .json({
        errorMessage: `No request body attached`,
        MW: "createTicketValidator",
      });

  for (const [key, value] of Object.entries(req.body)) {
    if (!value) errorMessages.push(`${key} is missing value.`);
  }

  if (!!errorMessages.length)
    return res.status(400).json({ errorMessages, MW: "createTicketValidator" });

  next();
}

async function editTicketValidator(req, res, next) {
  const id = parseInt(req.params.id);
  const updatedTicket = { id, ...req.body };
  const originalTicket = await getTicketById(id);

  let changes = 5;

  for (const [key, value] of Object.entries(updatedTicket)) {
    if (!value)
      return res.status(400).json({
        errorMessages: `${key} value is missing.`,
        MW: "createTicketValidator",
      });
    if (value == originalTicket[key]) changes--;
  }

  if (changes === 0)
    return res.status(400).json({
      errorMessages: "No changes in ticket fields detected.",
      MW: "createTicketValidator",
    });

  next();
}

async function statusValidator(req, res, next) {
  const id = parseInt(req.params.id);
  const ticket = await getTicketById(id);

  const closedStatus = /closed/;
  const openStatus = /open/;

  if (closedStatus.test(req.url)) {
    if (ticket.resolved === true)
      return res.status(400).json({
        errorMessage: `Ticket ${id} is already closed`,
        MW: "statusValidator",
      });
  }

  if (openStatus.test(req.url)) {
    if (ticket.resolved === false)
      return res.status(400).json({
        errorMessage: `Ticket ${id} is already open`,
        MW: "statusValidator",
      });
  }
  next();
}
