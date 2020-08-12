const db = require("../../database/connection.js");

module.exports = {
    getAllTickets,
    addTicket,
    getAllUserTickets,
    getTicketById,
    editTicket,
    deleteTicket,
}

function getAllTickets(){
    return db("tickets")
}

function getAllUserTickets(id){
    return db("tickets").select("*").where("user_id", id)
}

function getTicketById([id]){
    return db("tickets").where({ id }).first()
}

async function addTicket(ticket){
    const newTicket = await db("tickets").insert(ticket, "id")
    return getTicketById(newTicket)
}

async function editTicket(id, changes){
    await db("tickets").where({id}).update(changes)
    return getTicketById(id)
}

function deleteTicket(id){
    return db("tickets").where({ id }).delete()
}