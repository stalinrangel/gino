/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("orders", (table) => {
        table.increments("id").primary();
        table.string("info");
        table.integer('company_id',10).unsigned().references('id').inTable('company');
        table.integer('user_id',10).unsigned().references('id').inTable('users');
        table.timestamps(true, true)})
    .createTable("pedidos", (table) => {
        table.increments("id").primary();
        table.string("info");
        table.integer('company_id',10).unsigned().references('id').inTable('company');
        table.integer('user_id',10).unsigned().references('id').inTable('users');
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orders").dropTableIfExists("pedidos");
};
