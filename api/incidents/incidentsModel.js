const db = require('../../data/db-config');

module.exports = {
  getAllIncidents,
  getIncidentById,
  getLastRedditID,
  createIncident,
  getTimelineIncidents,
  deleteDB,
};

/**
 * Returns all incidents in the db sorted by newest incident first
 */
async function getAllIncidents() {
  return await db('incidents').whereNot({ date: null }).orderBy('date', 'desc');
}

/**
 *
 * @param {number} limit
 * Returns incidents in the database sorted by newest incident first limited by the number defined in limit parameter
 */
async function getTimelineIncidents(limit) {
  return await db('incidents')
    .whereNot({ date: null })
    .orderBy('date', 'desc')
    .limit(limit);
}

/**
 * Returns the last known id in the database
 */
function getLastRedditID() {
  return db('incidents').max('id');
}

/**
 * @param {object} incident
 * Helper function for individual incident insertion
 */
async function createIncident(incident) {
  const newIncident = {
    incident_id: incident.case_id,
    src: JSON.stringify(incident.links),
    categories: JSON.stringify(incident.tags),
    city: incident.city,
    state: incident.state,
    title: incident.title,
    lat: incident.lat,
    long: incident.long,
    desc: incident.description,
    date: incident.dates,
    verbalization: incident.verbalization,
    empty_hand_soft: incident.empty_hand_soft,
    empty_hand_hard: incident.empty_hand_hard,
    less_lethal_methods: incident.less_lethal_methods,
    lethal_force: incident.lethal_force,
    uncategorized: incident.uncategorized,
  };
  return db('incidents').insert(newIncident);
}

/**
 * Utility function to clear database contents
 */
async function deleteDB() {
  return await db('incidents').del();
}

/**
 * @param {string} id
 * Function to return a specific incident by provided id
 */
function getIncidentById(id) {
  return db('incidents').where('incident_id', id);
}
