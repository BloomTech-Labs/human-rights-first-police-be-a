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
    .createTable('twitter_incidents', (twitter_incidents) => {
      twitter_incidents
        .string('twitter_incident_id')
        .unique()
        .primary()
        .notNullable();
      twitter_incidents.text('src');
      twitter_incidents.string('categories');
      twitter_incidents.string('city').notNullable();
      twitter_incidents.string('state').notNullable();
      twitter_incidents.float('lat').notNullable();
      twitter_incidents.float('long').notNullable();
      twitter_incidents.string('title').notNullable();
      twitter_incidents.varchar('desc', 10000);
      twitter_incidents.date('date');
      twitter_incidents.boolean('verbalization').defaultsTo(0);
      twitter_incidents.boolean('empty_hand_soft').defaultsTo(0);
      twitter_incidents.boolean('empty_hand_hard').defaultsTo(0);
      twitter_incidents.boolean('less_lethal_methods').defaultsTo(0);
      twitter_incidents.boolean('lethal_force').defaultsTo(0);
      twitter_incidents.boolean('uncategorized').defaultsTo(0);
      twitter_incidents.boolean('pending').defaultsTo(1);
      twitter_incidents.boolean('approved').defaultsTo(0);
      twitter_incidents.boolean('rejected').defaultsTo(0);
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('incidents')
    .dropTableIfExists('twitter_incidents');
};
