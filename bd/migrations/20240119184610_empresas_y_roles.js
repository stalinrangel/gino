/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("company", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("info");
        table.string("type");
        table.timestamps(true, true)})
    .createTable("roles", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("type");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("company").dropTableIfExists("roles");
};
