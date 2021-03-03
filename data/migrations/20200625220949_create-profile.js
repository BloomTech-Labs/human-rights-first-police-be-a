exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('incidents', (incidents) => {
      incidents.integer('id').unique().primary().notNullable();
      incidents.date('date');
      incidents.date('added_on');
      incidents.text('src');
      incidents.string('incident_id');
      incidents.string('city').notNullable();
      incidents.string('state').notNullable();
      incidents.float('lat').notNullable();
      incidents.float('long').notNullable();
      incidents.string('title').notNullable();
      incidents.varchar('desc', 10000);
      incidents.string('categories');
      incidents.string('force_rank');
    })
    .createTable('twitter_incidents', (twitter_incidents) => {
      twitter_incidents.integer('id').unique().primary().notNullable();
      twitter_incidents.date('date');
      twitter_incidents.string('user_name');
      twitter_incidents.string('user_description');
      twitter_incidents.string('user_location');
      twitter_incidents.string('coordinates');
      twitter_incidents.string('geo');
      twitter_incidents.string('incident_id');
      twitter_incidents.string('src');
      twitter_incidents.string('city');
      twitter_incidents.string('state');
      twitter_incidents.float('lat');
      twitter_incidents.float('long');
      twitter_incidents.string('title');
      twitter_incidents.varchar('desc', 10000);
      twitter_incidents.string('language');
      twitter_incidents.string('force_rank');
      twitter_incidents.boolean('pending');
      twitter_incidents.boolean('approved');
      twitter_incidents.boolean('rejected');
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
    .dropTableIfExists('twitter_incidents')
    .dropTableIfExists('profiles');
};
