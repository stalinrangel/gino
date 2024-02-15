require("dotenv").config()
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host:process.env.DB_HOST,
      port : 3306,
      user:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      /*tableName: 'knex_migratio2ns',*/
      directory: './bd/migrations',
    },
    seeds: {
      directory: './bd/sseeds',
    },
  },
  production: {
      client: 'mysql',
      connection: {
        host:process.env.DB_HOST,
        port : 3306,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
      },
      pool: {
        min: 0,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migration3s',
        directory: './bd/migrations',
      },
      seeds: {
        directory: './bd/seeds',
      },
    },
}
