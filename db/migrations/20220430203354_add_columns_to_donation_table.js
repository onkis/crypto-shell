/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('donations', table => {
    table.renameColumn('donation_button_id', 'asset_id');
    table.renameColumn('transaction_id', 'transaction_ref_id');
    table.string('signature', 88);
    table.json('donation_config');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('donations', table => {
    table.renameColumn('asset_id', 'donation_button_id');
    table.renameColumn('transaction_ref_id', 'transaction_id');
    table.dropColumn('signature');
    table.dropColumn('donation_config');
  });
};
