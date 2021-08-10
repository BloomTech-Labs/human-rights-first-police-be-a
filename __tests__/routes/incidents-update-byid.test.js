const request = require('supertest');
const server = require('../../api/allIncidents/incidentsRouter');

describe('initial test', () => {
  it('app should run as expected', () => {
    expect(true).not.toBe(false);
  });
});

describe('main tests', () => {
  it('should fetch correct DB data', async () => {
    const res = await request(server).get('/incidents/getincidents');
    expect(res.status).toBe(200);
  });
});
