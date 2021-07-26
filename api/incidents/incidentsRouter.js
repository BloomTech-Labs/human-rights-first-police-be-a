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
    let ids = req.query.ids || null;

    if (ids) {
      incidents = incidents.filter((incident) => {
        return ids.indexOf(incident.id) > -1;
      });
    }

    let rank = req.query.rank || null;
    let ranks = [
      'Rank 1 - Police Presence',
      'Rank 2 — Empty-hand',
      'Rank 3 — Blunt Force',
      'Rank 4 — Chemical & Electric',
      'Rank 5 — Lethal Force',
    ];
    if (rank !== 'All') {
      incidents = incidents.filter((incident) => {
        console.log(incident.force_rank, ranks[parseInt(rank) - 1]);
        return incident.force_rank === ranks[parseInt(rank) - 1];
      });
    }

    console.log(incidents);

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

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Incidents.deleteIncident(id)
    .then((res) => {
      if (res === 1) {
        res.status(204).json({
          message: `The incident with the id ${id} was successfully deleted`,
        });
      } else {
        res.status(400).json({ message: `No incident with the id ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Database error', error: err.message });
    });
});

module.exports = router;
