exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('incidents', (incidents) => {
      incidents.increments('id');
      incidents.date('date_created');
      incidents.string('tweet_id');
      incidents.string('user_name');
      incidents.varchar('desc', 10000);
      incidents.string('city').defaultTo(null);
      incidents.string('state').defaultTo(null);
      incidents.float('lat').defaultTo(null);
      incidents.float('long').defaultTo(null);
      incidents.string('title').defaultTo(null);
      incidents.string('force_rank');
      incidents.string('status').defaultTo('pending');
      incidents.float('confidence');
      incidents.string('tags');
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
    .dropTableIfExists('profiles');
};
