const request = require('supertest');
const server = require('../../api/allIncidents/AdminIncidentsRouter');

describe('initial test', () => {
  test('app should run as expected', () => {
    expect(true).not.toBe(false);
  });
});

describe('main tests', () => {
  it('Should delete specific indicent', async () => {
    const resGet = await request(server).get('/incidents/4')
    const resDelete = await request(server).delete('/incidents/4');
    expect(resGet.body).toContainEqual(
      expect.objectContaining({ incident_id: 4 })
    );
    expect(resDelete.body).toBe(null);
  });
});
