exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('force_ranks', (incidents) => {
      incidents.increments('incident_id');
      incidents.date('incident_date').notNullable();
      incidents.string('tweet_id');
      incidents.string('user_name');
      incidents.varchar('description', 10000).notNullable();
      incidents.string('city').defaultTo(null);
      incidents.string('state').defaultTo(null);
      incidents.float('lat').defaultTo(null);
      incidents.float('long').defaultTo(null);
      incidents.string('title').defaultTo(null);
      incidents.string('force_rank').notNullable();
      incidents.string('status').defaultTo('pending').notNullable();
      incidents.float('confidence');
      incidents.string('tags');
      incidents.string('src', 8000);
    });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('force_ranks');
};
