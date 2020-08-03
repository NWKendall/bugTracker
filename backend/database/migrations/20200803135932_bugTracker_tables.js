
exports.up = function(knex) {
  return knex.schema.createTable("roles", tbl =>  {
        tbl.increments()
        tbl
            .string("role_name", 255)
            .notNullable()
            .unique()
            .index()
          })
          .createTable("users", tbl => {
            tbl.increments()
            tbl
            .string("first_name", 255)
            .notNullable()
            .index()
            tbl
            .string("last_name", 255)
            .notNullable()
            .index()
            tbl
            .string("email", 255)
            .notNullable()
            .index()
            tbl
            .string("password", 255)
            .notNullable()
          })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("roles")
  .knex.schema.dropTableIfExists("users")
  knex.schema.dropTableIfExists("user_roles")
};
