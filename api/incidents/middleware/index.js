const db = require('../../../data/db-config');

module.exports = {
  validateIncidents,
};

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
