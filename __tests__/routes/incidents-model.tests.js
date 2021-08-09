const db = require('../../data/db-config');
const Incidents = require('../../api/allIncidents/incidentsModel');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
