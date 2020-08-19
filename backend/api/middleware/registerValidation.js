const UsersDB = require("../auth/auth.model.js");
const RolesDB = require("../roles/roles.model.js");

module.exports = async(req, res, next) => {
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const errorMessages = []
  
  for (const [key, value] of Object.entries(req.body)) {
    if(!value) errorMessages.push(`${key} field is missing it's value.`)
    
    if (key === "email") {
      const emailDuplicate = await UsersDB.getUserByEmail(value)
      if (!value) errorMessages.push("No email provided.");
      if (!emailRegEx.test(value)) errorMessages.push("Please provide a valid email address.");
      if (emailDuplicate) errorMessages.push("Email address is already being used. Please try another.");
    }

    if (key === "password") {
      if (!value) errorMessages.push("No password provided.");
      if (!passwordRegEx.test(value)) errorMessages.push("Password must contain: 8 characters minimum, one uppercase, one lowercase, 1 digit and 1 special character.");
    }

    if (key === "role") {
      const role_id = Number(value)
      const roleCheck = await RolesDB.getRole(role_id)
      if (!value) errorMessages.push("No role_id provided.");
      if (!roleCheck) errorMessages.push(`Role ID: ${value}, doesn't exist`);
    }

  }

  if (errorMessages.length) return res.status(400).json({errorMessages});

  next();
}
