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
  const incidents = await db('force_ranks').orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = JSON.parse(incident.src);
    return incident;
  });
  return formattedIncidents;
}
/**
 * @param {string} id
 * Function to return a specific incident by provided id
 */
async function getIncidentById(id) {
  const [incident] = await db('force_ranks').where('incident_id', id);
  incident.tags = JSON.parse(incident.tags);
  incident.src = JSON.parse(incident.src);
  return incident;
}
/**
 *
 * @param {number} limit
 * Returns incidents in the database sorted by newest incident first limited by the number defined in limit parameter
 */
async function getTimelineIncidents(limit) {
  const incidents = await db('force_ranks')
    .where({ status: 'approved' })
    .whereNot({ incident_date: null })
    .orderBy('incident_date', 'desc')
    .limit(limit);

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = JSON.parse(incident.src);
    return incident;
  });
  return formattedIncidents;
}
/**
 * Returns all pending Twitter incidents in the db sorted by newest incident first
 */
async function getAllPendingIncidents() {
  const incidents = await db('force_ranks')
    .where({ status: 'pending' })
    .orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = JSON.parse(incident.src);
    return incident;
  });
  return formattedIncidents;
}
/**
 * Returns all rejected Twitter incidents in the db sorted by newest incident first
 */
async function getAllRejectedIncidents() {
  const incidents = await db('force_ranks')
    .where({ status: 'rejected' })
    .orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = JSON.parse(incident.src);
    return incident;
  });
  return formattedIncidents;
}
/**
 * Returns all approved Twitter incidents in the db sorted by newest incident first
 */
async function getAllApprovedIncidents() {
  const incidents = await db('force_ranks')
    .where({ status: 'approved' })
    .orderBy('incident_date', 'desc');

  const formattedIncidents = incidents.map((incident) => {
    incident.tags = JSON.parse(incident.tags);
    incident.src = JSON.parse(incident.src);
    return incident;
  });
  return formattedIncidents;
}
/**
 * Returns the last known id in the database
 */
function getLastID() {
  return db('force_ranks').max('incident_id');
}
/**
 * @param {object} incident
 * Helper function for individual incident insertion
 * Ideally google maps API can take city/state and populate lat/long on backend.
 */
async function createIncident(incident) {
  const newMax = await db('force_ranks').max('incident_id').first();
  const { max } = newMax;
  const newIncidentId = max + 1;

  const newIncident = {
    incident_id: newIncidentId,
    incident_date: incident.incident_date,
    tweet_id: incident.tweet_id || null,
    city: incident.city || null,
    state: incident.state || null,
    lat: incident.lat || null,
    long: incident.long || null,
    title: incident.title || null,
    description: incident.description,
    tags: JSON.stringify(incident.tags) || null,
    force_rank: incident.force_rank,
    confidence: incident.confidence || null,
    status: incident.status || 'approved',
    user_name: incident.user_name || null,
    src: JSON.stringify(incident.src) || null,
  };

  const result = await db('force_ranks').insert(newIncident);
  result.newIncidentId = newIncidentId;
  return result;
}
/**
 * @param {string} id
 * @param {Object} changes
 * Function to Edit and return a specific Twitter incident by provided id
 */
async function updateIncident(id, changes) {
  if (changes.src) changes.src = JSON.stringify(changes.src); // ignore
  if (changes.tags) changes.tags = JSON.stringify(changes.tags); // ignore
  try {
    await db('force_ranks').where('incident_id', id).update(changes); //update the incident on force_ranks
    const incident = await db('force_ranks').where('incident_id', id).first();
    const conversation = await db('conversations')
      .where('incident_id', id)
      .first();
    if (
      conversation &&
      (incident.status === 'approved' || incident.status === 'rejected')
    ) {
      await db('conversations')
        .where('incident_id', id)
        .update('conversation_status', 13);
    }
    return getIncidentById(id);
  } catch (error) {
    console.log('error in ');
  }
}
/**
 * Utility function to clear database contents
 */
async function deleteDB() {
  return await db('force_ranks').del();
}
/**
 * Utility function to delete single incident
 */
function deleteIncident(id) {
  return db('force_ranks').where('incident_id', id).del();
}
