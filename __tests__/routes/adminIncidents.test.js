const request = require('supertest');
const server = require('../../api/app');
const authRequired = require('../../api/middleware/authRequired');
jest.mock('../../api/middleware/authRequired');

// Allows you to pass Admin authentication
beforeEach(() => {
  authRequired.mockImplementation((req, res, next) => next());
});

describe('sanity', () => {
  it('checks for basic testing sanity', async () => {
    expect(true).toBeTruthy();
  });
});

//Checks getAllPendingIncidents inside Admin Router
describe('[GET] /dashboard/incidents', () => {
  it('returns a status 200 OK', async () => {
    const res = await request(server).get('/dashboard/incidents/');
    expect(res.status).toBe(200);
  });
});

//Checks getAllApprovedIncidents inside Admin Router
describe('[GET] /dashboard/incidents/approved', () => {
  it('returns a status 200 OK', async () => {
    const res = await request(server).get('/dashboard/incidents/approved');
    expect(res.status).toBe(200);
  });
});
