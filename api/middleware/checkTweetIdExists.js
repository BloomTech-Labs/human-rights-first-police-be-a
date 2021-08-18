const Incidents = require('../allIncidents/incidentsModel');

const checkTweetIdExists = (req, res, next) => {
  const id = req.params.tweet_id;

  !id
    ? next({
        status: 404,
        message: `incident with tweet_id ${id} not found`,
      })
    : Incidents.getIncidentByTweetId(id)
        .then((incident) => {
          if (incident) {
            req.incident = incident;
            next();
          } else {
            next({
              status: 404,
              message: `incident with tweet_id ${id} not found`,
            });
          }
        })
        .catch(() => res.status(500).json('Request Error'));
};

module.exports = checkTweetIdExists;
