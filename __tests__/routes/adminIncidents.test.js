const request = require('supertest');
const db = require('../../data/db-config');
const Incidents = require('../../api/allIncidents/incidentsModel');
const server = require('../../api/allIncidents/adminIncidentsRouter');

describe('sanity', () => {
  it('checks for basic testing sanity', async () => {
    expect(true).toBeTruthy();
  });
});

describe('[GET] /dashboard/incidents', () => {
  it('returns a status 200 OK', async () => {
    const res = await request(server).get('/incidents');
    expect(res.status).toBe(200);
  });
});
