exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('name');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.integer('role').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
