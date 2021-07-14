const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const { validateQueries, authRequired }  }= require('../middleware'); //TODO add query validation



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

 router.get('/all', authRequired, async (req, res, next) => {
  const sanitizedQueries = req.sanitizedQueries;

  try {
    const incidents = await Incidents.getApprovedIncidents(sanitizedQueries);

    res.json(incidents);
  } catch {
    res.status(500).json({ message: 'Request Error' });
  }
});