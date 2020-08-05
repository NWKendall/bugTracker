const db = require("../../database/connection.js");

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
}

function getAllUsers() {
    return db("users")
}

function getUserById(id) {
    return db("users").select("*").where({id}).first()
}

async function registerUser(user){
    const [id] = await db("users").insert(user, "id");
    
    return getUserById(id)
    
}



/*
Get users
select u.id, u.first_name, u.last_name, u.email, u.password, ur.user_id, u.role_id, ur.role_id , r.id as r_id, r.role_name from users as u

join user_roles as ur
on u.role_id = ur.role_id and u.id = ur.user_id

join roles as r
on ur.role_id = r.id



*/