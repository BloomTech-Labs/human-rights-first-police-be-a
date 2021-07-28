const Incidents = require('../allIncidents/incidentsModel');

const checkIncidentExists = (req, res, next) => {
  const id = Number(req.params.incident_id);

  isNaN(id)
    ? next({
        status: 404,
        message: `incident with incident_id ${id} not found`,
      })
    : Incidents.getIncidentById(id)
        .then((incident) => {
          if (incident) {
            req.incident = incident;
            next();
          } else {
            next({
              status: 404,
              message: `incident with incident_id ${id} not found`,
            });
          }
        })
        .catch(() => res.status(500).json('Request Error'));
};

module.exports = checkIncidentExists;
