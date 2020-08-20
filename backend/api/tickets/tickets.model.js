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
  getAllClosedTickets,
};

function getAllTickets() {
  return db("tickets");
}

function getAllOpenTickets() {
  return db("tickets as t")
    .join("categories as c", "c.id", "t.category_id")
    .where("resolved", false);
}

function getAllClosedTickets() {
  return db("tickets as t")
    .join("categories as c", "c.id", "t.category_id")
    .where("resolved", true);
}

function getAllUserTickets(id) {
  return db("tickets as t")
    .join("categories as c", "c.id", "t.category_id")
    .where("t.user_id", id);
}

async function getTicketById(id) {
  const int_id = parseInt(id);
  return db("tickets as t")
    .join("categories as c", "c.id", "t.category_id")
    .where("t.id", int_id)
    .first();
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
  await db("tickets").where({ id }).update({ resolved: false, ended: null });

  return getTicketById(id);
}
