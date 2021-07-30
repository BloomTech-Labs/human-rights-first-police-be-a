var dotenv = require('dotenv');
dotenv.config({ path: '.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.LOCAL_DATABASE,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: 'pg',
    connection: process.env.DS_DATABASE_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DS_DATABASE_URL,
      ssl: true,
    },
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },
};
