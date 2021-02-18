const db = require('../../data/db-config');

module.exports = {
  getAllPendingIncidents,
  getTwitterIncidentById,
};

/**
 * Returns all incidents in the db sorted by newest incident first
 */
function getAllPendingIncidents() {
  return db('twitter_incidents')
    .where({ pending: true })
    .orderBy('date', 'desc');
}

/**
 * @param {string} id
 * Function to return a specific incident by provided id
 */
function getTwitterIncidentById(id) {
  return db('twitter_incidents').where('incident_id', id);
}
