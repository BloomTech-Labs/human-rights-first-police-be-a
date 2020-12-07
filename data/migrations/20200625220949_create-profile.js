exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('incidents', (incidents) => {
      incidents.string('incident_id').unique().primary().notNullable();
      incidents.text('src');
      incidents.string('categories');
      incidents.string('city').notNullable();
      incidents.string('state').notNullable();
      incidents.float('lat').notNullable();
      incidents.float('long').notNullable();
      incidents.string('title').notNullable();
      incidents.varchar('desc', 10000);
      incidents.date('date');
      incidents.boolean('verbalization').defaultsTo(0);
      incidents.boolean('empty_hand_soft').defaultsTo(0);
      incidents.boolean('empty_hand_hard').defaultsTo(0);
      incidents.boolean('less_lethal_methods').defaultsTo(0);
      incidents.boolean('lethal_force').defaultsTo(0);
      incidents.boolean('uncategorized').defaultsTo(0);
    })
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('incidents');
};
