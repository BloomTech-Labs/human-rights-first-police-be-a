const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  validateAndSanitizeIncidentQueries,
  authRequired,
  checkIncidentExists,
  validateIncident,
} = require('../middleware');

//TODO add/build middleware
// TODO document shape of objects coming and going

router.use(authRequired);

/**
 * @swagger
 * /:
 *  GET:
 *    Summary: Path returning all incidents in reverse chronological order and filtered according to req.queries:
 *      {
 *        state: string,
 *        startDate: number,
 *        endDate: number,
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

router.get('/', validateAndSanitizeIncidentQueries, async (req, res, next) => {
  const sanitizedQueries = req.sanitizedQueries;

  Incidents.getIncidents(sanitizedQueries)
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

router.get('/:incident_id', checkIncidentExists, async (req, res, next) => {
  res.status(200).json(req.incident);
});

/**
 * @swagger
 * /{incident_id}:
 *  PUT:
 *    Summary: Path updating single incident by incident_id
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Success ... returns updated incident object
 *      500:
 *        description: Server response error
 */

router.put(
  '/:incident_id',
  checkIncidentExists,
  validateIncident,
  (req, res, next) => {
    const id = req.incident.incident_id;

    Incidents.updateIncident(id, req.sanitizedIncident)
      .then((updatedIncident) => {
        res.status(201).json(updatedIncident);
      })
      .catch(next);
  }
);

/**
 * @swagger
 * /{incident_id}:
 *  POST:
 *    Summary: Path posting new incident
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Success ... returns new incident object
 *      500:
 *        description: Server response error
 */

router.post('/', validateIncident, async (req, res, next) => {
  Incidents.createIncident(req.sanitizedIncident)
    .then((newIncident) => {
      res.status(201).json(newIncident);
    })
    .catch(next);
});

/**
 * @swagger
 * /{incident_id}:
 *  DELETE:
 *    Summary: Path deleting incident by id
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success ... returns new incident object
 *      500:
 *        description: Server response error
 */

router.delete('/:incident_id', checkIncidentExists, async (req, res, next) => {
  const id = req.incident.incident_id;
  const deletedIncident = req.incident;

  Incidents.delete(id)
    .then(() => {
      res.status(200).json(deletedIncident);
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Database Error', stack: err.stack });
});

module.exports = router;
