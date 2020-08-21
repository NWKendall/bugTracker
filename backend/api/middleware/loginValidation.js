const UsersDB = require("../auth/auth.model.js");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailExist = await UsersDB.getUserByEmail(email);

  if (!email)
    return res
      .status(400)
      .json({ errorMessage: "No email provided in request body." });

  if (!emailRegEx.test(email))
    return res.status(400).json({ errorMessage: "Not a valid email address." });

  if (!emailExist)
    return res
      .status(400)
      .json({ errorMessage: "Email provided is not registered on database. You can use this email to register an account." });

  if (!password)
    return res
      .status(400)
      .json({ errorMessage: "No password provided in request body." });

  if (!passwordRegEx.test(password))
    return res.status(400).json({
      errorMessage:
        "Password must contain: 8 characters minimum, one uppercase, one lowercase, 1 digit and 1 special character.",
    });

  next();
};
