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

  it('returns only Pending incidents', async () => {
    const res = await request(server).get('/dashboard/incidents/');
    let pending = 0;
    for (let i = 0; i < res.body.length; i++) {
      if (res.body[i].status == 'pending') {
        pending += 1;
      }
    }
    console.log(pending);
    expect(res.body.length).toBe(pending);
  });
});

//Checks getAllApprovedIncidents inside Admin Router
describe('[GET] /dashboard/incidents/approved', () => {
  it('returns a status 200 OK', async () => {
    const res = await request(server).get('/dashboard/incidents/approved');
    expect(res.status).toBe(200);
  });

  it('returns only Approved incidents', async () => {
    const res = await request(server).get('/dashboard/incidents/approved');
    let approved = 0;
    for (let i = 0; i < res.body.length; i++) {
      if (res.body[i].status == 'approved') {
        approved += 1;
      }
    }
    console.log(approved);
    expect(res.body.length).toBe(approved);
  });
});
