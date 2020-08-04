require("dotenv").config();

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: process.env.DB_PASSWORD,
      database: 'bugTracker_Dev'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  testing: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: process.env.DB_PASSWORD,
      database: 'bugTracker_Test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: 'pg',
    connection: "",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
