const authRequired = require('./authRequired');
const checkIncidentExists = require('./checkIncidentExists');
const {
  validateAndSanitizeIncidentQueries,
  validateAndSanitizeIncidentObject,
} = require('./validation');

module.exports = {
  authRequired,
  checkIncidentExists,
  validateAndSanitizeIncidentQueries,
  validateAndSanitizeIncidentObject,
};
