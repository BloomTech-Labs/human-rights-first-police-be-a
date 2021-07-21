exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('incidents', (incidents) => {
      incidents.increments('incident_id');
      incidents.date('incident_date').notNullable();
      incidents.string('tweet_id').notNullable();
      incidents.string('user_name').notNullable();
      incidents.varchar('desc', 10000).notNullable();
      incidents.string('city').defaultTo(null);
      incidents.string('state').defaultTo(null);
      incidents.float('lat').defaultTo(null);
      incidents.float('long').defaultTo(null);
      incidents.string('title').defaultTo(null);
      incidents.string('force_rank').notNullable();
      incidents.string('status').defaultTo('pending').notNullable();
      incidents.float('confidence');
      incidents.string('tags').notNullable();
      incidents.string('src');
    })
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('incidents')
    .dropTableIfExists('twitter_incidents') //To remove older db table
    .dropTableIfExists('incidents_new') //To remove older db table
    .dropTableIfExists('twitter_incidents_new') //To remove older db table
    .dropTableIfExists('profiles');
};
