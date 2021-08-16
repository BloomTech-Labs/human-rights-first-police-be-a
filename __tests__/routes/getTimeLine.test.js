const request = require('supertest');
const server = require('../../api/app');

describe('[Get] Testing incidents/gettimeline ', () => {
  it('Should return a 200 status', async () => {
    const res = await request(server).get('/incidents/gettimeline');
    expect(res.status).toBe(200);
  });

  it('Should return an incident with an id# 3 ', async () => {
    const res = await request(server).get('/incidents/gettimeline');
    const response = res.body[0];
    expect(response.incident_id).toBe(3);
  });
  it('Should return an array with a length of 2 ', async () => {
    const res = await request(server).get('/incidents/gettimeline');
    expect(res.body).toHaveLength(2);
  });
});
