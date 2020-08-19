const db = require("../../database/connection.js");

module.exports = {
  getAllTickets,
  addTicket,
  getAllUserTickets,
  getTicketById,
  editTicket,
  deleteTicket,
  closeATicket,
  openATicket,
  getAllOpenTickets,
  getAllClosedTickets
};

function getAllTickets() {
  return db("tickets");
}

function getAllOpenTickets() {
  return db("tickets").where("resolved", false);
}

function getAllClosedTickets() {
  return db("tickets").where("resolved", true);
}

function getAllUserTickets(id) {
  return db("tickets").select("*").where("user_id", id);
}

function getTicketById(id) {
  const int_id = parseInt(id);
  return db("tickets").select("*").where("id", int_id).first();
}

async function addTicket(ticket) {
  const newTicket = await db("tickets").insert(ticket, "id");

  return getTicketById(newTicket);
}

async function editTicket(id, changes) {
  await db("tickets").where({ id }).update(changes);
  return getTicketById(id);
}

function deleteTicket(id) {
  return db("tickets").where({ id }).delete();
}

async function closeATicket(id) {
  await db("tickets")
    .where({ id })
    .update({ resolved: true, ended: new Date() });

  return getTicketById(id);
}

async function openATicket(id) {
  await db("tickets")
    .where({ id })
    .update({ resolved: false, ended: null });

  return getTicketById(id);
}
