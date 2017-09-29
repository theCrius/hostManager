module.exports = {
  client: 'mysql',
  connection: {
    host:     'localhost',
    database: 'hostManager',
    user:     'root',
    password: 'toor'
  },
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  }
};
