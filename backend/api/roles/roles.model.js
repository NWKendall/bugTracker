const db = require("../../database/connection.js");

module.exports = {
  // db("roles")
  getAllRoles,
  getRole,
  newRole,
  editRole,
  deleteRole,
  // db("user_roles")
  getAllUserRoles,
  addUserRole,
  deleteUserRoles,
  editUserRole,
};

// ROLES - no seeded data
function getAllRoles() {
  return db("roles");
}

function getRole(id) {
  

  return db("roles").select("*").where({ id }).first();
}

async function newRole(newRole) {
  await db("roles").insert(newRole);

  return getAllRoles();
}

async function editRole(id, changes) {
  await db("roles").where({ id }).update(changes);

  return getRole(id);
}

async function deleteRole(id) {
  const role_id = parseInt(id)
  return db("roles").where({ id }).delete();
}

// USER ROLES - with seeded data
function getAllUserRoles(id) {
  return db("roles as r")
    .select("id", "name")
    .join("user_roles as ur", "ur.role_id", "r.id")
    .where("ur.user_id", id);
}

async function addUserRole(user_id, role_id) {
  await db("user_roles").insert({ user_id, role_id });
  return getAllUserRoles(user_id);
}

function editUserRole(user_id, role_id, changes) {
  return db("user_roles").where({ user_id, role_id }).update(changes);
}

function deleteUserRoles(id) {
  return db("user_roles").where("user_id", id).delete();
}
