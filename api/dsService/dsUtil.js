const axios = require('axios');
const knex = require('../../data/db-config');
const Incidents = require('../incidents/incidentsModel');
const dsURL = process.env.DS_API_URL;
const dsTwitterURL = process.env.DS_API_TWITTER_URL;

module.exports = {
  dsInitialFetch,
  dsUpdateFetch,
  dsTwitterInitialFetch,
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

/**
 * This function is used to refresh data from the REDDIT API
 * Data source: DS API
 */
function dsUpdateFetch(lastKnownId) {
  const incomingNewIncidents = [];
  return axios
    .get(`${dsURL}?last_id_added=${lastKnownId}`)
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

        incomingNewIncidents.push(newIncident);
      });

      const chunkSize = 30;
      knex
        .batchInsert('incidents', incomingNewIncidents, chunkSize)
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

function dsTwitterInitialFetch() {
  const incomingTwitterIncidents = [];

  return axios
    .get(`${dsTwitterURL}`)
    .then((response) => {
      response.data.forEach((incident) => {
        let newIncident = {
          id: incident.id,
          date: incident.created,
          user_name: incident.user_name,
          user_description: incident.user_description,
          user_location: incident.user_location,
          coordinates: incident.coordinates,
          geo: incident.geo,
          incident_id: incident.id_str,
          src: incident.source,
          desc: incident.text,
          language: incident.language,
          force_rank: incident.category,
          pending: true,
          approved: false,
          rejected: false,
        };

        incomingTwitterIncidents.push(newIncident);
      });

      const chunkSize = 30;
      knex
        .batchInsert('twitter_incidents', incomingTwitterIncidents, chunkSize)
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
