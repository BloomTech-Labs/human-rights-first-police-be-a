const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  checkIncidentExists,
  validateAndSanitizeIncidentQueries,
} = require('../middleware');

// TODO document shape of objects coming and going

/**
 * @swagger
 * /:
 *  GET:
 *    Summary: Path returning all approved incidents in reverse chronological order
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success ... returns an array of incident objects
 *      500:
 *        description: Server response error
 */

router.get('/', validateAndSanitizeIncidentQueries, (req, res, next) => {
  Incidents.getAllApprovedIncidents()
    .then((incidents) => {
      res.status(200).json(incidents);
    })
    .catch(() => next({ status: 500 }));
});

/**
 * @swagger
 * /{incident_id}:
 *  GET:
 *    Summary: Path returning single incident by incident_id
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success ... returns incident object
 *      500:
 *        description: Server response error
 */

router.get('/:incident_id', checkIncidentExists, (req, res, next) => {
  let incident = req.incident;
  if (incident.status === 'approved') {
    res.status(200).json(incident);
  } else {
    next({ status: 400, message: 'Incident unavailable' });
  }
});

// router.get('/gettimeline', (req, res, next) => {
//   let limit = req.query.limit || 5;

//   Incidents.getTimelineIncidents(limit)
//     .then((incidents) => {
//       const queryResponse = incidents.map((incident) => {
//         incident.src = JSON.parse(in)
//       })
//     })
// });

// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Database Error' });
});

module.exports = router;
