const db = require('../../data/db-config');

module.exports = {
  getAllIncidents,
  getIncidentById,
  createIncident,
  deleteDB,
};

async function getAllIncidents() {
  return await db('incidents');
}

// this set of queries will require some updates
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

async function deleteDB() {
  return await db('incidents').del();
}

function getIncidentById(id) {
  return db('incidents').where('incident_id', id);
}