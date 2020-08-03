exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments("id");
      tbl.string("role_name", 255).notNullable().unique().index();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at").defaultTo(knex.fn.now());
      tbl.timestamp("deleted_at").defaultTo(knex.fn.now());
    })
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.string("first_name", 255).notNullable().index();
      tbl.string("last_name", 255).notNullable().index();
      tbl.string("email", 255).notNullable().index();
      tbl.string("password", 255).notNullable();
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at").defaultTo(knex.fn.now());
      tbl.timestamp("deleted_at").defaultTo(knex.fn.now());
    })
    .createTable("user_roles", (tbl) => {
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
    })
    .createTable("categories", (tbl) => {
      tbl.increments("id");
      tbl.string("category_name", 255).notNullable().unique().index();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at").defaultTo(knex.fn.now());
      tbl.timestamp("deleted_at").defaultTo(knex.fn.now());
    })
    .createTable("tickets", (tbl) => {
      tbl.increments("id");
      tbl.string("subject", 255).notNullable().index();
      tbl.string("category", 255).notNullable().index();
      tbl.string("description", 255).notNullable().index();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at").defaultTo(knex.fn.now());
      tbl.timestamp("deleted_at").defaultTo(knex.fn.now());
      tbl.timestamp("started").defaultTo(null);
      tbl.timestamp("ended").defaultTo(null);
      tbl.boolean("resolved").defaultTo(false);
    })
    .createTable("votes", (tbl) => {
      tbl
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tickets")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
      tbl.boolean("voted").defaultTo(false).index();
    })
    .createTable("images", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("ticket_id")
        .unsigned()
        .references("id")
        .inTable("tickets")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.string("image", 255);
    })
    .createTable("notes", (tbl) => {
        tbl.increments("id")
        tbl
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tickets")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT")
    tbl.timestamp("created_at").defaultTo(knex.fn.now())
    tbl.timestamp("modified_at").defaultTo(knex.fn.now())
    tbl.timestamp("deleted_at").defaultTo(knex.fn.now())
    tbl.string("notes", 255).notNullable()


    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("roles")
    .knex.schema.dropTableIfExists("users")
    .knex.schema.dropTableIfExists("user_roles")
    .knex.schema.dropTableIfExists("categories")
    .knex.schema.dropTableIfExists("tickets")
    .knex.schema.dropTableIfExists("votes")
    .knex.schema.dropTableIfExists("images")
    .knex.schema.dropTableIfExists("notes");

};
