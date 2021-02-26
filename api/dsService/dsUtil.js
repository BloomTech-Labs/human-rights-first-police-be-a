const axios = require('axios');
const knex = require('../../data/db-config');
const Incidents = require('../incidents/incidentsModel');
const Helper = require('../incidents/incidentsModel');
const dsURL = process.env.DS_API_URL;

module.exports = {
  dsInitialFetch,
  dsUpdateFetch,
};
/**
 * This function is used for the initial population of an empty database
 * Data source: DS API
 */
function dsInitialFetch() {
  const incomingIncidents = [];

  return axios
    .get(`${dsURL}`)
    .then((response) => {
      response.data.forEach((incident) => {
        let newIncident = {
          id: incident.id,
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
          added_on: incident.added_on,
          force_rank: incident.force_rank,
        };

        incomingIncidents.push(newIncident);
      });

      const chunkSize = 30;
      knex
        .batchInsert('incidents', incomingIncidents, chunkSize)
        .then((batchResponse) => {
          return {
            status: 201,
            message: 'Batch insertion success',
          };
        })
        .catch((error) => {
          return {
            status: 500,
            message: 'Batch insertion failed',
            error: error,
          };
        });
    })
    .catch((err) => {
      console.log('Server Error', err);
    });
}

const getLastRedditID = async () => {
  try {
    const [lastKnownId] = await Helper.getLastID();
    console.log('IM RUNNING', lastKnownId);
    return lastKnownId;
  } catch (error) {
    console.log('Error retrieving last id', error.message);
  }
};

function dsUpdateFetch() {
  const incomingNewIncidents = [];
  const last = getLastRedditID();
  return axios
    .get(`${dsURL}/last_id_added=${last}`)
    .then((response) => {
      response.data.forEach((incident) => {
        let newIncident = {
          id: incident.id,
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
          added_on: incident.added_on,
          force_rank: incident.force_rank,
        };

        incomingIncidents.push(newIncident);
      });

      const chunkSize = 30;
      knex
        .batchInsert('incidents', incomingIncidents, chunkSize)
        .then((batchResponse) => {
          return {
            status: 201,
            message: 'Batch insertion success',
          };
        })
        .catch((error) => {
          return {
            status: 500,
            message: 'Batch insertion failed',
            error: error,
          };
        });
    })
    .catch((err) => {
      console.log('Server Error', err);
    });
}
