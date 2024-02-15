/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("legajos", (table) => {
        table.increments("id").primary();
        table.string("info");
        table.integer('company_id',10).unsigned().notNullable().references('id').inTable('company');
        table.integer('role_id',10).unsigned().notNullable().references('id').inTable('roles');
        table.integer('user_id',10).unsigned().notNullable().references('id').inTable('users');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("legajos");
};
