/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('donations', function (table) {
    table.increments();
    table.integer('org_id');
    table.integer('donation_button_id');
    table.integer('user_id');
    table.string('transaction_id', 88);
    table.string('amount');
    table.string('label', 1000);
    table.string('memo', 1000);
    table.string('message', 1000);
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("donations");

};
