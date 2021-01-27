const express = require('express');
const router = express.Router();

const Incidents = require('../incidents/incidentsModel');
const { dsFetch, dsInitialFetch } = require('../dsService/dsUtil');

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
      await dsInitialFetch();
      res.json({ message: 'Operation successful' });
    } catch (e) {
      res.json({ message: 'Error with operation', error: e });
    }
  });
  
  router.post('/dailyupdate', async (req, res) => {
    try {
      const result = await dsFetch();
      res.status(201).json({ message: 'Operation Success', result: result })
    } catch (e) {
      res.status(500).json({ message: 'Operation Failed', error: e})
    }
  })

  module.exports = router;