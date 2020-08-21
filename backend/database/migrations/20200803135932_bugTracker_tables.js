exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 255).notNullable().unique().index();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at");
      tbl.timestamp("deleted_at");
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("first_name", 255).notNullable().index();
      tbl.string("last_name", 255).notNullable().index();
      tbl.string("email", 255).notNullable().unique().index();
      tbl.string("password", 255).notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at");
      tbl.timestamp("deleted_at");
    })
    .createTable("user_roles", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .createTable("categories", (tbl) => {
      tbl.increments();
      tbl.string("category", 255).notNullable().unique().index();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at");
      tbl.timestamp("deleted_at");
    })
    .createTable("tickets", (tbl) => {
      tbl.increments();
      tbl.string("subject", 255).notNullable().index();
      tbl     
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.string("description", 255).notNullable().index();
      tbl.string("tried", 255).notNullable().index();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at");
      tbl.timestamp("deleted_at");
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
        .onDelete("RESTRICT");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.boolean("voted").defaultTo(false).index();
    })
    .createTable("images", (tbl) => {
      tbl.increments();
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
      tbl.increments();
      tbl
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tickets")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("modified_at");
      tbl.timestamp("deleted_at");
      tbl.string("note", 255).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("notes")
    .dropTableIfExists("images")
    .dropTableIfExists("votes")
    .dropTableIfExists("tickets")
    .dropTableIfExists("categories")
    .dropTableIfExists("user_roles")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
