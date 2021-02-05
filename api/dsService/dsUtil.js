const axios = require('axios');
const knex = require('../../data/db-config');
const Incidents = require('../incidents/incidentsModel');

const dsURL = process.env.DS_API_URL;

module.exports = {
  dsInitialFetch,
  dsFetch,
};
/**
 * This function is used for the initial population of an empty database
 * Data source: DS API
 */
function dsInitialFetch() {
  const incomingIncidents = [];

  return axios
    .get(`${dsURL}/getdata/`)
    .then((response) => {
      response.data.forEach((incident) => {
        let newIncident = {
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
 * This function is for regular updates supplying new data from DS API
 * This function has not been fully tested due to issues with DS API in absense of DS team to resolve
 */
function dsFetch() {
  // gets current date and formats it
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}-${mm}-${dd}`;
  // end date format

  return axios
    .get(`${dsURL}getdata/?date_added=${today}`)
    .then((response) => {
      response.data.forEach((incident) => {
        Incidents.createIncident(incident);
      });
    })
    .catch((error) => {
      return error;
    });
}
