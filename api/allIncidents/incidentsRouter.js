const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const {
  checkIncidentExists,
  validateAndSanitizeIncidentQueries,
} = require('../middleware');

// ''' ---------> Incidents Routes <--------- '''
// ### GET /getincidents ###
// - returns all incidents in the BE database
// ⬇️ swagger docs code generation ⬇️
/**
 * @swagger
 * /incidents/getincidents:
 *  get:
 *    summary: path returning all incidents in database in reverse chronological order
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: success ... returns an array of incident objects
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - api
 *              properties:
 *                data:
 *                  type: array
 *                  example: [
  {
    incident_id: 1,
    incident_date: '2021-03-01T00:00:00.000Z',
    tweet_id: '1366291653267513344',
    user_name: 'shafiur',
    description:
      '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
    city: 'San Francisco',
    state: 'CA',
    lat: null,
    long: null,
    title: null,
    force_rank: 'Rank 2 - Empty-hand',
    status: 'pending',
    confidence: 20,
    tags: ['police','kick', 'beat',],
    src: [
      'https://vimeo.com/540571411',
      'https://twitter.com/warpspdskeleton/status/1387075760805060609',
    ]
  },
  {
    incident_id: 2,
    incident_date: '2021-03-01T00:00:00.000Z',
    tweet_id: '1366320977223835648',
    user_name: 'campbellclaret',
    description:
      "As pritipatel churns another 'lock 'em up' headline, remember - Tories have shut half of police stations, are refu… https://t.co/qqTF0hTtEd",
    city: null,
    state: null,
    lat: null,
    long: null,
    title: null,
    force_rank: 'Rank 2 - Empty-hand',
    status: 'pending',
    confidence: 30,
    tags: ['police', 'lock', 'shut',],
    src: [
      'https://twitter.com/osuala_cheyenne/status/1383915493040422914',
      'https://twitter.com/osuala_cheyenne/status/1384017009139077125',
      'https://twitter.com/osuala_cheyenne/status/1384017218309001220',
      'https://wtop.com/national/2021/04/video-louisville-officer-punches-protester-during-arrest/',
      'https://www.courier-journal.com/story/news/local/2021/04/18/breonna-taylor-video-shows-lmpd-cop-punching-protester-during-arrest/7279751002/',
    ]
  }
]
 *      500:
 *        description: Server response error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                -api
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Request Error"
 */
router.get(
  '/getincidents',
  validateAndSanitizeIncidentQueries,
  (req, res, next) => {
    Incidents.getIncidents()
      .then((incidents) => {
        res.status(200).json(incidents);
      })
      .catch(() => next({ status: 500 }));
  }
);

// ### GET /incidents/{incident_id} ###
// - returns a singular incident based on {incident_id} passed in
// ⬇️ swagger docs code generation ⬇️
/**
 * @swagger
 * /incidents/{incident_id}:
 *  get:
 *    summary: Path returning single incident by incident_id
 *    parameters:
 *      - in: path
 *        name: incident_id
 *        schema:
 *        type: string
 *        required: true
 *        description: unique id of the incident to get return data for
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success ... returns incident object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - api
 *              properties:
 *                data:
 *                  type: array
 *                  example:   [{
    incident_id: 1,
    incident_date: '2021-03-01T00:00:00.000Z',
    tweet_id: '1366291653267513344',
    user_name: 'shafiur',
    description:
      '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
    city: 'San Francisco',
    state: 'CA',
    lat: null,
    long: null,
    title: null,
    force_rank: 'Rank 2 - Empty-hand',
    status: 'pending',
    confidence: 20,
    tags: ['police','kick', 'beat',],
    src: [
      'https://vimeo.com/540571411',
      'https://twitter.com/warpspdskeleton/status/1387075760805060609',
    ]
  }]
 *      500:
 *        description: Server response error
 */
router.get('/incident/:incident_id', checkIncidentExists, (req, res, next) => {
  let incident = req.incident;
  if (incident.status === 'approved') {
    res.status(200).json(incident);
  } else {
    next({ status: 400, message: 'Incident unavailable' });
  }
});

/**
 * @swagger
 * /incidents/gettimeline:
 *  get:
 *    summary: Path returning timeline of incidents in reverse chronological order.. Limit can be chosen in query or default to 5
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success ... returns an array of incident objects
 *      500:
 *    description: Server response error
 */
router.get('/gettimeline', (req, res, next) => {
  let limit = req.query.limit || 5;

  Incidents.getTimelineIncidents(Number(limit))
    .then((incidents) => {
      res.status(200).json(incidents);
    })
    .catch(() => next({ status: 500 }));
});

// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Database Error' });
});

module.exports = router;
