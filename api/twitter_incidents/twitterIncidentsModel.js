const db = require('../../data/db-config');

module.exports = {
  getAllPendingIncidents,
  getAllRejectedIncidents,
  getAllApprovedIncidents,
  getTwitterIncidentById,
};

/**
 * Returns all pending Twitter incidents in the db sorted by newest incident first
 */
function getAllPendingIncidents() {
  return db('twitter_incidents')
    .where({ pending: true })
    .orderBy('date', 'desc');
}
/**
 * Returns all rejected Twitter incidents in the db sorted by newest incident first
 */
function getAllRejectedIncidents() {
  return db('twitter_incidents')
    .where({ rejected: true })
    .orderBy('date', 'desc');
}
/**
 * Returns all approved Twitter incidents in the db sorted by newest incident first
 */
function getAllApprovedIncidents() {
  return db('twitter_incidents')
    .where({ approved: true })
    .orderBy('date', 'desc');
}
/**
 * @param {string} id
 * Function to return a specific incident by provided id
 */
function getTwitterIncidentById(id) {
  return db('twitter_incidents').where('incident_id', id);
}
