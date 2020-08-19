const { getTicketById } = require("../notes/notes.model.js");

module.exports = {
  ticketValidator,
  createTicketValidator,
};

// good for edit
async function ticketValidator(req, res, next) {
  const id = parseInt(req.params.id);
  const errorMessages = [];
  const ticketIdCheck = await getTicketById(id);

  if (!ticketIdCheck)
    return res
      .status(404)
      .json({ message: `Ticket ID# ${id} does not exist.` });

  for (const [key, value] of Object.entries(req.body)) {
    if (!value) errorMessages.push(`${key} field is missing value`);
  }

  if (errorMessages.length)
    return res.status(404).json({ errorMessages, MW: "ticketValidator" });

  next();
}

async function createTicketValidator(req, res, next) {
  const required = ["subject", "category", "description"];
  const errorMessages = [];

  required.forEach((field) => {
    if (!(field in req.body) || !req.body[field].toString().length) {
      errorMessages.push(`${field} is missing value.`);
    }
  });

  if (!!errorMessages.length)
    return res.status(400).json({ errorMessages, MW: "createTicketValidator" });

  next();
}
