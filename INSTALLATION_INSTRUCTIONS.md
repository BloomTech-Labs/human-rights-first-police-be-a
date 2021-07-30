## Requirements

All [Labs Engineering Standards](https://labs.lambdaschool.com/topics/node-js/) must be followed.

## Getting Started

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
- `BE_DATABASE_URL` - connection string for deprecated postgres database. This is being payed for for no reason.
- `DS_DATABASE_URL` - connection string for ds database we are currently connected to
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.
- `LOCAL_DATABASE` - connection string for your local database

## Although the backend is pulling from the data science database, the updated_table migration reflects the same table schema for testing purposes.

### Setup postgres

There are 2 options to get postgresql installed locally [Choose one]:

1. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
   - make note of the port, username and password you use to setup the database.
   - Connect your client to the server manually using the values previously mentioned
   - You will need to create a database manually using a client.
   - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
2. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
   - Sign up for a free `Tiney Turtle` plan
   - copy the URL to the LOCAL_DATABASE .env variable
   - make sure to add `?ssl=true` to the end of this url

### Setup the application

- run: `npm install` to download all dependencies.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass. Currently only sanity checks.
- run: `npm run server` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

## Contributing

### ESLint and prettier

[ESLint](https://eslint.org/) and [prettier](https://prettier.io/) are already
configured with Lambda Labs standards and ready to go. These must be ran from
the CLI prior to committing code in the following ways:

- `npm run lint` to view all purposed fixes.
- `npm run lint:fix` to apply fixes to eslint issues.
- `npm run format` to apply the standards defined by eslint/prettier config.

Alternatively you can install plugins for your editor of choice to bypass running these commands.
