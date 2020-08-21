const db = require("../../database/connection.js");
const { addUserRole, getAllUserRoles } = require("../roles/roles.model.js")

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  getUser,
  getUserByEmail,
  
  addUserRole,
  getAllUserRoles
};

function getAllUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users").select("*").where({ id }).first();
}

async function registerUser(user) {
  const [id] = await db("users").insert(user, "id");

  return getUserById(id);
}

function getUser(user) {
  return db("users").select("*").where(user).first()
}

function getUserByEmail(email) {
  return db("users").where({email}).first()
}

// // ROLES

// function getAllUserRoles(id) {
//   return db("roles as r")
//     .select("role_name")
//     .join("user_roles as ur", "ur.role_id", "r.id")
//     .where("ur.user_id",  id);
// }

// async function addUserRole(user_id, role_id )  {
//   await db("user_roles").insert({user_id, role_id});
//   return getAllUserRoles(user_id);

// }

/*
Get users
select u.id, u.first_name, u.last_name, u.email, u.password, ur.user_id, u.role_id, ur.role_id , r.id as r_id, r.role_name from users as u

join user_roles as ur
on u.role_id = ur.role_id and u.id = ur.user_id

join roles as r
on ur.role_id = r.id

/. with correct userNmaes insert, return 
select *, r.role_name from users as u
join user_roles as ur
on id = ur.user_id
join roles as r
on ur.role_id = r.id


*/
