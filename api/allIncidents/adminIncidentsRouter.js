const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  validateQueries,
  authRequired,
  checkIncidentExists,
  validateIncident,
} = require('../middleware'); //TODO add query validation

/**
 * @swagger
 * /incidents:
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

router.use(authRequired);

router.get('/', validateQueries, async (req, res, next) => {
  const sanitizedQueries = req.sanitizedQueries;

  try {
    const incidents = await Incidents.getIncidents(sanitizedQueries);

    res.json(incidents);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
});

router.get('/:incident_id', checkIncidentExists, async (req, res, next) => {
  const { id } = req.params.incident_id;

  try {
    const incident = await Incidents.getIncidentById(id);

    res.status(200).json(incident);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
});

router.put(
  '/incidents/:id',
  checkIncidentExists,
  validateIncident,
  async (req, res) => {
    const { id } = req.params;
    const changes = req.sanitizedIncident;
    try {
      const updatedIncident = await Incidents.updateIncident(id, changes);
      res.status(201).json(updatedIncident);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
