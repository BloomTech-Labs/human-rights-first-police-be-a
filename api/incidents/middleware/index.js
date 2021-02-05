const db = require('../../../data/db-config');

module.exports = {
  validateIncidents,
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * This middleware is not currently in use. Current schema elects to accept all incidents then we filtered out incidents if they were missing necessary keys on the client side
 */
function validateIncidents(req, res, next) {
  req.body = req.body.filter((incident) => {
    if (
      incident.lat &&
      incident.long &&
      incident.city &&
      incident.id &&
      incident.state &&
      incident.title &&
      incident.desc &&
      incident.date
    ) {
      const id = db('incidents').where('id', incident.id);
      if (!id[0]) return incident;
    }
  });
  next();
}
