const db = require("../../database/connection.js");

module.exports = {
    findAll,
    getCategoryById,
    addCategory
}

function findAll() {
    return db("categories").select('*')
}

function getCategoryById(id){
    return db("categories").select(id, "category_name")

}

function addCategory(category) {
    return db("categories").insert(category, "id").then(ids => {
        const [id] = ids
        return  getCategoryById(id)
    })
}