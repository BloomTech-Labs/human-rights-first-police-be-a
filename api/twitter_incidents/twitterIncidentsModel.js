const db = require('../../data/db-config');

module.exports = {
  getAllPendingIncidents,
  getAllRejectedIncidents,
  getAllApprovedIncidents,
  getLastID,
  getTwitterIncidentById,
  updateTwitterIncident,
  cleanTwitterIncident,
  createTwitterIncident,
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
 * Returns the last known id in the database
 */
function getLastID() {
  return db('twitter_incidents').max('server_id');
}
/**
 * @param {string} id
 * Function to return a specific Twitter incident by provided id
 */
function getTwitterIncidentById(id) {
  return db('twitter_incidents').where('server_id', id);
}

/**
 * @param {string} id
 * @param {Object} changes
 * Function to Edit and return a specific Twitter incident by provided id
 */
async function updateTwitterIncident(id, changes) {
  try {
    await db('twitter_incidents').where('server_id', id).update(changes);
    return db('twitter_incidents').where('server_id', id);
  } catch (error) {
    throw new Error(error.message);
  }
}
/**
 * @param {Object} incident
 * Function to Edit and return a specific Twitter incident by provided id
 */
async function createTwitterIncident(incident) {
  try {
    await db('twitter_incidents').insert(incident);
    return 'New incident Created';
  } catch (error) {
    throw new Error(error.message);
  }
}
/**
 * @param {Object} twitterIncident
 * Retuns Twitter incident that matches the shape of the Reddit incident
 */

function cleanTwitterIncident(twitterIncident) {
  twitterIncident.map((incident) => {
    incident.src = JSON.parse(incident.src);
    incident.categories = JSON.parse(incident.categories);
    return incident;
  });
}
