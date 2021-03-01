const express = require('express');
const router = express.Router();
const {
  validatePostBody,
  addIdtoPost,
  validateManyPosts,
} = require('../middleware/twitterIncidentValidations');
// Model and util imports
const twitterIncidentHelper = require('./twitterIncidentsModel');

router.get('/incidents', async (req, res) => {
  try {
    const twitterAdminFeed = await twitterIncidentHelper.getAllPendingIncidents();
    res.status(200).json(twitterAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/incidents/rejected', async (req, res) => {
  try {
    const twitterRejectedAdminFeed = await twitterIncidentHelper.getAllRejectedIncidents();
    res.status(200).json(twitterRejectedAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/incidents/approved', async (req, res) => {
  try {
    const twitterApprovedAdminFeed = await twitterIncidentHelper.getAllApprovedIncidents();
    res.status(200).json(twitterApprovedAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/incidents/dstraining', async (req, res) => {
  try {
    const learningData = await twitterIncidentHelper.getLearningData();
    res.status(200).json(learningData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/incidents/:id', validatePostBody, async (req, res) => {
  const { id } = req.params;
  const changes = req.newIncident;
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
    res.status(201).json(updatedTwitterIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/incidents/', async (req, res) => {
  const changes = req.body;
  try {
    await changes.forEach((change) => {
      twitterIncidentHelper.updateTwitterIncident(change.id, change);
    });
    res.status(201).json({ message: 'Incidents Successfully Updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/incidents', validatePostBody, addIdtoPost, async (req, res) => {
  try {
    const newPostedIncident = await twitterIncidentHelper.createTwitterIncident(
      req.TwitterUpdatedReadyToPost
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
