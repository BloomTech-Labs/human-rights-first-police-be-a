const db = require('../../data/db-config')
const Incidents = require('../../api/allIncidents/incidentsModel');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('force_ranks').del();
  await db.seed.run();
});

describe('initial test', () => {
  test('app should run as expected', () => {
    expect(true).not.toBe(false);
  });
});

describe('main tests', () => {
  test('update information as specified', async () => {
    const incidentOne = await Incidents.getIncidentById(1);
    console.log(incidentOne);
    const changes = { user_name: 'test'};
    const i1update = await Incidents.updateIncident(1, changes);
    expect(changes).not.toBe(incidentOne.user_name);
  });
});
