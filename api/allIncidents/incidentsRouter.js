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
  const sanitizedQueries = req.sanitizedQueries;

  Incidents.getApprovedIncidents(sanitizedQueries)
    .then((incidents) => {
      res.status(200).json(incidents);
    })
    .catch(() => next(res.status(500)));
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
  if (req.incident.status === 'approved') {
    res.status(200).json(req.incident);
  } else {
    next({ status: 400, message: 'Incident unavailable' });
  }
});

// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Database Error' });
});

module.exports = router;
