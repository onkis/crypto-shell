/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('kvstore', function (table) {
    table.string('key',255);
    table.text('value');
    table.timestamp('expire_at');
    table.index('key', 'key_index');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("kvstore");
};
