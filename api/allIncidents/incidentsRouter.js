const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const { validateQueries } = require('../middleware'); //TODO add query validation

// get approved incidents
// model:
// explicitly limited to approved incidents
// takes req.{state, start-end dates}

/**
 * @swagger
 * /incidents:
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

router.get('/', validateQueries, async (req, res, next) => {
  const sanitizedQueries = { ...req.sanitizedQueries };

  try {
    const incidents = await Incidents.getApprovedIncidents(sanitizedQueries);

    res.status(200).json(incidents);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
});

/**
 * @swagger
 * /incidents/{incident_id}:
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

router.get('/:incident_id', validateQueries, async (req, res, next) => {
  const id = req.params.incident_id;

  try {
    const incident = await Incidents.getApprovedIncidentById(id);

    res.status(200).json(incident);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
});