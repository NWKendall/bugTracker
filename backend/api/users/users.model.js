const db = require("../../database/connection.js");
const { deleteUserRoles } = require("../roles/roles.model.js")
const { getAllUserTickets, addTicket } = require("../tickets/tickets.model.js")

module.exports = {
    getUsers,
    getUserById,
    editUser,
    removeUser,
    getAllUserTickets, 
    addTicket
}

function getUsers(){
    return db("users")
}

function getUserById(id){
    return db("users").select("*").where({ id }).first();
}

async function editUser(id, changes){
    await db("users").where({ id }).update(changes)
    return getUserById(id)
}

async function removeUser(id){
    await deleteUserRoles(id)
    return db("users").where({ id }).delete()
}