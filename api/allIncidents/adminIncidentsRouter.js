const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  authRequired,
  checkIncidentExists,
  validateAndSanitizeIncidentObject,
} = require('../middleware');

// TODO document shape of objects coming and going
router.use(authRequired);

/**
 * @swagger
 * /:
 *  GET:
 *    Summary: Path returning all pending incidents in reverse chronological order
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
router.get('/incidents', async (req, res, next) => {
  Incidents.getAllPendingIncidents()
    .then((incidents) => {
      res.status(200).json(incidents);
    })
    .catch(next);
});

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
router.get('/incidents/approved', async (req, res, next) => {
  Incidents.getAllApprovedIncidents()
    .then((incidents) => {
      res.status(200).json(incidents);
    })
    .catch(next);
});

/**
 * @swagger
 * /:
 *  GET:
 *    Summary: Path returning all rejected incidents in reverse chronological order
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
router.get('/incidents/rejected', async (req, res, next) => {
  Incidents.getAllRejectedIncidents()
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

router.get('/incidents/:incident_id', checkIncidentExists, async (req, res) => {
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

router.put('/incidents/:incident_id', checkIncidentExists, (req, res, next) => {
  const id = req.incident.incident_id;

  Incidents.updateIncident(id, req.body)
    .then((updatedIncident) => {
      res.status(201).json(updatedIncident);
    })
    .catch(next);
});

/**
 * @swagger
 * /{incident_id}:
 *  PUT:
 *    Summary: Path for batch updating multiple incidents
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

router.put('/incidents', async (req, res) => {
  const changes = req.body;
  try {
    await changes.forEach((change) => {
      Incidents.updateIncident(change.incident_id, change);
    });
    res.status(201).json({ message: 'Incidents Successfully Updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.post(
  '/incidents',
  validateAndSanitizeIncidentObject,
  async (req, res, next) => {
    Incidents.createIncident(req.sanitizedIncident)
      .then(() => {
        res.status(201).json({ message: 'Incident Successfully Created' });
      })
      .catch(next);
  }
);

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

router.delete(
  '/incidents/:incident_id',
  checkIncidentExists,
  async (req, res, next) => {
    const id = req.incident.incident_id;

    Incidents.deleteIncident(id)
      .then(() => {
        res.status(200).json({ message: 'Incident Successfully Deleted' });
      })
      .catch(next);
  }
);

// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Database Error', stack: err.stack });
});

module.exports = router;
