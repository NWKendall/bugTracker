const {
  getTicketById, 
} = require("../notes/notes.model.js");

module.exports = {
  ticketValidator,
  createTicketValidator
};

// good for edit
async function ticketValidator(req, res, next) {
  const { id } = req.params;
  const { subject, category, description } = req.body;
  const missing = []

  const ticketCheck = await getTicketById(id);

  const required = { subject, category, description }

  if (id) {
    if (!ticketCheck) return res.status(404).json({ message: `Ticket ID# ${id} does not exist.` });
    } 
    
    else if (
      !subject ||
      subject == "" ||
      !category ||
      category == "" ||
      !description ||
      description == ""
    ) {
      res
        .status(404)
        .json({
          message: `Ticket ID# ${id} is missing a Subject, Category or Description field. Please complete ALL fields.`,
        });
    } else {
      next();
    }
  }
}

async function createTicketValidator(req, res, next) {
  
  const required = [ "subject", "category", "description" ];
  const errors = [];

  const ticketCheck = await getTicketById(id);

  required.forEach(field => {
    if(!(field in req.body) || !req.body[field].toString().length){
      errors.push(`${field} is missing value.`);
    }
  })

  if(!!errors.length) return res.status(400).json({ errors, MW: "createTicketValidatory" })


}


// 