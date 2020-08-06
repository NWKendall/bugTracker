const db = require("../../database/connection.js");

module.exports = {
  findAllCategories,
  getCategoryByName,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};

function findAllCategories() {
  return db("categories");
}

function getCategoryByName(category) {
  return db("categories").select("*").where(category).first();
}

function getCategoryById(id) {
  return db("categories").select("*").where({ id }).first();
}

async function addCategory(category) {
  await db("categories").insert(category, "category_name");
  return getCategoryByName(category);
}

async function updateCategory(id, changes) {
  await db("categories").where({ id }).update(changes);

  return getCategoryById(id);
}

function deleteCategory(id) {
  return db("categories").where({ id }).delete()
}
