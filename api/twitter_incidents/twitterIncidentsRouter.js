const express = require('express');
const router = express.Router();
const {
  validateTwitterPost,
} = require('../middleware/twitterIncidentValidations');
// Model and util imports
const twitterIncidentHelper = require('./twitterIncidentsModel');

router.get('/incidents', async (req, res) => {
  try {
    const twitterAdminFeed = await twitterIncidentHelper.getAllPendingIncidents();
    twitterIncidentHelper.cleanTwitterIncident(twitterAdminFeed);
    res.status(200).json(twitterAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/incidents/rejected', async (req, res) => {
  try {
    const twitterRejectedAdminFeed = await twitterIncidentHelper.getAllRejectedIncidents();
    twitterIncidentHelper.cleanTwitterIncident(twitterRejectedAdminFeed);
    res.status(200).json(twitterRejectedAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/incidents/approved', async (req, res) => {
  try {
    const twitterApprovedAdminFeed = await twitterIncidentHelper.getAllApprovedIncidents();
    twitterIncidentHelper.cleanTwitterIncident(twitterApprovedAdminFeed);
    res.status(200).json(twitterApprovedAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/incidents/:id', validateTwitterPost, async (req, res) => {
  const { id } = req.params;
  const changes = req.Twitter;
  try {
    const updatedTwitterIncident = await twitterIncidentHelper.updateTwitterIncident(
      id,
      changes
    );
    if (updatedTwitterIncident.length < 1) {
      res.status(400).json({
        message:
          'ERROR: The incident requested does not exist. Please choose a valid incident.',
      });
    }
    twitterIncidentHelper.cleanTwitterIncident(updatedTwitterIncident);
    res.status(200).json(updatedTwitterIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/incidents', validateTwitterPost, async (req, res) => {
  try {
    const newPostedIncident = await twitterIncidentHelper.createTwitterIncident(
      req.Twitter
    );
    res.status(201).json(newPostedIncident);
  } catch (error) {
    res.status(500).json({
      message: 'There was a problem with creating your issue',
      Error_message: error.message,
    });
  }
});

module.exports = router;
