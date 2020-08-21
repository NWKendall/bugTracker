const db = require("../../database/connection.js");
const { getCategoryById } = require("../categories/categories.model.js");

module.exports = {
  getAllTickets,
  getAllUserTickets,
  getAllOpenTickets,
  getAllClosedTickets,
  getTicketById,
  editTicket,
  closeATicket,
  openATicket,
  deleteTicket,
  addTicket,
};

function callTicketDB() {
  return db("tickets as t")
    .select(
      "t.id",
      "t.user_id",
      "t.subject",
      "t.category_id",
      "c.category",
      "t.description",
      "t.tried",
      "t.created_at",
      "t.modified_at",
      "t.started",
      "t.resolved",
      "t.ended"
    )
    .join("categories as c", "t.category_id", "c.id");
}

function getAllTickets() {
  return callTicketDB();
}

function getAllOpenTickets() {
  return callTicketDB().where("resolved", false);
}

function getAllClosedTickets() {
  return callTicketDB().where("resolved", true);
}

function getAllUserTickets(id) {
  return callTicketDB().where("t.user_id ", id);
}

function getTicketById(id) {
  return callTicketDB().where("t.id ", id).first();
}

async function addTicket(ticket) {
  const newTicket = await db("tickets").insert(ticket, "id");

  return getTicketById(newTicket);
}

async function editTicket(id, changes) {
  await db("tickets")
    .where({ id })
    .update({ modified_at: new Date(), ...changes });

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
