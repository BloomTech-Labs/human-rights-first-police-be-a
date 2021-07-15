const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  validateAndSanitizeIncidentQueries,
  checkIncidentExists,
} = require('../middleware');

//TODO add query validation
// TODO document shape of objects coming and going

// get approved incidents
// model:
// explicitly limited to approved incidents
// takes req.{state, start-end dates}

/**
 * @swagger
 * /:
 *  GET:
 *    Summary: Path returning all approved incidents in reverse chronological order and filtered according to req.queries:
 *      {
 *        state: string,
 *        startDate: integer,
 *        endDate: integer,
 *        limit: integer
 *      }
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
  const sanitizedQueries = { ...req.sanitizedQueries };

  Incidents.getApprovedIncidents(sanitizedQueries)
    .then((incidents) => {
      res.status(200).json(incidents);
    })
    .catch(next);
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
  const id = req.params.incident_id;

  Incidents.getApprovedIncidentById(id)
    .then((incident) => {
      res.status(200).json(incident);
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Database Error' });
});
