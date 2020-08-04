const db = require("../../database/connection.js");

module.exports = {
  findAll,
  getCategory,
  getCategoryById,
  addCategory,
};

function findAll() {
  return db("categories");
}
function getCategory(category) {
  return db("categories").select("*").where(category);
}

function getCategoryById(id) {
  return db("categories").select("*").where({ id }).first();
}

function addCategory(category) {
  return db("categories")
    .insert(category, "category_name")
}
