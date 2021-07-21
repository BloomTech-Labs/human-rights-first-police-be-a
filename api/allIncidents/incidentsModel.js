/* eslint-disable prettier/prettier */
const db = require('../../data/db-config');

module.exports = {
  getIncidents,
  getIncidentById,
  getTimelineIncidents,
  getAllPendingIncidents,
  getAllRejectedIncidents,
  getAllApprovedIncidents,
  getLastID,
  createIncident,
  updateIncident,
  deleteDB,
  deleteIncident,
};
/**
 * Returns all incidents in the db sorted by newest incident first
 */
async function getIncidents() {
  return await db('incidents')
    .whereNot({ incident_date: null })
    .orderBy('incident_date', 'desc');
}
/**
 * @param {string} id
 * Function to return a specific incident by provided id
 */
async function getIncidentById(id) {
  const [incident] = await db('incidents').where('incident_id', id);

  incident.tags = JSON.parse(incident.tags);
  incident.src = `https://twitter.com/${incident.user_name}/status/${incident.tweet_id}`;

  return [incident];
}
/**
 *
 * @param {number} limit
 * Returns incidents in the database sorted by newest incident first limited by the number defined in limit parameter
 */
async function getTimelineIncidents(limit) {
  const incidents = await db('incidents')
    .where({ status: 'approved' })
    .whereNot({ incident_date: null })
    .orderBy('incident_date', 'desc')
    .limit(limit);

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = `https://twitter.com/${incident.user_name}/status/${incident.tweet_id}`;
    delete incident.tweet_id;
    return incident;
  });

  return formattedIncidents;
}
/**
 * Returns all pending Twitter incidents in the db sorted by newest incident first
 */
async function getAllPendingIncidents() {
  const incidents = await db('incidents')
    .where({ status: 'pending' })
    .orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = `https://twitter.com/${incident.user_name}/status/${incident.tweet_id}`;
    delete incident.tweet_id;
    return incident;
  });

  return formattedIncidents;
}
/**
 * Returns all rejected Twitter incidents in the db sorted by newest incident first
 */
async function getAllRejectedIncidents() {
  const incidents = await db('incidents')
    .where({ status: 'rejected' })
    .orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = `https://twitter.com/${incident.user_name}/status/${incident.tweet_id}`;
    delete incident.tweet_id;
    return incident;
  });

  return formattedIncidents;
}
/**
 * Returns all approved Twitter incidents in the db sorted by newest incident first
 */
async function getAllApprovedIncidents() {
  const incidents = await db('incidents')
    .where({ status: 'approved' })
    .orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = `https://twitter.com/${incident.user_name}/status/${incident.tweet_id}`;
    delete incident.tweet_id;
    return incident;
  });

  return formattedIncidents;
}
/**
 * Returns the last known id in the database
 */
function getLastID() {
  return db('incidents').max('incident_id');
}
/**
 * @param {object} incident
 * Helper function for individual incident insertion
 * Ideally google maps API can take city/state and populate lat/long on backend.
 */
async function createIncident(incident) {
  const newIncident = {
    incident_date: incident.incident_date,
    tweet_id: incident.tweet_id,
    city: incident.city,
    state: incident.state,
    lat: incident.lat || null,
    long: incident.long || null,
    title: incident.title,
    desc: incident.desc,
    tags: JSON.stringify(incident.tags),
    force_rank: incident.force_rank,
    confidence: incident.confidence,
    status: incident.status,
    user_name: incident.user_name,
    src: JSON.stringify(incident.src),
  };
  return db('incidents').insert(newIncident);
}
/**
 * @param {string} id
 * @param {Object} changes
 * Function to Edit and return a specific Twitter incident by provided id
 */
async function updateIncident(id, changes) {
  try {
    await db('incidents').where('incident_id', id).update(changes);
    return getIncidentById(id);
  } catch (error) {
    throw new Error(error.message);
  }
}
/**
 * Utility function to clear database contents
 */
async function deleteDB() {
  return await db('incidents').del();
}
/**
 * Utility function to delete single incident
 */
function deleteIncident(id) {
  return db('incidents').where('incident_id', id).del();
}
