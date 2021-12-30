let knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5433,
        user: 'postgres',
        password: 'edu123',
        database: 'apiusers',
    }
});

module.exports = knex
