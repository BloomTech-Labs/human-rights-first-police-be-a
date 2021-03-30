// const dotenv = require('dotenv');
// dotenv.config({ path: '../.env' });
// const pg = require('pg')

// const localConnection = process.env.localConnectionpwd
// //const localConnection = 'postgresql://localhost/deployedHRF'

// if (process.env.DATABASE_URL) {
//   pg.defaults.ssl = { rejectUnauthorized: false }
//   connection = process.env.DATABASE_URL;
// } else {
//   connection = localConnection
// }

// const sharedConfig = {
//   client: 'pg',
//   connection,
//   migrations: { directory: "../data/migrations" },
//   seeds: { directory: "../data/seeds" },
// };

// module.exports = {
//   development: { ...sharedConfig },
  
//   test: { ...sharedConfig },
  
//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     migrations: { directory: '../data/migrations' },
//     seeds: { directory: '../data/seeds' },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//   },
// };


var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.LOCAL_DATABASE,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
  },
};