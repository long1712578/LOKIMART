const util = require('util');
const mysql = require('mysql');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'lokimart',
    port: 3306
  },
  pool: { min: 0, max: 100 }
});
module.exports = {
  knex
}
