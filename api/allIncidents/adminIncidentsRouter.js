const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  validateQueries,
  authRequired,
  checkIncidentExists,
  validateIncident,
} = require('../middleware');

//TODO add/build middleware
// TODO refractor error handling into single error handler
// ? Admin gets direct error messages from database?
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

router.get('/', validateQueries, async (req, res, next) => {
  const sanitizedQueries = req.sanitizedQueries;

  try {
    const incidents = await Incidents.getIncidents(sanitizedQueries);

    res.json(incidents);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
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
  const id = req.params.incident_id;

  try {
    const incident = await Incidents.getIncidentById(id);

    res.status(200).json(incident);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
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
  async (req, res) => {
    const id = req.params.incident_id;
    const changes = req.sanitizedIncident;
    try {
      const updatedIncident = await Incidents.updateIncident(id, changes);
      res.status(201).json(updatedIncident);
    } catch (error) {
      res.status(500).json({ message: 'Request Error' });
    }
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

router.post('/', validateIncident, async (req, res) => {
  try {
    const newIncident = await Incidents.createIncident(req.sanitizedIncident);
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ message: 'Request Error' });
  }
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
  const id = req.params.incident_id;

  try {
    const deletedIncident = await Incidents.delete(id);
    res.status(200).json(deletedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Request Error' });
  }
});

module.exports = router;
