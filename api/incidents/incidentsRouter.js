const express = require('express');
const router = express.Router();

// Model and util imports
const Incidents = require('./incidentsModel');
const { parseAsync } = require('json2csv');
const { fields } = require('../util/fields');
const {
  filterDataByDate,
  filterDataByState,
  createRange,
} = require('../util/filters');
const { DateTime } = require('luxon');

// ''' ---------> Incidents Routes <--------- '''
// ### GET /showallincidents ###
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

router.get('/getincidents', async (req, res) => {
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

// ### GET /queryincidents ###
// - returns incident data based on provided date range
// ⬇️ swagger docs code generation ⬇️
/**
 * @swagger
 * /incidents/queryincidents:
 *  get:
 *    summary: path returning all incidents in database restricted to provided date range and provided state parameter
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

router.get('/queryincidents', async (req, res) => {
  try {
    const incidents = await Incidents.getAllIncidents();

    const queryResponse = incidents.map((incident) => {
      let dateObj = new Date(incident.date);
      incident.src = JSON.parse(incident.src);
      incident.categories = JSON.parse(incident.categories);
      incident.date = dateObj.getMonth();
      return incident;
    });

    let filterResponse = queryResponse.filter((item) => {
      let searchStartDate = +req.query.startDate;
      let searchEndDate = +req.query.endDate;

      if (req.query.state) {
        return (
          item.date >= searchStartDate &&
          item.date <= searchEndDate &&
          item.state === req.query.state
        );
      } else {
        return item.date >= searchStartDate && item.date <= searchEndDate;
      }
    });

    res.json(filterResponse);
  } catch (e) {
    res.status(500).json({ message: 'Request Error' });
  }
});

/**
 * Route to supply Timeline component with limited data response
 */
router.get('/gettimeline', async (req, res) => {
  let limit = req.query.limit || 5;

  try {
    const incidents = await Incidents.getTimelineIncidents(limit);

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

/**
 * Returns a CSV of incidents
 * By default returns all incidents
 * Optional query string can limit responses by date range or state
 *
 * Possible Query Strings:
 * /download?state=*StateName Here*
 * /download?startDate=*StartDate Here*&endDate=*End Date Here*
 * /download?state=*StateName Here*&start=*StartDate Here*&end=*End Date Here*
 * State name ex: "New York" default: null
 * Start Date ex: "05-13-2020" default: One year ago from Today
 * End Date ex: "12-04-2020" default: Today
 */

router.get('/download', async (req, res) => {
  // NOTE:  Incident Dates must be converted to milliseconds using JavaScript's getTime() method,
  //        then converted to a Luxon DateTime Object using the DateTime.fromMillis() method

  try {
    // Get Incidents from Database:
    let incidents = await Incidents.getAllIncidents();
    const state = req.query.state || null;
    let start = req.query.start || null;
    let end = req.query.end || null;
    // Filter data from incidents:
    if (state) {
      incidents = filterDataByState(incidents, state);
    }

    if (start && end) {
      // Create ISO format from dates:
      start = DateTime.fromISO(start);
      end = DateTime.fromISO(end);
      // Create range and filter:
      const range = createRange([start, end]);
      incidents = filterDataByDate(incidents, range);
    } else if (!start && end) {
      // Search for dates that are equal or before the end date
      end = DateTime.fromISO(end);
      incidents = incidents.filter(
        (incident) => DateTime.fromMillis(incident.date.getTime()) <= end
      );
    } else if (start && !end) {
      // Create a range using today as the end date
      start = DateTime.fromISO(start);
      const today = DateTime.fromISO(DateTime.local());
      const range = createRange([start, today]);
      incidents = filterDataByDate(incidents, range);
    }

    // Create CSV from data and serve it to User:
    parseAsync(incidents, { fields }).then((result) => {
      res.header('Content-Type', 'text/csv');
      res.attachment('incidents.csv');
      return res.send(result);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
