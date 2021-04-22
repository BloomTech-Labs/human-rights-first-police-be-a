
exports.up = function(knex) {
  return knex.schema
    .alterTable('twitter_incidents', (tbl) => {
      tbl.integer('accuracy_estimate');
  })
};

exports.down = function(knex) {
  return knex.schema.table('twitter_incidents', tbl => {
    tbl.dropColumn('accuracy_estimate');
  })
};
