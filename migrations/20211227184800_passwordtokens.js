exports.up = function (knex) {
    return knex.schema.createTable('passwordtokens', function (table) {
        table.increments();
        table.string('token').notNullable();
        table.integer('user_id').notNullable().references("id").inTable("users");
        table.integer('used');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('passwordtokens');
};
