const db = require('../../data/db-config');
const Incidents = require('../../api/allIncidents/incidentsModel');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('force_ranks').del();
  await db.seed.run();
});

describe('tests incident model functions', () => {
  test('getsIncidentById returns the incident by the given id', async () => {
    await Incidents.getIncidentById(1);
    expect.objectContaining({
      incident_id: 1,
      incident_date: '2021-03-01T00:00:00.000Z',
      tweet_id: '1366291653267513344',
      user_name: 'shafiur',
      description:
        '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
      city: 'San Francisco',
      state: 'CA',
      lat: null,
      long: null,
      title: null,
      force_rank: 'Rank 2 - Empty-hand',
      status: 'pending',
      confidence: 20,
      tags: ['police', 'kick', 'beat'],
      src: [
        'https://vimeo.com/540571411',
        'https://twitter.com/warpspdskeleton/status/1387075760805060609',
      ],
    });
  });
  test('getIncidents returns all incidents', async () => {
    let getAll = await Incidents.getIncidents();
    expect(getAll).toHaveLength(5);
  });
  test('getAllApprovedIncidents returns all approved incidents', async () => {
    let getApproved = await Incidents.getAllApprovedIncidents();
    expect(getApproved).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: 'approved' })])
    );
  });
  test('getAllRejectedIncidents returns all rejected incidents', async () => {
    let getRejected = await Incidents.getAllRejectedIncidents();
    expect(getRejected).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: 'rejected' })])
    );
  });
  test('getAllPendingIncidents returns all pending incidents', async () => {
    let getPending = await Incidents.getAllPendingIncidents();
    expect(getPending).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: 'pending' })])
    );
  });
});
