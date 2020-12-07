const express = require('express');
const router = express.Router();

// Model and util imports
const Incidents = require('./incidentsModel');
const { dsFetch } = require('../dsService/dsUtil');

// ''' ---------> Incidents Routes <--------- '''
// ### GET /showallincidents ###
// - returns all incidents in the BE database
// ⬇️ swagger docs code generation ⬇️
/**
 * @swagger
 * /incidents/showallincidents:
 *  get:
 *    summary: path returning all incidents in database
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
    incident_id: 'mn-minneapolis-14',
    src: [
      'https://www.facebook.com/1462345700/posts/10220863688809651',
      'https://www.facebook.com/1462345700/posts/10220863812572745'
    ],
    categories: [ 'less-lethal', 'rubber-bullet', 'stun-grenade', 'tear-gas' ],
    city: 'Minneapolis',
    state: 'Minnesota',
    lat: 44.94811,
    long: -93.23699,
    title: 'Police shoot flashbang grenades into crowd',
    desc: 'Police on the rooftop of the 3rd precinct fire flashbang grenades into crowd of peaceful protesters.',
    date: 2020-05-26T05:00:00.000Z,
    verbalization: false,
    empty_hand_soft: false,
    empty_hand_hard: false,
    less_lethal_methods: true,
    lethal_force: false,
    uncategorized: false
  },
  {
    incident_id: 'mn-minneapolis-28',
    src: [
      'https://www.facebook.com/damicedsota.thespiritflow/videos/10216865788705633/UzpfSTEwMDAxMTAzODkyNjEwMzpWSzoyNjczNDU4ODUyOTMzODE2/'
    ],
    categories: [ 'abuse-of-power', 'arrest' ],
    city: 'Minneapolis',
    state: 'Minnesota',
    lat: 44.941326,
    long: -93.26261,
    title: 'Man has his gun confiscated in an open carry state, violating his 2nd amendment rights',
    desc: 'Man encounters police arresting people open carrying (~3 minutes in), man is then also put in handcuffs (~5 minutes in) and his gun taken.',
    date: 2020-05-26T05:00:00.000Z,
    verbalization: false,
    empty_hand_soft: false,
    empty_hand_hard: false,
    less_lethal_methods: false,
    lethal_force: false,
    uncategorized: true
  },
  {
    incident_id: 'co-denver-1',
    src: [
      'https://www.denverpost.com/2020/05/29/denver-post-photographer-pepper-balls-george-floyd-protest/',
      'https://www.nytimes.com/2020/06/01/business/media/reporters-protests-george-floyd.html'
    ],
    categories: [ 'less-lethal', 'pepper-ball', 'shoot' ],
    city: 'Denver',
    state: 'Colorado',
    lat: 39.73844,
    long: -104.98626,
    title: 'Reporter shot with multiple pepper balls',
    desc: 'He states the officer aimed at him, and the pepper balls broke his press badge and drew blood',
    date: 2020-05-28T05:00:00.000Z,
    verbalization: false,
    empty_hand_soft: false,
    empty_hand_hard: false,
    less_lethal_methods: true,
    lethal_force: false,
    uncategorized: false
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
router.get('/showallincidents', async (req, res) => {
  try {
    const incidents = await Incidents.getAllIncidents();

    const queryResponse = incidents.map((incident) => {
      incident.src = JSON.parse(incident.src);
      incident.categories = JSON.parse(incident.categories);
      return incident;
    });
    res.json(queryResponse);

  } catch (e) {
    res.status(500).json({ message: 'Request Error' });
  }
});

// ### GET /incident/{incident_id} ###
// - returns a singular incident based on {incident_id} passed in
// ⬇️ swagger docs code generation ⬇️
/**
 * @swagger
 * /incidents/incident/{incident_id}:
 *  get:
 *    summary: path returning single incident associated with id provided
 *    parameters:
 *      - in: path
 *        name: incident_id
 *        schema:
 *          type: string
 *        required: true
 *        description: unique id of the incident to get return data for
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: success ... returns an incident object
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
    incident_id: 'mn-minneapolis-14',
    src: [
      'https://www.facebook.com/1462345700/posts/10220863688809651',
      'https://www.facebook.com/1462345700/posts/10220863812572745'
    ],
    categories: [ 'less-lethal', 'rubber-bullet', 'stun-grenade', 'tear-gas' ],
    city: 'Minneapolis',
    state: 'Minnesota',
    lat: 44.94811,
    long: -93.23699,
    title: 'Police shoot flashbang grenades into crowd',
    desc: 'Police on the rooftop of the 3rd precinct fire flashbang grenades into crowd of peaceful protesters.',
    date: 2020-05-26T05:00:00.000Z,
    verbalization: false,
    empty_hand_soft: false,
    empty_hand_hard: false,
    less_lethal_methods: true,
    lethal_force: false,
    uncategorized: false
  }]
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
router.get('/incident/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const incidentQuery = await Incidents.getIncidentById(id);

    incidentQuery[0].src = JSON.parse(incidentQuery[0].src);
    incidentQuery[0].categories = JSON.parse(incidentQuery[0].categories);

    res.status(200).json(incidentQuery);
  } catch (e) {
    res.status(500).json(e);
  }
});

// ### POST /createincidents ###
// - returns success / error response message from BE
// ⬇️ swagger docs code generation ⬇️
// NOT COMPLETE <--> TODO: @NIC
/**
 * @swagger
 * /incidents/createincidents:
 *  post:
 *    summary: SHOULDN"T BE USED (NIC) ... path to add an incident to the the database
 *    tags:
 *      - incidents
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Server response success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - api
 *              properties:
 *                 message:
 *                    type: string
 *                    example: "Success"
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

router.post('/createincidents', (req, res) => {
  req.body.forEach((incident) => {
    Incidents.createIncident(incident)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error creating Record' });
      });
  });
});

// ###Utility Routes###
router.delete('/cleardb', (req, res) => {
  Incidents.deleteDB()
    .then((response) => {
      res.json({ message: 'All database contents have been deleted' });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/fetchfromds', async (req, res) => {
  try {
    await dsFetch();
    res.json({ message: 'Operation successful' });
  } catch (e) {
    res.json({ message: 'Error with operation', error: e });
  }
});

module.exports = router;
