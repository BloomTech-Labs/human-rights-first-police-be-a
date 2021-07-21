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
    .whereNot({ date: null })
    .orderBy('incident_date', 'desc');
}
/**
 * @param {string} id
 * Function to return a specific incident by provided id
 */
function getIncidentById(id) {
  return db('incidents').where('incident_id', id);
}
/**
 *
 * @param {number} limit
 * Returns incidents in the database sorted by newest incident first limited by the number defined in limit parameter
 */
async function getTimelineIncidents(limit) {
  return await db('incidents')
    .whereNot({ date: null })
    .orderBy('incident_date', 'desc')
    .limit(limit);
}
/**
 * Returns all pending Twitter incidents in the db sorted by newest incident first
 */
function getAllPendingIncidents() {
  return db('incidents')
    .where({ status: 'pending' })
    .orderBy('incident_date', 'desc');
}
/**
 * Returns all rejected Twitter incidents in the db sorted by newest incident first
 */
function getAllRejectedIncidents() {
  return db('incidents')
    .where({ status: 'rejected' })
    .orderBy('incident_date', 'desc');
}
/**
 * Returns all approved Twitter incidents in the db sorted by newest incident first
 */
function getAllApprovedIncidents() {
  return db('incidents')
    .where({ status: 'approved' })
    .orderBy('incident_date', 'desc');
}
/**
 * Returns the last known id in the database
 */
function getLastID() {
  return db('incidents').max('id');
}
/**
 * @param {object} incident
 * Helper function for individual incident insertion
 */
async function createIncident(incident) {
  const newIncident = {
    incident_date: incident.incident_date,
    incident_id: incident.incident_id,
    city: incident.city,
    state: incident.state,
    lat: incident.lat,
    long: incident.long,
    title: incident.title,
    desc: incident.desc,
    tags: JSON.stringify(incident.tags),
    force_rank: incident.force_rank,
    confidence: incident.confidence,
    status: incident.status,
    username: incident.username,
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
    await db('incidents').where('id', id).update(changes);
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

function deleteIncident(id) {
  return db('incidents').where({ id }).del();
}
